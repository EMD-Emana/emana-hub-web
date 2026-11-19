/**
 * Lemniscata de Bernoulli — la forma base del isotipo de EMANA.
 *
 *   x = a·cos t / (1 + sen² t)
 *   y = a·sen t·cos t / (1 + sen² t)
 *
 * `yScale` abre los lazos (la marca es más redonda que la curva de libro).
 * Función pura: el mismo `d` en servidor y cliente, sin desajustes de hidratación.
 */
export interface LemniscateOptions {
  cx: number;
  cy: number;
  a: number;
  yScale?: number;
  steps?: number;
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function lemniscatePath({ cx, cy, a, yScale = 1.5, steps = 120 }: LemniscateOptions): string {
  const parts: string[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = (i / steps) * Math.PI * 2;
    const sin = Math.sin(t);
    const cos = Math.cos(t);
    const denominator = 1 + sin * sin;
    const x = cx + (a * cos) / denominator;
    const y = cy + ((a * sin * cos) / denominator) * yScale;
    parts.push(`${i === 0 ? 'M' : 'L'}${round(x)} ${round(y)}`);
  }
  return `${parts.join(' ')}Z`;
}
