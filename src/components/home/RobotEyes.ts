import * as THREE from 'three';
import type { Application } from '@splinetool/runtime';

export interface RobotEyesOptions {
  /** Primary accent color for the iris and glow (default: SkaleKraft copper '#c19a88') */
  primaryColor?: string;
  /** Secondary highlight color (default: warm peach '#edd0c2') */
  highlightColor?: string;
  /** Core pupil color (default: white-hot '#ffffff') */
  coreColor?: string;
  /** Deep shadow/accent color (default: '#805948') */
  deepColor?: string;
  /** Enable organic eye blinking (default: true) */
  enableBlink?: boolean;
  /** Enable mouse gaze tracking (default: true) */
  enableGaze?: boolean;
  /** Enable breathing luminous pulse (default: true) */
  enablePulse?: boolean;
}

/**
 * Creates and attaches high-tech, living cybernetic eyes to the 3D robot head in the Spline scene.
 * The eyes rotate, tilt, and track seamlessly with the robot's head as it moves.
 */
export function attachRobotEyes(
  app: Application,
  container?: HTMLElement | null,
  options: RobotEyesOptions = {}
): () => void {
  const {
    primaryColor = '#c19a88',
    highlightColor = '#edd0c2',
    coreColor = '#ffffff',
    deepColor = '#805948',
    enableBlink = true,
    enableGaze = true,
    enablePulse = true,
  } = options;

  const anyApp = app as unknown as {
    _scene?: THREE.Scene;
    _requestRenderAutoMode?: () => void;
    requestRender?: () => void;
  };

  if (!anyApp._scene) {
    return () => {};
  }

  // 1. Locate Head 2 (the helmet mesh) or Head (the head group)
  let headTarget: THREE.Object3D | null = null;
  let isMeshParent = false;

  anyApp._scene.traverse((obj: THREE.Object3D) => {
    if (obj.name === 'Head 2') {
      headTarget = obj;
      isMeshParent = true;
    } else if (!headTarget && obj.name === 'Head') {
      headTarget = obj;
      isMeshParent = false;
    }
  });

  if (!headTarget) {
    return () => {};
  }

  // Remove any previously attached eyes group to prevent duplicates
  const existingEyes = (headTarget as THREE.Object3D).getObjectByName('SkaleKraftRobotEyes');
  if (existingEyes) {
    (headTarget as THREE.Object3D).remove(existingEyes);
  }

  // Master group for eyes
  const eyesMasterGroup = new THREE.Group();
  eyesMasterGroup.name = 'SkaleKraftRobotEyes';

  // Eye dimensions and position coordinates relative to Head 2
  // Visor curvature: center z is 42.66; at x = +/-11.4, surface z is ~41.3
  const eyeWidth = 10.8;
  const eyeHeight = 6.6;
  const eyeY = isMeshParent ? 10.6 : -0.36; // Head 2 y-offset is -10.96 relative to Head
  const eyeZ = isMeshParent ? 41.65 : 45.65; // Place right on the glossy visor surface
  const eyeXOffset = 11.4;

  // 2. Create offscreen canvas for dynamic procedural eye rendering
  // 320x200 provides crisp 4x retina density for the 70px 3D eye while reducing texture upload overhead by 60%
  const canvasWidth = 320;
  const canvasHeight = 200;

  function createEyeCanvas(): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d')!;
    return { canvas, ctx };
  }

  const leftEyeData = createEyeCanvas();
  const rightEyeData = createEyeCanvas();

  const leftTexture = new THREE.CanvasTexture(leftEyeData.canvas);
  leftTexture.colorSpace = THREE.SRGBColorSpace;
  const rightTexture = new THREE.CanvasTexture(rightEyeData.canvas);
  rightTexture.colorSpace = THREE.SRGBColorSpace;

  // 3. Materials
  const eyeMaterialLeft = new THREE.MeshBasicMaterial({
    map: leftTexture,
    transparent: true,
    opacity: 0.98,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  const eyeMaterialRight = new THREE.MeshBasicMaterial({
    map: rightTexture,
    transparent: true,
    opacity: 0.98,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  // Soft atmospheric halo bloom behind each eye
  const haloGeo = new THREE.PlaneGeometry(eyeWidth * 1.6, eyeHeight * 2.2);

  function createHaloTexture(): THREE.CanvasTexture {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 256;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 120);
    grad.addColorStop(0, 'rgba(193, 154, 136, 0.55)');
    grad.addColorStop(0.35, 'rgba(193, 154, 136, 0.28)');
    grad.addColorStop(0.7, 'rgba(128, 89, 72, 0.08)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }

  const haloTexture = createHaloTexture();
  const haloMaterial = new THREE.MeshBasicMaterial({
    map: haloTexture,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });

  // 4. Construct Left & Right 3D Eye Units
  const eyeGeo = new THREE.PlaneGeometry(eyeWidth, eyeHeight);

  // Left Eye Unit
  const leftEyeGroup = new THREE.Group();
  leftEyeGroup.name = 'LeftEye';
  leftEyeGroup.position.set(-eyeXOffset, eyeY, eyeZ);
  // Tangential tilt with visor curvature: outward ~9 deg, slightly down ~3 deg
  leftEyeGroup.rotation.set(-0.06, -0.16, 0.04);

  const leftMesh = new THREE.Mesh(eyeGeo, eyeMaterialLeft);
  const leftHalo = new THREE.Mesh(haloGeo, haloMaterial);
  leftHalo.position.set(0, 0, -0.15); // Just behind the lens
  leftEyeGroup.add(leftHalo);
  leftEyeGroup.add(leftMesh);

  // Right Eye Unit
  const rightEyeGroup = new THREE.Group();
  rightEyeGroup.name = 'RightEye';
  rightEyeGroup.position.set(eyeXOffset, eyeY, eyeZ);
  rightEyeGroup.rotation.set(-0.06, 0.16, -0.04);

  const rightMesh = new THREE.Mesh(eyeGeo, eyeMaterialRight);
  const rightHalo = new THREE.Mesh(haloGeo, haloMaterial);
  rightHalo.position.set(0, 0, -0.15);
  rightEyeGroup.add(rightHalo);
  rightEyeGroup.add(rightMesh);

  eyesMasterGroup.add(leftEyeGroup);
  eyesMasterGroup.add(rightEyeGroup);

  // 5. Ambient Visor PointLight
  // Casts subtle warm copper light onto the robot's helmet cheekbones and glossy visor
  const visorPointLight = new THREE.PointLight(0xc19a88, 1.2, 48, 2);
  visorPointLight.position.set(0, eyeY, eyeZ + 2.5);
  eyesMasterGroup.add(visorPointLight);

  // Add the eyes group to the robot's head
  (headTarget as THREE.Object3D).add(eyesMasterGroup);

  // 6. Eye Texture Drawing Routine
  function drawEye(
    ctx: CanvasRenderingContext2D,
    pupilX: number,
    pupilY: number,
    blinkScale: number,
    pulse: number,
    isLeft: boolean
  ) {
    const w = canvasWidth;
    const h = canvasHeight;
    const cx = w / 2;
    const cy = h / 2;

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(cx, cy);

    // Uniform scale factor matching canvas resolution
    const scale = w / 512;
    // Organic vertical scale for blinking
    const clampedBlink = Math.max(0.04, blinkScale);
    ctx.scale(scale, scale * clampedBlink);

    // --- A. Outer Visor Aperture / Frame ---
    const frameW = 380;
    const frameH = 210;
    const radius = 68;

    // Outer soft glow
    const ambientGlow = ctx.createRadialGradient(0, 0, 40, 0, 0, frameW / 1.5);
    ambientGlow.addColorStop(0, `rgba(193, 154, 136, ${0.45 * pulse})`);
    ambientGlow.addColorStop(0.45, `rgba(193, 154, 136, ${0.22 * pulse})`);
    ambientGlow.addColorStop(0.85, `rgba(128, 89, 72, ${0.05 * pulse})`);
    ambientGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = ambientGlow;
    ctx.beginPath();
    ctx.roundRect(-frameW / 2 - 20, -frameH / 2 - 20, frameW + 40, frameH + 40, radius + 15);
    ctx.fill();

    // Dark cybernetic bezel housing
    ctx.beginPath();
    ctx.roundRect(-frameW / 2, -frameH / 2, frameW, frameH, radius);
    ctx.fillStyle = 'rgba(8, 7, 6, 0.94)';
    ctx.fill();

    // Metallic contour rim
    const rimGrad = ctx.createLinearGradient(-frameW / 2, -frameH / 2, frameW / 2, frameH / 2);
    rimGrad.addColorStop(0, 'rgba(237, 208, 194, 0.7)');
    rimGrad.addColorStop(0.5, 'rgba(193, 154, 136, 0.45)');
    rimGrad.addColorStop(1, 'rgba(128, 89, 72, 0.25)');
    ctx.strokeStyle = rimGrad;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Clip all inner optics inside the cybernetic frame
    ctx.clip();

    // Subtle digital grid scan lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(193, 154, 136, 0.08)';
    for (let y = -frameH / 2; y <= frameH / 2; y += 14) {
      ctx.beginPath();
      ctx.moveTo(-frameW / 2, y);
      ctx.lineTo(frameW / 2, y);
      ctx.stroke();
    }

    // --- B. Cybernetic HUD Brackets & Arc Ring ---
    const irisCenterX = pupilX * 36;
    const irisCenterY = pupilY * 22;

    // Peripheral HUD tick marks
    ctx.strokeStyle = `rgba(223, 184, 165, ${0.45 * pulse})`;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    // Top-left bracket
    ctx.moveTo(-frameW / 2 + 35, -frameH / 2 + 55);
    ctx.lineTo(-frameW / 2 + 35, -frameH / 2 + 35);
    ctx.lineTo(-frameW / 2 + 55, -frameH / 2 + 35);
    // Top-right bracket
    ctx.moveTo(frameW / 2 - 35, -frameH / 2 + 55);
    ctx.lineTo(frameW / 2 - 35, -frameH / 2 + 35);
    ctx.lineTo(frameW / 2 - 55, -frameH / 2 + 35);
    // Bottom brackets
    ctx.moveTo(-frameW / 2 + 35, frameH / 2 - 55);
    ctx.lineTo(-frameW / 2 + 35, frameH / 2 - 35);
    ctx.lineTo(-frameW / 2 + 55, frameH / 2 - 35);
    ctx.moveTo(frameW / 2 - 35, frameH / 2 - 55);
    ctx.lineTo(frameW / 2 - 35, frameH / 2 - 35);
    ctx.lineTo(frameW / 2 - 55, frameH / 2 - 35);
    ctx.stroke();

    // Rotating/dashed iris targeting ring
    ctx.save();
    ctx.translate(irisCenterX, irisCenterY);
    ctx.setLineDash([8, 10]);
    ctx.beginPath();
    ctx.arc(0, 0, 78, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(193, 154, 136, ${0.4 * pulse})`;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // --- C. Dynamic Luminous Iris & Pupil ---
    const irisRadius = 65;
    const irisGrad = ctx.createRadialGradient(
      irisCenterX,
      irisCenterY,
      0,
      irisCenterX,
      irisCenterY,
      irisRadius
    );
    irisGrad.addColorStop(0, coreColor); // White hot center
    irisGrad.addColorStop(0.2, highlightColor); // Luminous peach
    irisGrad.addColorStop(0.55, primaryColor); // Signature SkaleKraft copper
    irisGrad.addColorStop(0.82, deepColor); // Amber shadow
    irisGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = irisGrad;
    ctx.beginPath();
    // Slightly elongated horizontal capsule pupil for an expressive robotic gaze
    ctx.ellipse(irisCenterX, irisCenterY, irisRadius * 1.08, irisRadius * 0.94, 0, 0, Math.PI * 2);
    ctx.fill();

    // High-tech horizontal luminous slit
    const slitGrad = ctx.createLinearGradient(
      irisCenterX - 45,
      irisCenterY,
      irisCenterX + 45,
      irisCenterY
    );
    slitGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
    slitGrad.addColorStop(0.5, `rgba(255, 255, 255, ${0.95 * pulse})`);
    slitGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = slitGrad;
    ctx.fillRect(irisCenterX - 45, irisCenterY - 2.5, 90, 5);

    // Specular lens highlight glint
    const glintX = irisCenterX + (isLeft ? 16 : 14);
    const glintY = irisCenterY - 16;
    ctx.beginPath();
    ctx.arc(glintX, glintY, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.fill();

    ctx.restore();
  }

  // 7. Interactive Mouse / Cursor Gaze Tracking
  let targetGazeX = 0;
  let targetGazeY = 0;
  let currentGazeX = 0;
  let currentGazeY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    if (!enableGaze) return;
    const winW = window.innerWidth || 1;
    const winH = window.innerHeight || 1;

    // Normalized gaze: center of viewport is (0, 0), range [-1, 1]
    const normX = (e.clientX / winW) * 2 - 1;
    const normY = (e.clientY / winH) * 2 - 1;

    targetGazeX = Math.max(-1, Math.min(1, normX * 1.15));
    targetGazeY = Math.max(-1, Math.min(1, normY * 1.15));
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  // 8. Dynamic Blinking State
  let lastBlink = performance.now();
  let nextBlinkDelay = 3800 + Math.random() * 2200;
  let isBlinking = false;
  let isDoubleBlink = false;

  // 9. Animation Loop with Smart Throttling
  let animId = 0;
  let isRunning = true;
  let lastDrawnGazeX = 999;
  let lastDrawnGazeY = 999;
  let lastDrawnBlink = 999;
  let lastPulseTime = 0;

  const renderFrame = (now: number) => {
    if (!isRunning) return;

    // Pause when app is stopped (offscreen in viewport) or browser tab is hidden
    const isAppStopped = Boolean((anyApp as { isStopped?: boolean }).isStopped);
    const isTabHidden = typeof document !== 'undefined' && document.visibilityState !== 'visible';

    if (isAppStopped || isTabHidden) {
      animId = requestAnimationFrame(renderFrame);
      return;
    }

    // Smooth pupil interpolation (lerp)
    currentGazeX += (targetGazeX - currentGazeX) * 0.085;
    currentGazeY += (targetGazeY - currentGazeY) * 0.085;

    // Organic blinking calculation
    let currentBlinkScale = 1.0;
    if (enableBlink) {
      const timeSinceBlink = now - lastBlink;
      if (!isBlinking && timeSinceBlink > nextBlinkDelay) {
        isBlinking = true;
        lastBlink = now;
      }

      if (isBlinking) {
        // Full blink duration: ~150ms
        const blinkDuration = 150;
        const progress = Math.min(1, (now - lastBlink) / blinkDuration);

        // Sinusoidal blink arc: 0 -> closed -> 1
        // sin(0) = 0, sin(PI/2) = 1 (fully closed), sin(PI) = 0 (open)
        const closeFactor = Math.sin(progress * Math.PI);
        currentBlinkScale = 1 - closeFactor * 0.94;

        if (progress >= 1) {
          isBlinking = false;
          if (!isDoubleBlink && Math.random() < 0.18) {
            // 18% chance of rapid inquisitive double-blink
            isDoubleBlink = true;
            nextBlinkDelay = 110;
          } else {
            isDoubleBlink = false;
            nextBlinkDelay = 3400 + Math.random() * 2600;
          }
          lastBlink = now;
        }
      }
    }

    // Breathing luminescent pulse
    const pulseFactor = enablePulse ? 0.9 + 0.14 * Math.sin(now * 0.0024) : 1.0;

    // Modulate PointLight and halo opacities (instantaneous 3D parameters)
    visorPointLight.intensity = 1.1 * pulseFactor * (currentBlinkScale > 0.4 ? 1 : 0.4);
    haloMaterial.opacity = 0.42 * pulseFactor * currentBlinkScale;

    // Smart dirty check: only redraw canvas and upload texture to GPU when state actually changes
    const gazeDelta = Math.abs(currentGazeX - lastDrawnGazeX) + Math.abs(currentGazeY - lastDrawnGazeY);
    const blinkDelta = Math.abs(currentBlinkScale - lastDrawnBlink);
    const pulseElapsed = now - lastPulseTime;

    if (gazeDelta > 0.002 || blinkDelta > 0.008 || isBlinking || pulseElapsed > 40) {
      lastDrawnGazeX = currentGazeX;
      lastDrawnGazeY = currentGazeY;
      lastDrawnBlink = currentBlinkScale;
      lastPulseTime = now;

      const leftPupilX = currentGazeX * 0.92 + 0.08;
      const rightPupilX = currentGazeX * 0.92 - 0.08;

      drawEye(leftEyeData.ctx, leftPupilX, currentGazeY, currentBlinkScale, pulseFactor, true);
      drawEye(rightEyeData.ctx, rightPupilX, currentGazeY, currentBlinkScale, pulseFactor, false);

      leftTexture.needsUpdate = true;
      rightTexture.needsUpdate = true;

      // Trigger Spline auto-mode render loop only when state changed
      if (typeof anyApp._requestRenderAutoMode === 'function') {
        anyApp._requestRenderAutoMode();
      } else if (typeof anyApp.requestRender === 'function') {
        anyApp.requestRender();
      }
    }

    animId = requestAnimationFrame(renderFrame);
  };

  animId = requestAnimationFrame(renderFrame);

  // 10. Clean Cleanup Routine
  return () => {
    isRunning = false;
    cancelAnimationFrame(animId);
    window.removeEventListener('mousemove', handleMouseMove);

    if (headTarget && eyesMasterGroup.parent) {
      eyesMasterGroup.parent.remove(eyesMasterGroup);
    }

    // Dispose resources
    leftTexture.dispose();
    rightTexture.dispose();
    haloTexture.dispose();
    eyeGeo.dispose();
    haloGeo.dispose();
    eyeMaterialLeft.dispose();
    eyeMaterialRight.dispose();
    haloMaterial.dispose();
  };
}
