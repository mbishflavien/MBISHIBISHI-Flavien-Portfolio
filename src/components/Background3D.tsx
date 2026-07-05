import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

const Blob = ({ position, color, speed, distort, radius, isDarkMode }: { 
  position: [number, number, number], 
  color: string, 
  speed: number, 
  distort: number,
  radius: number,
  isDarkMode: boolean
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={mesh} args={[radius, 24, 24]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={radius}
          emissive={color}
          emissiveIntensity={isDarkMode ? 0.4 : 0.15}
          roughness={0.3}
          metalness={0.6}
        />
      </Sphere>
    </Float>
  );
};

const Scene = ({ mouse, isDarkMode }: { mouse: React.MutableRefObject<[number, number]>, isDarkMode: boolean }) => {
  const { viewport } = useThree();
  
  useFrame((state) => {
    // Smooth camera parallax
    const targetX = (mouse.current[0] * viewport.width) / 100;
    const targetY = (mouse.current[1] * viewport.height) / 100;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX * 0.4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY * 0.4, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.6 : 1.4} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 0.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
      
      {/* Optimized Floating Blobs with reduced vertex count */}
      <Blob position={[-3, 2, -2]} color="#a855f7" speed={1.5} distort={0.35} radius={1.5} isDarkMode={isDarkMode} />
      <Blob position={[3, -2, -1]} color="#3b82f6" speed={1.2} distort={0.4} radius={1.2} isDarkMode={isDarkMode} />
      <Blob position={[-4, -3, -3]} color="#ec4899" speed={1.4} distort={0.25} radius={1} isDarkMode={isDarkMode} />
      <Blob position={[5, 3, -4]} color="#14b8a6" speed={1.6} distort={0.45} radius={0.9} isDarkMode={isDarkMode} />
    </>
  );
};

const MouseSync = ({ mouseX, mouseY, mouse }: { mouseX: any, mouseY: any, mouse: React.MutableRefObject<[number, number]> }) => {
  useFrame(() => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = (mouseX.get() / w) * 2 - 1;
    const y = -(mouseY.get() / h) * 2 + 1;
    mouse.current = [x, y];
  });
  return null;
};

export const Background3D = ({ mouseX, mouseY, isDarkMode }: { mouseX: any, mouseY: any, isDarkMode: boolean }) => {
  const mouse = useRef<[number, number]>([0, 0]);

  return (
    <div className={cn(
      "fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-700",
      isDarkMode ? "bg-black" : "bg-slate-50"
    )}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={1}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false, depth: true }}
      >
        <MouseSync mouseX={mouseX} mouseY={mouseY} mouse={mouse} />
        <Scene mouse={mouse} isDarkMode={isDarkMode} />
      </Canvas>
      <div className={cn(
        "absolute inset-0 transition-colors duration-700",
        isDarkMode ? "bg-black/30" : "bg-white/30"
      )} />
    </div>
  );
};

