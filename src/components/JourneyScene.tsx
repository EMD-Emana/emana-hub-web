'use client';

import { useEffect, useRef } from 'react';

interface Props {
  stage: number;
}

/**
 * Journey scene: one particle field that re-forms into five shapes, one per
 * stage of the story (portal → sphere → cube → torus → helix).
 */
export default function JourneyScene({ stage }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef(stage);
  const apiRef = useRef<{ setStage: (n: number) => void } | null>(null);

  useEffect(() => {
    stageRef.current = stage;
    apiRef.current?.setStage(stage);
  }, [stage]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let renderer: import('three').WebGLRenderer | undefined;
    let scene: import('three').Scene | undefined;
    let camera: import('three').PerspectiveCamera | undefined;
    let cleanup = () => {};

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
      const count = mobile ? 5200 : 11000;

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
      renderer.setSize(host.clientWidth, host.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      host.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, 0.1, 80);
      camera.position.set(0, 0, 8.4);

      const group = new THREE.Group();
      scene.add(group);

      const rnd = () => Math.random() * 2 - 1;

      const makeShape = (kind: number): Float32Array => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i += 1) {
          let x = 0;
          let y = 0;
          let z = 0;

          if (kind === 0) {
            // portal: rounded rectangle frame + faint screen grid
            const edge = i / count;
            const inset = 0.9 + Math.random() * 0.18;
            const w = 2.5 * inset;
            const h = 3.3 * inset;
            if (edge < 0.72) {
              const side = Math.floor(Math.random() * 4);
              const jitter = rnd() * 0.05;
              const along = Math.random() * 2 - 1;
              if (side === 0) {
                x = along * w;
                y = h + jitter;
              } else if (side === 1) {
                x = along * w;
                y = -h + jitter;
              } else if (side === 2) {
                x = -w + jitter;
                y = along * h;
              } else {
                x = w + jitter;
                y = along * h;
              }
              z = rnd() * 0.12;
            } else {
              x = rnd() * w * 1.9;
              y = rnd() * h * 1.9;
              z = rnd() * 0.06;
            }
          } else if (kind === 1) {
            // sphere (visibility)
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const r = 2.05 + rnd() * 0.06;
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.cos(phi);
            z = r * Math.sin(phi) * Math.sin(theta);
          } else if (kind === 2) {
            // cube surface (store)
            const face = Math.floor(Math.random() * 6);
            const s = 1.75;
            x = rnd() * s;
            y = rnd() * s;
            z = rnd() * s;
            if (face < 2) x = face === 0 ? s : -s;
            else if (face < 4) y = face === 2 ? s : -s;
            else z = face === 4 ? s : -s;
          } else if (kind === 3) {
            // torus (conversation loop)
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI * 2;
            const R = 1.85;
            const r = 0.62 + rnd() * 0.05;
            x = (R + r * Math.cos(v)) * Math.cos(u);
            y = r * Math.sin(v);
            z = (R + r * Math.cos(v)) * Math.sin(u);
          } else {
            // double helix (system)
            const t = Math.random() * Math.PI * 4;
            const strand = Math.random() < 0.5 ? 0 : Math.PI;
            const radius = 1.25;
            const twist = t + strand;
            const spread = Math.random() < 0.22 ? 1 : 0.12;
            x = Math.cos(twist) * radius + (Math.random() - 0.5) * spread;
            y = (t / (Math.PI * 4) - 0.5) * 3.6;
            z = Math.sin(twist) * radius + (Math.random() - 0.5) * spread;
          }

          arr[i * 3] = x;
          arr[i * 3 + 1] = y;
          arr[i * 3 + 2] = z;
        }
        return arr;
      };

      const shapes = [0, 1, 2, 3, 4].map(makeShape);
      const positions = new Float32Array(shapes[0]);
      const colors = new Float32Array(count * 3);
      const cA = new THREE.Color('#2E6BFF');
      const cB = new THREE.Color('#22E0FF');
      const cC = new THREE.Color('#EAF4FF');
      for (let i = 0; i < count; i += 1) {
        const mix = Math.random();
        const c = mix < 0.6 ? cA.clone().lerp(cB, mix / 0.6) : cB.clone().lerp(cC, (mix - 0.6) / 0.4);
        c.multiplyScalar(0.55 + Math.random() * 0.5);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }

      const geometry = new THREE.BufferGeometry();
      const positionAttr = new THREE.BufferAttribute(positions, 3);
      geometry.setAttribute('position', positionAttr);
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const sprite = (() => {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const g = c.getContext('2d');
        if (!g) return null;
        const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
        grd.addColorStop(0, 'rgba(255,255,255,1)');
        grd.addColorStop(0.3, 'rgba(255,255,255,0.65)');
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        g.fillStyle = grd;
        g.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
      })();

      const material = new THREE.PointsMaterial({
        size: 0.045,
        map: sprite ?? undefined,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      const cloud = new THREE.Points(geometry, material);
      group.add(cloud);

      // wireframe shell that fades between stages
      const shell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.55, 1),
        new THREE.MeshBasicMaterial({
          color: 0x4f82ff,
          wireframe: true,
          transparent: true,
          opacity: 0.055,
          depthWrite: false,
        }),
      );
      group.add(shell);

      let baseScale = 1;
      const layout = () => {
        if (!renderer || !camera) return;
        const w = host.clientWidth;
        const h = host.clientHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
        const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
        if (w < 900) {
          baseScale = Math.min(0.8, (halfW * 0.6) / 2.4);
          group.position.set(0, halfH * 0.38, 0);
        } else {
          baseScale = Math.min(0.95, (halfH * 0.55) / 2.4);
          group.position.set(0.95, 0.1, 0);
        }
        camera.updateProjectionMatrix();
        group.scale.setScalar(baseScale);
      };
      layout();
      window.addEventListener('resize', layout);

      const morph = { from: new Float32Array(shapes[0]), t: 1, target: 0 };

      const setStage = (next: number) => {
        const clamped = Math.max(0, Math.min(4, next));
        if (clamped === morph.target && morph.t >= 1) return;
        morph.from = new Float32Array(positions);
        morph.target = clamped;
        morph.t = 0;
      };
      apiRef.current = { setStage };
      setStage(stageRef.current);

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (event: PointerEvent) => {
        pointer.tx = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.ty = (event.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointer, { passive: true });

      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      observer.observe(host);
      const onVisibility = () => { awake = !document.hidden; };
      document.addEventListener('visibilitychange', onVisibility);

      const clock = new THREE.Clock();
      const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

      const frame = () => {
        raf = requestAnimationFrame(frame);
        if (!renderer || !scene || !camera) return;
        if (!visible || !awake) return;
        const t = clock.getElapsedTime();

        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;

        if (morph.t < 1) {
          morph.t = Math.min(1, morph.t + 0.018);
          const k = reduce ? 1 : ease(morph.t);
          const target = shapes[morph.target];
          for (let i = 0; i < positions.length; i += 1) {
            positions[i] = morph.from[i] + (target[i] - morph.from[i]) * k;
          }
          positionAttr.needsUpdate = true;
        }

        group.rotation.y = reduce ? 0.35 : 0.35 + t * 0.07 + pointer.x * 0.5;
        group.rotation.x = reduce ? -0.08 : -0.08 + pointer.y * 0.28;
        group.rotation.z = reduce ? 0 : Math.sin(t * 0.2) * 0.04;

        shell.rotation.y -= reduce ? 0 : 0.0016;
        shell.rotation.x += reduce ? 0 : 0.0007;
        shell.scale.setScalar(1 + Math.sin(t * 0.6) * 0.02);

        renderer.render(scene, camera);
      };
      frame();

      cleanup = () => {
        window.removeEventListener('resize', layout);
        window.removeEventListener('pointermove', onPointer);
        document.removeEventListener('visibilitychange', onVisibility);
        observer.disconnect();
        apiRef.current = null;
      };
    };

    start();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanup();
      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
      scene?.traverse((obj) => {
        const mesh = obj as import('three').Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as import('three').Material | import('three').Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose();
      });
    };
  }, []);

  return <div className="journey__canvas" ref={hostRef} aria-hidden="true" />;
}
