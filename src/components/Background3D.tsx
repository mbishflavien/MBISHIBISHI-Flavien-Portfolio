import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { FastCSSBackground } from './FastCSSBackground';

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
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={0.8}>
      <Sphere ref={mesh} args={[radius, 16, 16]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={radius}
          emissive={color}
          emissiveIntensity={isDarkMode ? 0.35 : 0.15}
          roughness={0.4}
          metalness={0.5}
        />
      </Sphere>
    </Float>
  );
};

const Scene = ({ mouse, isDarkMode }: { mouse: React.MutableRefObject<[number, number]>, isDarkMode: boolean }) => {
  const { viewport } = useThree();
  
  useFrame((state) => {
    const targetX = (mouse.current[0] * viewport.width) / 100;
    const targetY = (mouse.current[1] * viewport.height) / 100;
    
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX * 0.3, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY * 0.3, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={isDarkMode ? 0.7 : 1.3} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 0.9 : 0.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4f46e5" />
      
      {/* Lightweight Blobs */}
      <Blob position={[-3, 2, -2]} color="#a855f7" speed={1.2} distort={0.3} radius={1.4} isDarkMode={isDarkMode} />
      <Blob position={[3, -2, -1]} color="#3b82f6" speed={1.0} distort={0.35} radius={1.1} isDarkMode={isDarkMode} />
      <Blob position={[-4, -3, -3]} color="#ec4899" speed={1.2} distort={0.2} radius={0.9} isDarkMode={isDarkMode} />
      <Blob position={[5, 3, -4]} color="#14b8a6" speed={1.4} distort={0.35} radius={0.8} isDarkMode={isDarkMode} />
    </>
  );
};

const MouseSync = ({ mouseX, mouseY, mouse }: { mouseX: any, mouseY: any, mouse: React.MutableRefObject<[number, number]> }) => {
  useFrame(() => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    const x = ((mouseX?.get?.() ?? w / 2) / w) * 2 - 1;
    const y = -((mouseY?.get?.() ?? h / 2) / h) * 2 + 1;
    mouse.current = [x, y];
  });
  return null;
};

export const Background3D = ({ mouseX, mouseY, isDarkMode }: { mouseX: any, mouseY: any, isDarkMode: boolean }) => {
  const mouse = useRef<[number, number]>([0, 0]);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsSupported(false);
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (!isSupported || hasWebGLError) {
    return <FastCSSBackground isDarkMode={isDarkMode} />;
  }

  return (
    <div className={cn(
      "fixed inset-0 -z-50 overflow-hidden pointer-events-none transition-colors duration-700",
      isDarkMode ? "bg-[#0a0a0f]" : "bg-slate-50"
    )}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasWebGLError(true);
          }, false);
        }}
      >
        <MouseSync mouseX={mouseX} mouseY={mouseY} mouse={mouse} />
        <Scene mouse={mouse} isDarkMode={isDarkMode} />
      </Canvas>
      <div className={cn(
        "absolute inset-0 transition-colors duration-700",
        isDarkMode ? "bg-black/25" : "bg-white/30"
      )} />
    </div>
  );
};

export default Background3D;
