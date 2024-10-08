"use client";

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Float, Line, Sphere, Trail } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';

export default function ReactComponent() {
  return (
    <>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <Atom scale={0.06} position={[-0.7, 0.5, 0]} />
      </Float>
      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
      </EffectComposer>
    </>
  );
}

function Atom(props) {
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), []);
  return (
    <group {...props}>
      <Line worldUnits points={points} color="turquoise" lineWidth={0.02} />
      <Line worldUnits points={points} color="turquoise" lineWidth={0.02} rotation={[0, 0, 1]} />
      <Line worldUnits points={points} color="turquoise" lineWidth={0.02} rotation={[0, 0, -1]} />
      <Electron position={[0, 0, 0.5]} speed={6} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, Math.PI / 3]} speed={6.5} />
      <Electron position={[0, 0, 0.5]} rotation={[0, 0, -Math.PI / 3]} speed={7} />
      <Sphere args={[0.55, 64, 64]}>
        <meshStandardMaterial color={[6, 0.5, 2]} />
      </Sphere>
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 0);
  });
  return (
    <group {...props}>
      <Trail local width={5} length={6} color={new THREE.Color(2, 1, 10)} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <sphereGeometry args={[0.25]} />
          <meshStandardMaterial color={[10, 1, 10]} />
        </mesh>
      </Trail>
    </group>
  );
}
