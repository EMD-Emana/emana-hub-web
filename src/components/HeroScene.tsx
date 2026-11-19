'use client';

import { useEffect, useRef } from 'react';

/**
 * Hero scene: a fibre-optic infinity ribbon made of ~9k particles.
 * Brand metaphor: the EMANA mark, alive. Pointer parallax + breathing.
 * Renders one static frame when the user prefers reduced motion.
 */
export default function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let renderer: import('three').WebGLRenderer | undefined;
    let scene: import('three').Scene | undefined;
    let camera: import('three').PerspectiveCamera | undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let visible = true;
    let awake = true;

    const start = async () => {
      const THREE = await import('three');
      if (disposed) return;

      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      } catch {
        return;
      }

      const mobile = window.matchMedia('(max-width: 900px)').matches;
      const count = mobile ? 4200 : 9000;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.6 : 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(40, host.clientWidth / host.clientHeight, 0.1, 80);
      camera.position.set(0, 0, 7.2);

      const group = new THREE.Group();
      group.rotation.set(0.06, 0.1, 0);
      scene.add(group);

      // Lemniscata plana frente a la cámara: la silueta se lee como ∞.
      const lemniscate = (t: number, out: InstanceType<typeof THREE.Vector3>) => {
        const sin = Math.sin(t);
        const cos = Math.cos(t);
        const denominator = 1 + sin * sin;
        return out.set(
          (2.42 * cos) / denominator,
          ((2.42 * sin * cos) / denominator) * 1.35,
          0.17 * Math.sin(2 * t),
        );
      };

      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      const cBlue = new THREE.Color('#2E6BFF');
      const cSoft = new THREE.Color('#8FB4FF');
      const cCyan = new THREE.Color('#22E0FF');
      const white = new THREE.Color('#EAF4FF');

      const p = new THREE.Vector3();
      const q = new THREE.Vector3();
      const tangent = new THREE.Vector3();
      const binormal = new THREE.Vector3();
      const normal = new THREE.Vector3();
      const up = new THREE.Vector3(0, 1, 0);

      for (let i = 0; i < count; i += 1) {
        const t = Math.random() * Math.PI * 2;
        lemniscate(t, p);
        lemniscate(t + 0.012, q);
        tangent.copy(q).sub(p).normalize();
        binormal.crossVectors(tangent, up).normalize();
        if (binormal.lengthSq() < 0.001) binormal.set(1, 0, 0);
        normal.crossVectors(binormal, tangent).normalize();

        const angle = Math.random() * Math.PI * 2;
        const strand = Math.pow(Math.random(), 1.8);
        const radius = 0.05 + strand * 0.2;
        const jitter = (Math.random() - 0.5) * 0.06;

        const x =
          p.x +
          normal.x * Math.cos(angle) * radius +
          binormal.x * Math.sin(angle) * radius +
          jitter;
        const y =
          p.y +
          normal.y * Math.cos(angle) * radius +
          binormal.y * Math.sin(angle) * radius +
          jitter;
        const z =
          p.z +
          normal.z * Math.cos(angle) * radius +
          binormal.z * Math.sin(angle) * radius +
          jitter;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        const mix = Math.min(1, Math.max(0, (x + 2.4) / 4.8));
        const c = mix < 0.5 ? cBlue.clone().lerp(cSoft, mix * 2) : cSoft.clone().lerp(cCyan, (mix - 0.5) * 2);
        if (strand < 0.12) c.lerp(white, 0.7);
        c.multiplyScalar(0.75 + strand * 0.6);

        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
        sizes[i] = 0.6 + Math.random() * 1.2;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

      const sprite = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const g = c.getContext('2d');
        if (!g) return null;
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, 'rgba(255,255,255,1)');
        grd.addColorStop(0.32, 'rgba(255,255,255,0.7)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      })();

      const material = new THREE.PointsMaterial({
        size: 0.052,
        map: sprite ?? undefined,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const cloud = new THREE.Points(geometry, material);
      group.add(cloud);

      // faint instrument ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.55, 0.0042, 3, 220, Math.PI * 1.15),
        new THREE.MeshBasicMaterial({
          color: 0x5b8cff,
          transparent: true,
          opacity: 0.35,
          depthWrite: false,
        }),
      );
      ring.rotation.set(1.28, 0.2, 0.4);
      group.add(ring);

      const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(2.95, 0.0032, 3, 220, Math.PI * 0.7),
        new THREE.MeshBasicMaterial({
          color: 0x22e0ff,
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      );
      ring2.rotation.set(-0.9, 0.8, -0.3);
      group.add(ring2);

      const glow = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 256;
        const g = c.getContext('2d');
        if (!g) return null;
        const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        grd.addColorStop(0, 'rgba(70,132,255,0.55)');
        grd.addColorStop(0.45, 'rgba(46,107,255,0.16)');
        grd.addColorStop(1, 'rgba(46,107,255,0)');
        g.fillStyle = grd;
        g.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      })();
      if (glow) {
        const spriteNode = new THREE.Sprite(
          new THREE.SpriteMaterial({
            map: glow,
            transparent: true,
            opacity: 0.55,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
          }),
        );
        spriteNode.scale.set(6.2, 6.2, 1);
        spriteNode.position.z = -1.6;
        group.add(spriteNode);
      }

      // two pulses travelling along the ribbon (energy flowing through the loop)
      const curvePoints: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < 220; i += 1) {
        curvePoints.push(lemniscate((i / 220) * Math.PI * 2, new THREE.Vector3()));
      }
      const curve = new THREE.CatmullRomCurve3(curvePoints, true, 'catmullrom', 0.5);
      const pulses: InstanceType<typeof THREE.Sprite>[] = [];
      if (sprite) {
        for (let i = 0; i < 2; i += 1) {
          const pulse = new THREE.Sprite(
            new THREE.SpriteMaterial({
              map: sprite,
              color: 0xcdf3ff,
              transparent: true,
              opacity: 0.9,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            }),
          );
          pulse.scale.set(0.75, 0.75, 1);
          group.add(pulse);
          pulses.push(pulse);
        }
      }

      let baseScale = 1;
      const layout = () => {
        if (!renderer || !camera) return;
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;

        const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
        const narrow = w < 900;
        if (narrow) {
          baseScale = Math.min(0.52, (halfW * 0.62) / 2.8);
          group.position.set(0, -3.25, -1.2);
          camera.position.z = 10.8;
          host.style.opacity = '0.4';
        } else {
          baseScale = Math.min(0.92, (halfW * 0.44) / 2.8);
          group.position.set(halfW * 0.4, 0.1, -0.4);
          camera.position.z = 7.2;
          host.style.opacity = '1';
        }
        camera.updateProjectionMatrix();
        group.scale.setScalar(baseScale);
      };

      layout();
      const onResize = () => layout();
      window.addEventListener('resize', onResize);

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const observer = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting;
        },
        { threshold: 0 },
      );
      observer.observe(host);

      const onVisibility = () => {
        awake = !document.hidden;
      };
      document.addEventListener('visibilitychange', onVisibility);

      const clock = new THREE.Clock();

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!renderer || !scene || !camera) return;
        if (!visible || !awake) return;
        const t = reduce ? 0 : clock.getElapsedTime();

        pointer.x += (pointer.tx - pointer.x) * 0.045;
        pointer.y += (pointer.ty - pointer.y) * 0.045;

        group.rotation.y = 0.1 + pointer.x * 0.22 + (reduce ? 0 : Math.sin(t * 0.16) * 0.06);
        group.rotation.x = 0.06 + pointer.y * 0.14;
        group.rotation.z = reduce ? 0 : Math.sin(t * 0.12) * 0.035;

        const breathe = 1 + (reduce ? 0 : Math.sin(t * 0.8) * 0.012);
        group.scale.setScalar(baseScale * breathe);

        ring.rotation.z += reduce ? 0 : 0.0009;
        ring2.rotation.z -= reduce ? 0 : 0.0006;

        pulses.forEach((pulse, i) => {
          const u = reduce ? i * 0.5 : (t * 0.055 + i * 0.5) % 1;
          pulse.position.copy(curve.getPointAt(u));
        });

        renderer.render(scene, camera);
        if (reduce) cancelAnimationFrame(raf);
      };

      frame();

      const cleanup = () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVisibility);
        observer.disconnect();
      };
      (host as HTMLDivElement & { __cleanup?: () => void }).__cleanup = cleanup;
    };

    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      const cleanup = (host as HTMLDivElement & { __cleanup?: () => void }).__cleanup;
      cleanup?.();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      scene?.traverse((obj) => {
        const mesh = obj as import('three').Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as import('three').Material | import('three').Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, []);

  return <div className="hero__scene" ref={hostRef} aria-hidden="true" />;
}
