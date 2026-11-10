'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const HEADER_H = 64;
// 직접 만든 3D 모델을 쓰려면 파일을 public/models/ 에 넣고 경로를 적으세요. 예: '/models/runner.glb'
const RUNNER_MODEL: string = '/models/runner.glb';
const NIPPER_MODEL: string = '/models/nipper.glb';
const NIPPER_GRIP_RATIO = 0.6; // 니퍼 모델 아래쪽 몇 %를 손잡이(빨간 그립)로 칠할지
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (v: number, a: number, b: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };

// ── 3D 장면: 런너(부품 틀)와 니퍼 ────────────────────────────────────────────
function useKitScene(canvasRef: React.RefObject<HTMLCanvasElement | null>, p: MotionValue<number>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import('three');
      const { RoomEnvironment } = await import('three/examples/jsm/environments/RoomEnvironment.js');
      if (disposed) return;

      let renderer: import('three').WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      } catch { return; } // WebGL 미지원 기기: 타이틀과 문구만 표시
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.85;

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environmentIntensity = 0.5;
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
      camera.position.z = 10;
      const key = new THREE.DirectionalLight(0xffffff, 1.3); key.position.set(3, 5, 6); scene.add(key);
      const rim = new THREE.PointLight(0xbe1f35, 60); rim.position.set(-4, 2, -3); scene.add(rim);
      const rim2 = new THREE.PointLight(0x3b82f6, 25); rim2.position.set(5, -3, -2); scene.add(rim2);

      const geos: import('three').BufferGeometry[] = [];
      const ext = (pts: [number, number][], depth: number, bevel = 0.02) => {
        const g = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2(x, y))), {
          depth, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3,
        });
        g.translate(0, 0, -depth / 2); geos.push(g); return g;
      };
      const box = (w: number, h: number, d: number) => { const g = new THREE.BoxGeometry(w, h, d); geos.push(g); return g; };
      const rrect = (ctx: import('three').Path, x: number, y: number, w: number, h: number, r: number) => {
        ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
      };

      // ── 런너: 색이 다른 3장 (외장 · 무장 · 프레임 부품) ──
      type Pt = [number, number];
      type Add = (geo: import('three').BufferGeometry, x?: number, y?: number, z?: number) => import('three').Mesh;
      type Gate = (x: number, y: number, w: number, h: number) => void;
      const runnerMats: import('three').MeshStandardMaterial[] = [];
      const cylZ = (rFront: number, rBack: number, h: number, seg = 32) => { const g = new THREE.CylinderGeometry(rFront, rBack, h, seg); g.rotateX(Math.PI / 2); geos.push(g); return g; };
      const buildRunner = (color: number, parts: (add: Add, gate: Gate) => void) => {
        const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.42, metalness: 0.05 });
        runnerMats.push(mat);
        const g = new THREE.Group();
        const add: Add = (geo, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); g.add(m); return m; };
        const gate: Gate = (x, y, w, h) => { add(box(w, h, 0.035), x, y); };
        const frame = new THREE.Shape(); rrect(frame, -1.6, -1.1, 3.2, 2.2, 0.14);
        const hole = new THREE.Path(); rrect(hole, -1.52, -1.02, 3.04, 2.04, 0.08); frame.holes.push(hole);
        const fg = new THREE.ExtrudeGeometry(frame, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.012, bevelSegments: 2 });
        fg.translate(0, 0, -0.035); geos.push(fg); add(fg);
        add(box(0.06, 2.06, 0.06), -0.55, 0); add(box(0.06, 2.06, 0.06), 0.55, 0); add(box(3.06, 0.06, 0.06), 0, 0);
        add(box(0.44, 0.17, 0.06), -1.3, 1.2);                                     // 런너 태그
        parts(add, gate);
        return g;
      };
      const mirrorX = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [-x, y] as Pt).reverse();

      // 1장: 외장 (팔 · 다리 · 발 · 주먹 · 몸통 · 스커트)
      const armor = buildRunner(0xe9e6df, (add, gate) => {
        add(ext([[-0.16, 0.18], [0.16, 0.18], [0.2, -0.04], [0.11, -0.18], [-0.11, -0.18], [-0.2, -0.04]], 0.2, 0.03), -1.24, 0.6);   // 어깨
        gate(-1.48, 0.6, 0.1, 0.04); gate(-1.24, 0.9, 0.04, 0.24);
        add(ext([[-0.1, 0.26], [0.1, 0.26], [0.14, -0.1], [0.09, -0.26], [-0.09, -0.26], [-0.14, -0.1]], 0.16, 0.03), -0.8, 0.54);    // 팔뚝
        gate(-0.61, 0.54, 0.12, 0.04);
        add(ext([[-0.13, 0.2], [0.13, 0.2], [0.11, -0.2], [-0.11, -0.2]], 0.18, 0.03), -0.24, 0.56);                                  // 허벅지
        gate(-0.24, 0.89, 0.04, 0.26); gate(-0.44, 0.56, 0.16, 0.04);
        add(ext([[-0.11, 0.28], [0.11, 0.28], [0.19, -0.06], [0.15, -0.28], [-0.15, -0.28], [-0.19, -0.06]], 0.2, 0.03), 0.2, 0.52);  // 정강이
        gate(0.2, 0.91, 0.04, 0.22);
        const foot: Pt[] = [[-0.2, -0.1], [0.26, -0.1], [0.2, 0.02], [0.02, 0.12], [-0.2, 0.12]];
        add(ext(foot, 0.2, 0.03), 1.07, 0.74); gate(1.43, 0.7, 0.2, 0.04);
        add(ext(mirrorX(foot), 0.2, 0.03), 1.07, 0.32); gate(1.43, 0.28, 0.2, 0.04);                                                // 발
        for (const x of [-1.28, -0.86]) {
          add(ext([[-0.09, 0.09], [0.09, 0.09], [0.09, -0.09], [-0.09, -0.09]], 0.16, 0.03), x, -0.36);                             // 주먹
          add(cylZ(0.1, 0.1, 0.12), x, -0.74);                                                                                      // 관절
          gate(x, -0.15, 0.04, 0.22); gate(x, -0.55, 0.04, 0.16); gate(x, -0.93, 0.04, 0.18);
        }
        add(ext([[-0.3, 0.22], [0.3, 0.22], [0.34, 0], [0.2, -0.24], [-0.2, -0.24], [-0.34, 0]], 0.24, 0.04), 0, -0.5);             // 몸통
        add(ext([[-0.12, 0.08], [0.12, 0.08], [0.12, -0.08], [-0.12, -0.08]], 0.1, 0.02), 0, -0.48, 0.15);
        gate(0, -0.14, 0.04, 0.22); gate(0, -0.88, 0.04, 0.24);
        for (const x of [0.86, 1.27]) {
          add(ext([[-0.13, 0.17], [0.13, 0.17], [0.17, -0.17], [-0.17, -0.17]], 0.12, 0.025), x, -0.52);                            // 스커트
          gate(x, -0.18, 0.04, 0.3);
        }
      });

      // 2장: 무장 (총 · 방패 · 검 · 추진기 · 포신 · 포드)
      const weapons = buildRunner(0xbe1f35, (add, gate) => {
        add(ext([[-0.42, 0.06], [0.1, 0.06], [0.1, 0.13], [0.42, 0.13], [0.42, -0.04], [0.3, -0.04], [0.24, -0.22], [0.12, -0.22], [0.14, -0.04], [-0.1, -0.04], [-0.1, 0], [-0.42, 0]], 0.12, 0.02), -1.05, 0.55);
        gate(-1.25, 0.82, 0.04, 0.4); gate(-0.6, 0.63, 0.08, 0.04);
        add(ext([[0, 0.4], [0.22, 0.26], [0.22, -0.2], [0, -0.4], [-0.22, -0.2], [-0.22, 0.26]], 0.1, 0.03), 0, 0.53);              // 방패
        add(ext([[0, 0.24], [0.1, 0.16], [0.1, -0.12], [0, -0.24], [-0.1, -0.12], [-0.1, 0.16]], 0.06, 0.02), 0, 0.53, 0.08);
        gate(0, 0.98, 0.04, 0.08); gate(0, 0.08, 0.04, 0.1); gate(-0.37, 0.53, 0.3, 0.04); gate(0.37, 0.53, 0.3, 0.04);
        add(ext([[-0.045, -0.4], [0.045, -0.4], [0.045, 0.2], [0, 0.42], [-0.045, 0.2]], 0.06, 0.015), 0.95, 0.52);                 // 검
        add(box(0.24, 0.05, 0.1), 0.95, 0.24); gate(0.95, 0.98, 0.04, 0.08);
        const rod = new THREE.CylinderGeometry(0.045, 0.045, 0.62, 20); geos.push(rod); add(rod, 1.3, 0.52); gate(1.44, 0.52, 0.2, 0.04);
        for (const x of [-1.28, -0.86]) { add(cylZ(0.09, 0.17, 0.22), x, -0.52); gate(x, -0.2, 0.04, 0.32); }                       // 추진기
        gate(-1.07, -0.52, 0.14, 0.04);
        const barrel = new THREE.CylinderGeometry(0.06, 0.06, 0.8, 24); barrel.rotateZ(Math.PI / 2); geos.push(barrel); add(barrel, 0, -0.38);
        add(box(0.3, 0.2, 0.16), -0.18, -0.38); gate(-0.46, -0.38, 0.12, 0.04); gate(0.46, -0.38, 0.12, 0.04);
        add(ext([[-0.24, 0.08], [0.24, 0.08], [0.24, -0.08], [-0.24, -0.08]], 0.1, 0.02), 0, -0.76); gate(0, -0.93, 0.04, 0.18);
        add(box(0.56, 0.4, 0.14), 1.07, -0.52);                                                                                     // 포드
        for (const [dx, dy] of [[-0.14, 0.09], [0.14, 0.09], [-0.14, -0.09], [0.14, -0.09]]) add(cylZ(0.06, 0.06, 0.1, 20), 1.07 + dx, -0.52 + dy, 0.09);
        gate(1.07, -0.17, 0.04, 0.3); gate(1.43, -0.52, 0.18, 0.04);
      });

      // 3장: 프레임 부품 (판 · 육각 · 원판)
      const inner = buildRunner(0x7b8490, (add, gate) => {
        const s1 = new THREE.Shape(); rrect(s1, -0.32, -0.22, 0.64, 0.44, 0.08);
        const g1 = new THREE.ExtrudeGeometry(s1, { depth: 0.14, bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 3 });
        g1.translate(0, 0, -0.07); geos.push(g1); add(g1, -1.07, 0.52); gate(-1.07, 0.9, 0.04, 0.3);
        const hex: Pt[] = Array.from({ length: 6 }, (_, i) => [0.3 * Math.cos(Math.PI / 6 + i * Math.PI / 3), 0.3 * Math.sin(Math.PI / 6 + i * Math.PI / 3)]);
        add(ext(hex, 0.2, 0.03), 0, 0.54); gate(0, 0.14, 0.04, 0.24);
        add(cylZ(0.27, 0.27, 0.12, 40), 1.07, 0.54); gate(1.42, 0.54, 0.22, 0.04);
        add(ext([[-0.34, 0.26], [0.34, 0.26], [0.24, -0.28], [-0.24, -0.28]], 0.12, 0.025), -1.07, -0.54); gate(-1.47, -0.54, 0.16, 0.04);
        add(ext([[-0.3, 0.07], [0.3, 0.07], [0.3, -0.07], [-0.3, -0.07]], 0.1, 0.02), 0, -0.36); gate(-0.42, -0.36, 0.2, 0.04);
        add(ext([[-0.3, 0.07], [0.3, 0.07], [0.3, -0.07], [-0.3, -0.07]], 0.1, 0.02), 0, -0.72); gate(0.42, -0.72, 0.2, 0.04);
        add(ext([[-0.26, 0.28], [0.26, 0.28], [0.36, -0.26], [-0.36, -0.26]], 0.16, 0.03), 1.07, -0.52); gate(1.07, -0.9, 0.04, 0.26);
      });

      const layers = [armor, weapons, inner];
      const runnerSpin = new THREE.Group(); runnerSpin.add(...layers);
      const runner = new THREE.Group(); runner.add(runnerSpin); scene.add(runner);

      // RUNNER_MODEL / NIPPER_MODEL 에 경로가 있으면 기본 도형 대신 그 3D 모델(.glb)을 사용
      const loadModel = async (path: string, fit: number) => {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { MeshoptDecoder } = await import('three/examples/jsm/libs/meshopt_decoder.module.js');
        const loader = new GLTFLoader(); loader.setMeshoptDecoder(MeshoptDecoder);
        const model = (await loader.loadAsync(path)).scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const size = bounds.getSize(new THREE.Vector3());
        model.position.sub(bounds.getCenter(new THREE.Vector3()));
        const holder = new THREE.Group(); holder.add(model);
        holder.scale.setScalar(fit / Math.max(size.x, size.y, size.z));
        const meshes: import('three').Mesh[] = [];
        model.traverse(o => { if ((o as import('three').Mesh).isMesh) { meshes.push(o as import('three').Mesh); geos.push((o as import('three').Mesh).geometry); } });
        return { holder, meshes, bounds };
      };
      let customRunner = false, customNipper = false;
      if (RUNNER_MODEL) loadModel(RUNNER_MODEL, 3.7).then(({ holder, meshes }) => {
        if (disposed) return;
        meshes.forEach(m => { if (!(m.material as import('three').MeshStandardMaterial).map) m.material = runnerMats[0]; });   // 색이 없는 모델만 플라스틱 질감 적용
        runnerSpin.clear(); runnerSpin.add(holder); customRunner = true;
      }).catch(() => {});

      // ── 니퍼 ──
      const steel = new THREE.MeshStandardMaterial({ color: 0xaeb4bd, roughness: 0.3, metalness: 1 });
      const grip = new THREE.MeshStandardMaterial({ color: 0xbe1f35, roughness: 0.55, metalness: 0.05 });
      const half = (s: 1 | -1) => {
        const f = (pts: [number, number][]): [number, number][] => pts.map(([x, y]) => [x * s, y]);
        const g = new THREE.Group();
        const body = new THREE.Mesh(ext(f([
          [0.015, 1.15], [0.15, 0.95], [0.31, 0.5], [0.34, 0.1], [0.24, -0.2], [0.02, -0.5], [-0.26, -1.2], [-0.34, -2.3],
          [-0.6, -2.3], [-0.58, -1.2], [-0.42, -0.45], [-0.22, -0.05], [-0.06, 0.2], [0, 0.6],
        ]), 0.09, 0.015), steel);
        const gr = new THREE.Mesh(ext(f([
          [-0.2, -0.95], [-0.3, -1.6], [-0.31, -2.34], [-0.63, -2.34], [-0.63, -1.5], [-0.58, -0.92],
        ]), 0.15, 0.04), grip);
        g.add(body, gr); g.position.z = s * 0.05; return g;
      };
      const hA = half(1), hB = half(-1);
      const pivotGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.26, 40); pivotGeo.rotateX(Math.PI / 2); geos.push(pivotGeo);
      const screwGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.3, 6); screwGeo.rotateX(Math.PI / 2); geos.push(screwGeo);
      const dark = new THREE.MeshStandardMaterial({ color: 0x2a2d33, roughness: 0.35, metalness: 1 });
      const nipperSpin = new THREE.Group();
      nipperSpin.add(hA, hB, new THREE.Mesh(pivotGeo, steel), new THREE.Mesh(screwGeo, dark));
      nipperSpin.position.y = 0.55;                                               // 무게중심 보정
      const nipperInner = new THREE.Group(); nipperInner.add(nipperSpin);
      const nipper = new THREE.Group(); nipper.add(nipperInner); nipper.rotation.z = -0.5; scene.add(nipper);

      if (NIPPER_MODEL) loadModel(NIPPER_MODEL, 3.0).then(({ holder, meshes }) => {
        if (disposed) return;
        // 한 덩어리 모델을 높이 기준으로 나눠 날은 금속, 손잡이는 빨간 그립으로 표현
        meshes.forEach(m => {
          const geo = m.geometry, pos = geo.attributes.position, idx = geo.index;
          if (!idx) { m.material = steel; return; }
          geo.computeBoundingBox();
          const bb = geo.boundingBox!, cut = bb.min.y + (bb.max.y - bb.min.y) * NIPPER_GRIP_RATIO;
          const top: number[] = [], bottom: number[] = [];
          for (let i = 0; i < idx.count; i += 3) {
            const a = idx.getX(i), b = idx.getX(i + 1), c = idx.getX(i + 2);
            ((pos.getY(a) + pos.getY(b) + pos.getY(c)) / 3 < cut ? bottom : top).push(a, b, c);
          }
          geo.setIndex([...top, ...bottom]);
          geo.clearGroups(); geo.addGroup(0, top.length, 0); geo.addGroup(top.length, bottom.length, 1);
          m.material = [steel, grip];
        });
        nipperSpin.clear(); nipperSpin.add(holder); nipperSpin.position.y = 0; customNipper = true;
      }).catch(() => {});

      // ── 크기 · 루프 ──
      let visH = 6.3, visW = 6.3, mobile = false;
      const resize = () => {
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h; camera.updateProjectionMatrix();
        visH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360); visW = visH * camera.aspect;
        mobile = w < 768;
      };
      resize();
      const ro = new ResizeObserver(resize); ro.observe(canvas);

      let raf = 0;
      const t0 = performance.now();
      const tick = () => {
        raf = requestAnimationFrame(tick);
        const v = p.get(), t = (performance.now() - t0) / 1000;
        const cx = mobile ? 0 : visW * 0.24, cy = mobile ? visH * 0.13 : 0;
        const sR = Math.min(1.1, (mobile ? visW * 0.92 : visW * 0.44) / (customRunner ? 4.3 : 4.9));
        const sN = Math.min(1.2, (mobile ? visH * 0.5 : visH * 0.7) / 3.6);

        runner.position.set(-cx, cy + visH * (-1.15 * (1 - ramp(v, 0.1, 0.34)) + 1.15 * ramp(v, 0.46, 0.66)), 0);
        runner.scale.setScalar(sR);
        runnerSpin.rotation.set(-0.28 + (v - 0.4) * 0.9, 0.5 + (v - 0.4) * 5.2 + Math.sin(t * 0.6) * 0.14, 0.08);
        if (!customRunner) {
          const fan = ramp(v, 0.2, 0.38);                                         // 올라오면서 부채처럼 펼쳐짐
          layers.forEach((g, i) => {
            g.position.set(0.66 * (i - 1) * fan, -0.46 * (i - 1) * fan, -0.4 * i);
            g.rotation.z = -0.1 * (i - 1) * fan;
          });
        }
        runner.visible = v > 0.08 && v < 0.68;

        nipper.position.set(cx, cy + visH * (-1.15 * (1 - ramp(v, 0.46, 0.7)) + 1.15 * ramp(v, 0.82, 1)), 0);
        nipper.scale.setScalar(sN);
        nipperInner.rotation.y = -0.55 + (v - 0.76) * 5.2 + Math.sin(t * 0.6) * 0.14;
        nipperInner.rotation.x = -0.15 + (v - 0.76) * 0.8;
        const open = 0.03 + 0.2 * (1 - ramp(v, 0.64, 0.74)) + 0.035 * (1 + Math.sin(t * 2.2)) * ramp(v, 0.74, 0.78);
        if (!customNipper) { hA.rotation.z = -open; hB.rotation.z = open; }
        nipper.visible = v > 0.44;

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf); ro.disconnect();
        geos.forEach(g => g.dispose());
        [...runnerMats, steel, grip, dark].forEach(m => m.dispose());
        scene.environment?.dispose(); pmrem.dispose(); renderer.dispose();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [canvasRef, p]);
}

// ── 배경: 런너 도면 ──────────────────────────────────────────────────────────
function RunnerPlan({ tag, className }: { tag: string; className?: string }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 };
  return (
    <svg viewBox="0 -14 320 234" className={className} aria-hidden>
      <rect x="6" y="6" width="308" height="208" rx="10" {...s} />
      <line x1="110" y1="6" x2="110" y2="214" {...s} /><line x1="6" y1="112" x2="314" y2="112" {...s} /><line x1="214" y1="6" x2="214" y2="214" {...s} />
      <rect x="30" y="30" width="56" height="40" rx="6" {...s} /><line x1="58" y1="6" x2="58" y2="30" {...s} />
      <polygon points="162,30 190,46 190,78 162,94 134,78 134,46" {...s} /><line x1="162" y1="94" x2="162" y2="112" {...s} />
      <circle cx="264" cy="58" r="26" {...s} /><line x1="290" y1="58" x2="314" y2="58" {...s} />
      <polygon points="30,136 86,136 78,190 38,190" {...s} /><line x1="6" y1="160" x2="32" y2="160" {...s} />
      <rect x="132" y="136" width="60" height="22" rx="4" {...s} /><rect x="132" y="168" width="60" height="22" rx="4" {...s} />
      <polygon points="240,140 290,140 298,190 232,190" {...s} /><line x1="264" y1="190" x2="264" y2="214" {...s} />
      <rect x="6" y="-12" width="44" height="18" rx="4" fill="currentColor" />
      <text x="28" y="2" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0D0D0D">{tag}</text>
    </svg>
  );
}

function Caption({ opacity, y, align, code, signal, color, title, desc }: {
  opacity: MotionValue<number>; y: MotionValue<number>; align: 'left' | 'right';
  code: string; signal: string; color: string; title: string; desc: string;
}) {
  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute bottom-24 left-6 right-6 text-center md:bottom-auto md:top-[36%] md:w-[38%] md:text-left ${align === 'right' ? 'md:left-auto md:right-[6%]' : 'md:left-[7%] md:right-auto'}`}
    >
      <p className="font-mono text-[11px] tracking-[0.3em] text-zinc-500 mb-3">{code}</p>
      <p className="font-black tracking-tight text-5xl md:text-8xl leading-none mb-3" style={{ color }}>{signal}</p>
      <p className="text-xl md:text-3xl font-bold text-white mb-2">{title}</p>
      <p className="text-sm md:text-base text-zinc-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function IntroStage({ onDone }: { onDone: (sectionHeight: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useKitScene(canvasRef, p);

  // 인트로를 끝까지 지나가면 접어서 다시 올라갈 수 없게 함
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().bottom <= HEADER_H + 1) onDone(el.offsetHeight);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [onDone]);

  const titleOpacity = useTransform(p, [0, 0.12, 0.22], [1, 1, 0]);
  const titleScale   = useTransform(p, [0, 0.22], [1, 1.35]);
  const titleY       = useTransform(p, [0, 0.22], ['0vh', '-14vh']);
  const hintOpacity  = useTransform(p, [0, 0.05], [1, 0]);
  const gridY        = useTransform(p, [0, 1], ['0vh', '-30vh']);
  const farY         = useTransform(p, [0, 1], ['10vh', '-80vh']);
  const aCapO        = useTransform(p, [0.27, 0.34, 0.46, 0.53], [0, 1, 1, 0]);
  const aCapY        = useTransform(p, [0.27, 0.53], [60, -60]);
  const bCapO        = useTransform(p, [0.63, 0.7, 0.82, 0.89], [0, 1, 1, 0]);
  const bCapY        = useTransform(p, [0.63, 0.89], [60, -60]);
  const barScale     = useTransform(p, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative h-[420vh]" aria-label="KitPick 인트로">
      <div className="sticky top-16 h-[calc(100vh-4rem)] overflow-hidden bg-surface-base">
        <motion.div
          style={{ y: gridY, backgroundImage: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)', backgroundSize: '56px 56px' }}
          className="absolute inset-x-0 -top-[10vh] h-[160vh]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[820px] max-h-[820px] bg-brand-500/10 rounded-full blur-[140px] pointer-events-none" />

        <motion.div style={{ y: farY }} className="absolute inset-0 text-zinc-800 pointer-events-none">
          <RunnerPlan tag="A1" className="absolute left-[4%] top-[10%] w-[28vw] max-w-[340px] -rotate-6" />
          <RunnerPlan tag="B2" className="absolute right-[5%] top-[62%] w-[26vw] max-w-[320px] rotate-3" />
          <RunnerPlan tag="C1" className="absolute left-[12%] top-[125%] w-[28vw] max-w-[340px] rotate-2" />
          <RunnerPlan tag="D3" className="absolute right-[10%] top-[175%] w-[26vw] max-w-[320px] -rotate-3" />
        </motion.div>

        <motion.div style={{ opacity: titleOpacity, scale: titleScale, y: titleY }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="font-mono text-[11px] md:text-xs tracking-[0.4em] text-zinc-500 mb-4">GUNPLA PURCHASE SIGNAL · AI</p>
          <h1 className="font-black text-white leading-none tracking-tighter text-[19vw] md:text-[15vw]">
            KIT<span className="text-brand-500">PICK</span>
          </h1>
          <p className="mt-5 text-base md:text-xl text-zinc-400">지금 사도 될까, 기다려야 할까</p>
        </motion.div>

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <Caption opacity={aCapO} y={aCapY} align="right" code="RUNNER · STEP 01" signal="BUY" color="#22C55E"
          title="좋은 가격일 때, 지금 사세요" desc="정가 대비 가격과 재판 이력, 커뮤니티 여론이 모두 좋을 때 알려드립니다" />
        <Caption opacity={bCapO} y={bCapY} align="left" code="NIPPER · STEP 02" signal="WAIT" color="#F59E0B"
          title="웃돈은 잘라내세요" desc="프리미엄이 높거나 재판이 예상되면 서두르지 않도록 신호를 보냅니다" />

        <motion.div style={{ opacity: hintOpacity }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500">
          <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.div>
        <motion.div style={{ scaleX: barScale }} className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 origin-left" />
        <button type="button" onClick={() => onDone(Number.MAX_SAFE_INTEGER)}
          className="absolute top-4 right-4 md:right-8 font-mono text-[11px] tracking-widest text-zinc-500 hover:text-white border border-surface-border rounded-full px-3 py-1.5 bg-surface-base/70 backdrop-blur transition-colors">
          건너뛰기 ↓
        </button>
      </div>
    </section>
  );
}

// 새로고침하면 다시 false가 되어 인트로를 처음부터 보여주고,
// 같은 방문 안에서 다른 페이지를 갔다 돌아올 때는 건너뜀
let introSeen = false;

export function ParallaxIntro() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(() => introSeen);
  const target = useRef(0);

  const finish = useRef((sectionHeight: number) => {
    target.current = Math.max(0, window.scrollY - sectionHeight);
    introSeen = true;
    setDone(true);
  }).current;

  // 새로고침 시 브라우저가 이전 스크롤 위치를 복원하면 인트로가 바로 접히므로 맨 위에서 시작하게 함
  useLayoutEffect(() => {
    if (introSeen) return;
    const prev = history.scrollRestoration;
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => { history.scrollRestoration = prev; };
  }, []);

  // 인트로가 사라진 만큼 스크롤 위치를 보정해 화면이 튀지 않게 함
  useLayoutEffect(() => {
    if (done) window.scrollTo(0, target.current);
  }, [done]);

  if (reduce || done) return null;
  return <IntroStage onDone={finish} />;
}
