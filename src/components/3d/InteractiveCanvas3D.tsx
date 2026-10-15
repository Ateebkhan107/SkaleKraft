"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type Object3DType = "torus-knot" | "neural-core" | "gyroscope" | "cyber-sphere" | "craft-prism";

export interface InteractiveCanvas3DProps {
  type?: Object3DType;
  accentColor?: string;
  secondaryColor?: string;
  className?: string;
  interactive?: boolean;
  autoRotateSpeed?: number;
  floatAmplitude?: number;
  floatSpeed?: number;
  showWireframe?: boolean;
}

export default function InteractiveCanvas3D({
  type = "neural-core",
  accentColor = "#c19a88",
  secondaryColor = "#805948",
  className = "w-full h-full",
  interactive = true,
  autoRotateSpeed = 1,
  floatAmplitude = 0.08,
  floatSpeed = 1.2,
  showWireframe = true,
}: InteractiveCanvas3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId = 0;
    let isVisible = false;
    let isDocumentVisible = document.visibilityState === "visible";
    const isMobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowPower = isMobile || (navigator.hardwareConcurrency ?? 8) <= 4;
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, lowPower ? 1.15 : 1.4);

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !lowPower,
      alpha: true,
      powerPreference: lowPower ? "low-power" : "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(pixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // --- Lighting Setup (Luxury Dark Studio) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const primaryLight = new THREE.DirectionalLight(accentColor, 3.2);
    primaryLight.position.set(4, 5, 4);
    scene.add(primaryLight);

    const rimLight = new THREE.DirectionalLight(secondaryColor, 2.5);
    rimLight.position.set(-4, -3, -2);
    scene.add(rimLight);

    const topGlow = new THREE.PointLight(0xffffff, 1.8, 10);
    topGlow.position.set(0, 3, 2);
    scene.add(topGlow);

    // --- Object Creation Group ---
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const primaryColor = new THREE.Color(accentColor);
    const secColor = new THREE.Color(secondaryColor);

    // Cleanup collections
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Helper: Material Creator
    const createMaterial = (params: THREE.MeshStandardMaterialParameters) => {
      const mat = new THREE.MeshStandardMaterial({
        roughness: 0.22,
        metalness: 0.88,
        ...params,
      });
      materialsToDispose.push(mat);
      return mat;
    };

    // Sub-objects to animate individually
    const animatedParts: Array<{
      mesh: THREE.Object3D;
      rotSpeed: THREE.Vector3;
    }> = [];

    if (type === "neural-core") {
      // 1. Inner Crystalline Icosahedron
      const innerGeom = new THREE.IcosahedronGeometry(0.85, 0);
      geometriesToDispose.push(innerGeom);
      const innerMat = createMaterial({
        color: primaryColor,
        roughness: 0.15,
        metalness: 0.92,
        emissive: primaryColor,
        emissiveIntensity: 0.18,
      });
      const innerMesh = new THREE.Mesh(innerGeom, innerMat);
      rootGroup.add(innerMesh);
      animatedParts.push({ mesh: innerMesh, rotSpeed: new THREE.Vector3(0.006, 0.009, 0.003) });

      // 2. Outer Wireframe Cage
      if (showWireframe) {
        const wireGeom = new THREE.IcosahedronGeometry(1.22, 1);
        geometriesToDispose.push(wireGeom);
        const wireMat = new THREE.MeshBasicMaterial({
          color: primaryColor,
          wireframe: true,
          transparent: true,
          opacity: 0.35,
        });
        materialsToDispose.push(wireMat);
        const wireMesh = new THREE.Mesh(wireGeom, wireMat);
        rootGroup.add(wireMesh);
        animatedParts.push({ mesh: wireMesh, rotSpeed: new THREE.Vector3(-0.004, -0.007, 0.005) });
      }

      // 3. Orbiting Data Points / Particles
      const particleCount = lowPower ? 16 : 24;
      const particleGeom = new THREE.SphereGeometry(0.038, lowPower ? 5 : 7, lowPower ? 5 : 7);
      geometriesToDispose.push(particleGeom);
      const particleMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      materialsToDispose.push(particleMat);

      const particleGroup = new THREE.Group();
      for (let i = 0; i < particleCount; i++) {
        const phi = Math.acos(-1 + (2 * i) / particleCount);
        const theta = Math.sqrt(particleCount * Math.PI) * phi;
        const radius = 1.45 + (i % 3) * 0.12;

        const particle = new THREE.Mesh(particleGeom, particleMat);
        particle.position.set(
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi),
          radius * Math.cos(phi)
        );
        particleGroup.add(particle);
      }
      rootGroup.add(particleGroup);
      animatedParts.push({ mesh: particleGroup, rotSpeed: new THREE.Vector3(0.003, 0.005, -0.002) });

    } else if (type === "gyroscope") {
      // Kinetic Multi-axis Gyroscope Rings
      const ringRadii = [1.3, 1.05, 0.8];
      const ringThickness = 0.045;

      ringRadii.forEach((r, idx) => {
        const ringGeom = new THREE.TorusGeometry(r, ringThickness, lowPower ? 10 : 14, lowPower ? 36 : 56);
        geometriesToDispose.push(ringGeom);
        const ringMat = createMaterial({
          color: idx % 2 === 0 ? primaryColor : secColor,
          roughness: 0.18,
          metalness: 0.95,
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);

        // Tilt each initial ring axis
        ringMesh.rotation.set(
          (idx * Math.PI) / 3,
          (idx * Math.PI) / 4,
          (idx * Math.PI) / 6
        );
        rootGroup.add(ringMesh);

        animatedParts.push({
          mesh: ringMesh,
          rotSpeed: new THREE.Vector3(
            (idx === 0 ? 0.012 : -0.008) * (idx + 1) * 0.6,
            (idx === 1 ? 0.014 : 0.006) * (idx + 1) * 0.5,
            (idx === 2 ? -0.015 : 0.005) * 0.4
          ),
        });
      });

      // Central core nucleus
      const nucleusGeom = new THREE.SphereGeometry(0.38, lowPower ? 18 : 26, lowPower ? 18 : 26);
      geometriesToDispose.push(nucleusGeom);
      const nucleusMat = createMaterial({
        color: 0xffffff,
        roughness: 0.1,
        metalness: 0.98,
        emissive: primaryColor,
        emissiveIntensity: 0.25,
      });
      const nucleusMesh = new THREE.Mesh(nucleusGeom, nucleusMat);
      rootGroup.add(nucleusMesh);
      animatedParts.push({ mesh: nucleusMesh, rotSpeed: new THREE.Vector3(0.005, 0.005, 0) });

    } else if (type === "torus-knot") {
      // Sleek Braided Torus Ribbon
      const knotGeom = new THREE.TorusKnotGeometry(0.85, 0.11, lowPower ? 88 : 128, lowPower ? 14 : 22, 2, 3);
      geometriesToDispose.push(knotGeom);
      const knotMat = createMaterial({
        color: primaryColor,
        roughness: 0.15,
        metalness: 0.94,
        emissive: primaryColor,
        emissiveIntensity: 0.12,
      });
      const knotMesh = new THREE.Mesh(knotGeom, knotMat);
      rootGroup.add(knotMesh);
      animatedParts.push({ mesh: knotMesh, rotSpeed: new THREE.Vector3(0.006, 0.008, 0.004) });

      if (showWireframe) {
        const wireMat = new THREE.MeshBasicMaterial({
          color: primaryColor,
          wireframe: true,
          transparent: true,
          opacity: 0.16,
        });
        materialsToDispose.push(wireMat);
        const wireMesh = new THREE.Mesh(knotGeom, wireMat);
        wireMesh.scale.setScalar(1.018);
        rootGroup.add(wireMesh);
        animatedParts.push({ mesh: wireMesh, rotSpeed: new THREE.Vector3(0.006, 0.008, 0.004) });
      }

    } else if (type === "craft-prism") {
      // 1. Faceted Central Precision Polyhedron Core
      const coreGeom = new THREE.IcosahedronGeometry(0.68, 0);
      geometriesToDispose.push(coreGeom);
      const coreMat = createMaterial({
        color: new THREE.Color("#fff5f0"),
        roughness: 0.08,
        metalness: 0.96,
        emissive: primaryColor,
        emissiveIntensity: 0.35,
        flatShading: true,
      });
      const coreMesh = new THREE.Mesh(coreGeom, coreMat);
      rootGroup.add(coreMesh);
      animatedParts.push({ mesh: coreMesh, rotSpeed: new THREE.Vector3(0.007, 0.01, 0.004) });

      // 2. Sleek Aerodynamic Ribbon
      const ribbonGeom = new THREE.TorusKnotGeometry(0.96, 0.055, lowPower ? 96 : 140, lowPower ? 12 : 18, 2, 5);
      geometriesToDispose.push(ribbonGeom);
      const ribbonMat = createMaterial({
        color: primaryColor,
        roughness: 0.18,
        metalness: 0.92,
        emissive: primaryColor,
        emissiveIntensity: 0.1,
      });
      const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
      rootGroup.add(ribbonMesh);
      animatedParts.push({ mesh: ribbonMesh, rotSpeed: new THREE.Vector3(-0.005, -0.007, 0.003) });

      // 3. Precision Thin Orbital Ring
      const ringGeom = new THREE.TorusGeometry(1.32, 0.016, lowPower ? 8 : 12, lowPower ? 40 : 64);
      geometriesToDispose.push(ringGeom);
      const ringMat = createMaterial({
        color: primaryColor,
        roughness: 0.25,
        metalness: 0.9,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = Math.PI / 3;
      ringMesh.rotation.y = Math.PI / 6;
      rootGroup.add(ringMesh);
      animatedParts.push({ mesh: ringMesh, rotSpeed: new THREE.Vector3(0.003, 0.006, 0.002) });

      // 4. Satellite Orbiting Nodes
      const satelliteGroup = new THREE.Group();
      const satelliteGeom = new THREE.SphereGeometry(0.045, lowPower ? 8 : 12, lowPower ? 8 : 12);
      geometriesToDispose.push(satelliteGeom);
      const satelliteMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: primaryColor,
        emissiveIntensity: 0.8,
        roughness: 0.1,
        metalness: 0.9,
      });
      materialsToDispose.push(satelliteMat);

      for (let i = 0; i < 4; i++) {
        const sat = new THREE.Mesh(satelliteGeom, satelliteMat);
        const angle = (i * Math.PI * 2) / 4;
        sat.position.set(Math.cos(angle) * 1.32, Math.sin(angle) * 1.32, 0);
        satelliteGroup.add(sat);
      }
      satelliteGroup.rotation.x = Math.PI / 3;
      satelliteGroup.rotation.y = Math.PI / 6;
      rootGroup.add(satelliteGroup);
      animatedParts.push({ mesh: satelliteGroup, rotSpeed: new THREE.Vector3(0.003, 0.006, 0.002) });

      // 5. Floating Micro-Particle Nebula
      const particleCount = lowPower ? 22 : 34;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const rad = 1.35 + Math.random() * 0.95;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = rad * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = rad * Math.cos(phi);
      }
      const particleGeom = new THREE.BufferGeometry();
      particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometriesToDispose.push(particleGeom);

      const particleMat = new THREE.PointsMaterial({
        color: primaryColor,
        size: 0.038,
        transparent: true,
        opacity: 0.75,
      });
      materialsToDispose.push(particleMat);

      const particleSystem = new THREE.Points(particleGeom, particleMat);
      rootGroup.add(particleSystem);
      animatedParts.push({ mesh: particleSystem, rotSpeed: new THREE.Vector3(0.001, 0.002, 0.001) });

    } else if (type === "cyber-sphere") {
      // Geodesic Faceted Cyber Sphere
      const sphereGeom = new THREE.IcosahedronGeometry(1.05, lowPower ? 1 : 2);
      geometriesToDispose.push(sphereGeom);
      const sphereMat = createMaterial({
        color: primaryColor,
        roughness: 0.28,
        metalness: 0.82,
        flatShading: true,
      });
      const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
      rootGroup.add(sphereMesh);
      animatedParts.push({ mesh: sphereMesh, rotSpeed: new THREE.Vector3(0.005, 0.007, 0.002) });

      if (showWireframe) {
        const wireGeom = new THREE.IcosahedronGeometry(1.16, lowPower ? 1 : 2);
        geometriesToDispose.push(wireGeom);
        const wireMat = new THREE.MeshBasicMaterial({
          color: secColor,
          wireframe: true,
          transparent: true,
          opacity: 0.3,
        });
        materialsToDispose.push(wireMat);
        const wireMesh = new THREE.Mesh(wireGeom, wireMat);
        rootGroup.add(wireMesh);
        animatedParts.push({ mesh: wireMesh, rotSpeed: new THREE.Vector3(-0.004, -0.006, 0.003) });
      }
    }

    // --- Interactive Mouse & Drag Physics ---
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);

      if (isDragging) {
        const deltaX = clientX - previousPointerX;
        const deltaY = clientY - previousPointerY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        previousPointerX = clientX;
        previousPointerY = clientY;
      } else if (interactive) {
        mouseX = x * 0.45;
        mouseY = y * 0.45;
      }
    };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      container.addEventListener("mousemove", handlePointerMove, { passive: true });
      container.addEventListener("mousedown", handlePointerDown);
      window.addEventListener("mouseup", handlePointerUp);

      container.addEventListener("touchmove", handlePointerMove, { passive: true });
      container.addEventListener("touchstart", handlePointerDown, { passive: true });
      window.addEventListener("touchend", handlePointerUp);
    }

    // --- Visibility & Render Loop ---
    const clock = new THREE.Clock();
    const targetFrameInterval = isMobile ? 1000 / 24 : lowPower ? 1000 / 30 : 1000 / 60;
    const animationStep = targetFrameInterval / (1000 / 60);
    let lastFrameTime = 0;

    const animate = (timestamp: number) => {
      animationFrameId = 0;
      if (!isVisible || !isDocumentVisible || reducedMotion) return;

      const elapsedSinceFrame = timestamp - lastFrameTime;
      if (lastFrameTime !== 0 && elapsedSinceFrame < targetFrameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp - (elapsedSinceFrame % targetFrameInterval);

      const elapsedTime = clock.getElapsedTime();

      // Smooth Lerp Towards Target Rotation
      if (interactive) {
        if (!isDragging) {
          targetRotationY += 0.004 * autoRotateSpeed * animationStep;
        }
        rootGroup.rotation.y += (targetRotationY + mouseX - rootGroup.rotation.y) * 0.06;
        rootGroup.rotation.x += (targetRotationX - mouseY - rootGroup.rotation.x) * 0.06;
      } else {
        rootGroup.rotation.y += 0.005 * autoRotateSpeed * animationStep;
      }

      // Gentle floating sine motion
      rootGroup.position.y = Math.sin(elapsedTime * floatSpeed) * floatAmplitude;

      // Animate internal subcomponents
      animatedParts.forEach((part) => {
        part.mesh.rotation.x += part.rotSpeed.x * animationStep;
        part.mesh.rotation.y += part.rotSpeed.y * animationStep;
        part.mesh.rotation.z += part.rotSpeed.z * animationStep;
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    const stopRendering = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      lastFrameTime = 0;
    };

    const startRendering = () => {
      if (!isVisible || !isDocumentVisible) return;
      if (reducedMotion) {
        renderer.render(scene, camera);
        return;
      }
      if (!animationFrameId) {
        clock.start();
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) startRendering();
        else stopRendering();
      },
      { rootMargin: isMobile ? "0px" : "80px", threshold: 0.01 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === "visible";
      if (isDocumentVisible) startRendering();
      else stopRendering();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // --- Resize Handling ---
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(pixelRatio);
      if (reducedMotion) renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (interactive) {
        container.removeEventListener("mousemove", handlePointerMove);
        container.removeEventListener("mousedown", handlePointerDown);
        window.removeEventListener("mouseup", handlePointerUp);
        container.removeEventListener("touchmove", handlePointerMove);
        container.removeEventListener("touchstart", handlePointerDown);
        window.removeEventListener("touchend", handlePointerUp);
      }

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    type,
    accentColor,
    secondaryColor,
    interactive,
    autoRotateSpeed,
    floatAmplitude,
    floatSpeed,
    showWireframe,
  ]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-grab active:cursor-grabbing select-none ${className}`}
      aria-label={`Interactive 3D ${type} visual`}
    >
      {/* Subtle touch indicator pill on hover */}
      {interactive && (
        <div
          className={`pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[#c19a88] backdrop-blur-md transition-opacity duration-300 ${
            isHovered ? "opacity-90" : "opacity-0"
          }`}
        >
          Drag to spin
        </div>
      )}
    </div>
  );
}
