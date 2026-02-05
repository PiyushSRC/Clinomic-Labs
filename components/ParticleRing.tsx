import React, { useEffect, useRef, useCallback } from 'react';
import { Particle, AppMode } from '../types';

interface ParticleRingProps {
  mode: AppMode;
}

type RBCParticle = Particle & {
  z: number;
  projectedX: number;
  projectedY: number;
  projectedZ: number;
  projectedScale: number;
  phase: number;
  pulseSpeed: number;
  colorFactor: number;
  expansion: number;
  type: 'RBC' | 'WBC';
  phi: number;
  theta: number;
  radius: number;
  rotation: { x: number, y: number, z: number };
  spinSpeed: { x: number, y: number, z: number };
};

const ParticleRing: React.FC<ParticleRingProps> = ({ mode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spriteCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particles = useRef<RBCParticle[]>([]);
  const animationFrameId = useRef<number | undefined>(undefined);
  const heartPhase = useRef(0);

  const rotationRef = useRef({
    x: 0,
    y: 0,
    z: 0
  });

  const prevWidth = useRef<number>(0);

  const PALETTE = {
    BASE_BLUE: { r: 173, g: 216, b: 230 },
    RBC_RED: { r: 230, g: 30, b: 40 },
    WBC_WHITE: { r: 245, g: 245, b: 255 },
    DEEP: '#000000'
  };

  const createSprites = useCallback(() => {
    const spriteCanvas = document.createElement('canvas');
    const size = 128;
    const varieties = 20;
    spriteCanvas.width = size * varieties;
    spriteCanvas.height = size;
    const sCtx = spriteCanvas.getContext('2d');
    if (!sCtx) return null;

    for (let i = 0; i < varieties; i++) {
      const isWBC = i >= 10;
      const centerX = i * size + size / 2;
      const centerY = size / 2;
      const radius = size * 0.45;

      sCtx.save();
      sCtx.translate(centerX, centerY);

      if (!isWBC) {
        const r = PALETTE.RBC_RED.r;
        const g = PALETTE.RBC_RED.g;
        const b = PALETTE.RBC_RED.b;

        const grad = sCtx.createRadialGradient(-radius * 0.2, -radius * 0.2, 0, 0, 0, radius);
        grad.addColorStop(0, `rgb(${Math.min(255, r + 20)}, ${Math.min(255, g + 20)}, ${Math.min(255, b + 20)})`);
        grad.addColorStop(0.6, `rgb(${r}, ${g}, ${b})`);
        grad.addColorStop(1, `rgb(${Math.max(0, r - 100)}, 0, 0)`);

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        sCtx.arc(0, 0, radius, 0, Math.PI * 2);
        sCtx.fill();

        const centerGrad = sCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.65);
        centerGrad.addColorStop(0, 'rgba(0,0,0,0.6)');
        centerGrad.addColorStop(0.5, 'rgba(0,0,0,0.2)');
        centerGrad.addColorStop(1, 'rgba(0,0,0,0)');
        sCtx.fillStyle = centerGrad;
        sCtx.beginPath();
        sCtx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
        sCtx.fill();
      } else {
        const grad = sCtx.createRadialGradient(-radius * 0.3, -radius * 0.3, 0, 0, 0, radius);
        grad.addColorStop(0, 'white');
        grad.addColorStop(0.7, `rgb(220, 220, 230)`);
        grad.addColorStop(1, `rgb(160, 160, 180)`);

        sCtx.fillStyle = grad;
        sCtx.beginPath();
        sCtx.arc(0, 0, radius, 0, Math.PI * 2);
        sCtx.fill();

        const centerGrad = sCtx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.65);
        centerGrad.addColorStop(0, 'rgba(100,100,120,0.4)');
        centerGrad.addColorStop(0.6, 'rgba(150,150,170,0.1)');
        centerGrad.addColorStop(1, 'rgba(0,0,0,0)');
        sCtx.fillStyle = centerGrad;
        sCtx.beginPath();
        sCtx.arc(0, 0, radius * 0.65, 0, Math.PI * 2);
        sCtx.fill();

        sCtx.globalAlpha = 0.3;
        for (let dot = 0; dot < 12; dot++) {
          sCtx.fillStyle = 'rgba(180, 180, 220, 0.6)';
          const dotSize = radius * (0.04 + Math.random() * 0.08);
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * radius * 0.8;
          sCtx.beginPath();
          sCtx.arc(Math.cos(angle) * dist, Math.sin(angle) * dist, dotSize, 0, Math.PI * 2);
          sCtx.fill();
        }
        sCtx.globalAlpha = 1.0;
      }

      sCtx.restore();
    }
    return spriteCanvas;
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    const isDesktop = width >= 1024;
    const isMobile = width < 768;

    // Efficiently set density
    const count = isMobile ? 250 : isDesktop ? 1800 : 1000;

    const tempParticles: RBCParticle[] = [];
    const sphereRadius = Math.min(width, height) * (isDesktop ? 0.42 : isMobile ? 0.32 : 0.38);

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = (0.7 + Math.random() * 0.3) * sphereRadius;

      const isWBC = Math.random() > 0.95;
      const sizeMultiplier = isMobile ? 1.2 : 1.0;
      const baseSize = (isWBC ? (16 + Math.random() * 8) : (11 + Math.random() * 9)) * sizeMultiplier;

      tempParticles.push({
        x: 0, y: 0, z: 0,
        originX: 0, originY: 0,
        projectedX: 0, projectedY: 0, projectedZ: 0, projectedScale: 1,
        size: baseSize,
        baseSize: baseSize,
        color: '',
        targetColor: '',
        angle: 0,
        distance: 0,
        speed: 0,
        vx: 0, vy: 0,
        friction: 0.94,
        ease: 0.04,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        colorFactor: 0,
        expansion: 0,
        type: isWBC ? 'WBC' : 'RBC',
        phi: phi,
        theta: theta,
        radius: r,
        rotation: {
          x: Math.random() * Math.PI,
          y: Math.random() * Math.PI,
          z: Math.random() * Math.PI
        },
        spinSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.012,
          z: (Math.random() - 0.5) * 0.012
        }
      });
    }
    particles.current = tempParticles;
    if (!spriteCanvasRef.current) {
      spriteCanvasRef.current = createSprites();
    }
  }, [createSprites]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !spriteCanvasRef.current) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.fillStyle = PALETTE.DEEP;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const isDesktop = canvas.width >= 1024;
    const centerX = isDesktop ? canvas.width * 0.72 : canvas.width * 0.5;
    const centerY = isDesktop ? canvas.height * 0.45 : canvas.height * 0.5;

    rotationRef.current.y += 0.0006;
    rotationRef.current.x += 0.0002;

    heartPhase.current += 0.012;
    const pulseScale = 1 + Math.pow(Math.sin(heartPhase.current), 4) * 0.015;

    const perspective = 1200;
    const cosY = Math.cos(rotationRef.current.y);
    const sinY = Math.sin(rotationRef.current.y);
    const cosX = Math.cos(rotationRef.current.x);
    const sinX = Math.sin(rotationRef.current.x);

    const rect = canvas.getBoundingClientRect();
    const relX = mouseRef.current.x - rect.left;
    const relY = mouseRef.current.y - rect.top;

    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];
      p.rotation.x += p.spinSpeed.x;
      p.rotation.y += p.spinSpeed.y;
      p.rotation.z += p.spinSpeed.z;

      const baseR = p.radius * pulseScale;
      const curX = baseR * Math.sin(p.phi) * Math.cos(p.theta);
      const curY = baseR * Math.sin(p.phi) * Math.sin(p.theta);
      const curZ = baseR * Math.cos(p.phi);

      let x1 = curX * cosY - curZ * sinY;
      let z1 = curX * sinY + curZ * cosY;
      let y2 = curY * cosX - z1 * sinX;
      let z2 = curY * sinX + z1 * cosX;

      const scale = perspective / (perspective + z2);
      p.projectedX = centerX + x1 * scale;
      p.projectedY = centerY + y2 * scale;
      p.projectedZ = z2;
      p.projectedScale = scale;

      const dx = relX - p.projectedX;
      const dy = relY - p.projectedY;
      if (Math.abs(dx) < 120 && Math.abs(dy) < 120) {
        const distSq = dx * dx + dy * dy;
        if (distSq < 14400) {
          const force = (120 - Math.sqrt(distSq)) / 120;
          p.expansion += (force * 22 - p.expansion) * 0.15;
        } else {
          p.expansion *= 0.9;
        }
      } else {
        p.expansion *= 0.9;
      }
    }

    particles.current.sort((a, b) => b.projectedZ - a.projectedZ);

    const spriteSize = 128;
    for (let i = 0; i < particles.current.length; i++) {
      const p = particles.current[i];
      const finalSize = (p.baseSize + p.expansion) * p.projectedScale;
      const isWBC = p.type === 'WBC';
      const spriteIdx = isWBC ? 10 + (i % 10) : (i % 10);
      const depthOpacity = Math.max(0.15, 0.6 + (p.projectedZ / 1000) * -0.5);

      const diskX = Math.max(0.3, Math.abs(Math.cos(p.rotation.x)));
      const diskY = Math.max(0.2, Math.abs(Math.sin(p.rotation.y)));
      const rotZ = p.rotation.z;

      // Single fast transform call
      const m11 = diskX * Math.cos(rotZ);
      const m12 = diskX * Math.sin(rotZ);
      const m21 = -diskY * Math.sin(rotZ);
      const m22 = diskY * Math.cos(rotZ);

      ctx.globalAlpha = depthOpacity;
      ctx.setTransform(m11, m12, m21, m22, p.projectedX, p.projectedY);

      ctx.drawImage(
        spriteCanvasRef.current,
        spriteIdx * spriteSize, 0, spriteSize, spriteSize,
        -finalSize, -finalSize, finalSize * 2, finalSize * 2
      );
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Performance Optimization: Stop animation loop on mobile
    if (canvas.width < 768) {
      animationFrameId.current = undefined;
    } else {
      animationFrameId.current = requestAnimationFrame(draw);
    }
  }, [PALETTE.DEEP, createSprites]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parent = canvasRef.current.parentElement;
        if (parent) {
          const newWidth = parent.clientWidth;
          // Ignore vertical-only resizes (e.g. mobile URL bar)
          if (newWidth === prevWidth.current) return;

          prevWidth.current = newWidth;
          canvasRef.current.width = newWidth;
          canvasRef.current.height = parent.clientHeight;

          // Reset particles
          particles.current = [];
          initParticles(canvasRef.current.width, canvasRef.current.height);

          // Restart drawing capability
          if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = undefined;
          }
          // Draw at least once (if mobile, it stops there; if desktop, it loops)
          draw();
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Initial setup
    handleResize();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [initParticles, draw]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 w-full h-full hidden md:block"
      />
      <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center md:hidden pointer-events-none">
        <div
          className="relative w-[85%] max-w-[400px] aspect-square"
          style={{ top: '0%' }} // Balanced position between text and buttons
        >
          <img
            src="/mobile-ring.png"
            alt="Arogya BioX"
            className="w-full h-full object-contain opacity-70 brightness-[1.1]"
          />
        </div>
      </div>
    </>
  );
};

export default ParticleRing;