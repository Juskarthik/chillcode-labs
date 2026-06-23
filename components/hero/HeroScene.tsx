"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, extend } from "@react-three/fiber";
import { shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/* ------------------------------------------------------------------
   Synthwave grid floor — a custom shader plane with scrolling neon
   lines that fade toward a warm horizon.
------------------------------------------------------------------ */
const GridMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorNear: new THREE.Color("#ff2e97"),
    uColorFar: new THREE.Color("#22e0ff"),
    uGlow: new THREE.Color("#ffb454"),
  },
  // vertex
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  /* glsl */ `
    precision mediump float;
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColorNear;
    uniform vec3 uColorFar;
    uniform vec3 uGlow;

    float gridLine(float coord, float width) {
      float g = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
      return 1.0 - min(g / width, 1.0);
    }

    void main() {
      // perspective: push detail toward the far edge (vUv.y -> 1.0)
      float depth = vUv.y;
      float persp = 1.0 / (1.02 - depth);

      float scroll = uTime * 0.55;
      float gx = gridLine(vUv.x * 26.0, 1.4);
      float gz = gridLine((depth * persp * 7.0) + scroll, 1.4);
      float grid = max(gx, gz);

      // fade the floor out at the horizon and at the near lip
      float horizonFade = smoothstep(1.0, 0.45, depth);
      float nearFade = smoothstep(0.0, 0.12, depth);
      float a = grid * horizonFade * nearFade;

      vec3 col = mix(uColorNear, uColorFar, depth);
      col += uGlow * pow(grid, 2.0) * 0.4;

      // glow halo near horizon line
      float halo = smoothstep(0.62, 0.5, depth) * smoothstep(0.42, 0.5, depth);
      col += uGlow * halo * 2.2;
      a += halo * 0.5;

      gl_FragColor = vec4(col, a);
    }
  `
);
extend({ GridMaterial });

function GridFloor() {
  const mat = useRef<THREE.ShaderMaterial & { uTime: number }>(null);
  useFrame((_, delta) => {
    if (mat.current) mat.current.uTime += delta;
  });
  return (
    <mesh rotation={[-Math.PI / 2.05, 0, 0]} position={[0, -2.2, 0]}>
      <planeGeometry args={[60, 60, 1, 1]} />
      <gridMaterial ref={mat} transparent depthWrite={false} />
    </mesh>
  );
}

/* ------------------------------------------------------------------
   Floating wireframe core — the "idea" suspended above the grid.
------------------------------------------------------------------ */
function FloatingCore({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y += delta * 0.18;
      group.current.position.y = 0.4 + Math.sin(t * 0.8) * 0.18;
      // cursor parallax
      const px = pointer.current?.x ?? 0;
      const py = pointer.current?.y ?? 0;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        py * 0.3,
        0.05
      );
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        px * 0.6,
        0.04
      );
    }
    if (inner.current) inner.current.rotation.x -= delta * 0.4;
  });

  return (
    <group ref={group} position={[0, 0.4, 0]}>
      <mesh>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#ff2e97" wireframe transparent opacity={0.9} />
      </mesh>
      <mesh ref={inner} scale={0.62}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#22e0ff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.22}>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#ffd166" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------
   Drifting dust particles.
------------------------------------------------------------------ */
function Particles({ count = 220 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 1] = Math.random() * 10 - 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffd9a8"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

/* ------------------------------------------------------------------
   Pointer + scroll rig.
------------------------------------------------------------------ */
function Rig({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const { camera } = useThree();
  useFrame(() => {
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, px * 1.1, 0.03);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1 + py * 0.6,
      0.03
    );
    camera.lookAt(0, 0.2, 0);
  });
  return null;
}

export default function HeroScene() {
  const pointer = useRef(new THREE.Vector2(0, 0));

  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 1, 6.5], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -((e.clientY / window.innerHeight) * 2 - 1);
        pointer.current.set(x, y);
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0b0710"]} />
      <fog attach="fog" args={["#0b0710", 8, 22]} />
      <GridFloor />
      <FloatingCore pointer={pointer} />
      <Particles />
      <Rig pointer={pointer} />
      <EffectComposer>
        <Bloom
          intensity={1.25}
          luminanceThreshold={0.18}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
