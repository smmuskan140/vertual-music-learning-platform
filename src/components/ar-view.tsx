"use client";

import { Canvas } from "@react-three/fiber";
import { ARButton, XR, createXRStore } from "@react-three/xr";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";

const store = createXRStore();

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.6, 3]} />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      
      {/* 3D Character Placeholder */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="#f97316" />
      </mesh>
      
      <Environment preset="city" />
    </>
  );
}

export default function ARView() {
  return (
    <div className="w-full h-screen relative bg-black">
      <ARButton store={store} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-2xl hover:bg-primary/90" />
      <Canvas>
        <XR store={store}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </XR>
      </Canvas>
      
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        <h1 className="text-white text-3xl font-black italic tracking-tighter drop-shadow-lg">AR TEACHER MODE</h1>
        <p className="text-orange-400 font-bold">Point at a flat surface and click 'Enter AR'</p>
      </div>
    </div>
  );
}
