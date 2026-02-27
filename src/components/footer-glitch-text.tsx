'use client';

import { useRef, useEffect, useCallback } from 'react';
import type { WebGLRenderer, Scene, Camera, ShaderMaterial, CanvasTexture, Mesh, BufferGeometry } from 'three';
import { vertexShader, fragmentShader } from './footer-glitch-shaders';

const TEXT = 'QIUSHUI';

/**
 * Compute a font size equivalent to CSS `clamp(3rem, 20vw, 40vh)`
 */
function computeFontSize() {
  const min = 3 * 16; // 3rem
  const preferred = window.innerWidth * 0.2; // 20vw
  const max = window.innerHeight * 0.4; // 40vh
  return Math.min(Math.max(min, preferred), max);
}

/**
 * Render stroke-outlined text onto an off-screen canvas.
 * Returns the canvas (to be used as a Three.js texture source).
 */
function renderTextCanvas(width: number, height: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio, 2);
  canvas.width = width * dpr;
  canvas.height = height * dpr;

  const ctx = canvas.getContext('2d')!;
  ctx.scale(dpr, dpr);

  const fontSize = computeFontSize();
  // Resolve the CSS variable to a real font family for canvas
  const computedFont = getComputedStyle(document.documentElement).getPropertyValue('--font-geist-sans').trim();
  const fontFamily = computedFont || 'system-ui, sans-serif';

  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.clearRect(0, 0, width, height);

  // Fill text
  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.letterSpacing = `${0.08 * fontSize}px`;
  ctx.fillText(TEXT, width / 2, height / 2);

  return canvas;
}

export default function FooterGlitchText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<{
    renderer: WebGLRenderer,
    scene: Scene,
    camera: Camera,
    material: ShaderMaterial,
    texture: CanvasTexture,
    mesh: Mesh,
    rafId: number,
    hoverTarget: number,
    hoverValue: number,
    mouseX: number,
    mouseY: number,
    startTime: number
  } | null>(null);

  const animate = useCallback(() => {
    const state = threeRef.current;
    if (!state) return;

    // Update time
    state.material.uniforms.uTime.value = (performance.now() - state.startTime) * 0.001;

    // Lerp hover
    state.hoverValue += (state.hoverTarget - state.hoverValue) * 0.08;

    // Snap to 0 when close enough
    if (state.hoverTarget === 0 && state.hoverValue < 0.005) {
      state.hoverValue = 0;
      state.material.uniforms.uHover.value = 0;
      state.renderer.render(state.scene, state.camera);
      // Stop the loop
      return;
    }

    state.material.uniforms.uHover.value = state.hoverValue;
    state.material.uniforms.uMouse.value.set(state.mouseX, state.mouseY);
    state.renderer.render(state.scene, state.camera);
    state.rafId = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dynamic import to avoid SSR issues
    let disposed = false;

    import('three').then((THREE) => {
      if (disposed) return;

      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return; // hidden by CSS

      // --- Renderer ---
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.domElement.style.display = 'block';
      container.appendChild(renderer.domElement);

      // --- Text texture ---
      const textCanvas = renderTextCanvas(width, height);
      const texture = new THREE.CanvasTexture(textCanvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      // --- Fullscreen quad ---
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uHover: { value: 0 },
          uResolution: { value: new THREE.Vector2(width, height) },
          uTime: { value: 0 }
        },
        depthTest: false
      });
      const mesh = new THREE.Mesh(geometry, material);

      const scene = new THREE.Scene();
      scene.add(mesh);

      const camera = new THREE.Camera();

      // Initial render (static text, no effect)
      renderer.render(scene, camera);

      const state = {
        renderer,
        scene,
        camera,
        material,
        texture,
        mesh,
        rafId: 0,
        hoverTarget: 0,
        hoverValue: 0,
        mouseX: 0.5,
        mouseY: 0.5,
        startTime: performance.now()
      };
      threeRef.current = state;

      // --- Resize handling ---
      let resizeTimer: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (disposed) return;
          const w = container.clientWidth;
          const h = container.clientHeight;
          renderer.setSize(w, h);
          material.uniforms.uResolution.value.set(w, h);

          // Re-render text canvas
          const newCanvas = renderTextCanvas(w, h);
          texture.image = newCanvas;
          texture.needsUpdate = true;

          renderer.render(scene, camera);
        }, 150);
      };

      const resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);

      // --- Mouse events ---
      const onMouseEnter = () => {
        state.hoverTarget = 1;
        // Start animation loop
        cancelAnimationFrame(state.rafId);
        state.rafId = requestAnimationFrame(animate);
      };

      const onMouseLeave = () => {
        state.hoverTarget = 0;
        // Loop continues until hoverValue lerps to ~0
        if (!state.rafId) {
          state.rafId = requestAnimationFrame(animate);
        }
      };

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        state.mouseX = (e.clientX - rect.left) / rect.width;
        state.mouseY = 1.0 - (e.clientY - rect.top) / rect.height; // flip Y for GL
      };

      container.addEventListener('mouseenter', onMouseEnter);
      container.addEventListener('mouseleave', onMouseLeave);
      container.addEventListener('mousemove', onMouseMove);

      // Ensure font is loaded then re-render
      document.fonts.ready.then(() => {
        if (disposed) return;
        const c = renderTextCanvas(container.clientWidth, container.clientHeight);
        texture.image = c;
        texture.needsUpdate = true;
        renderer.render(scene, camera);
      }).catch((error) => {
        console.error('Error loading font:', error);
      });

      // Store cleanup references
      Object.assign(state, { resizeObserver, onMouseEnter, onMouseLeave, onMouseMove });
    }).catch((error) => {
      console.error('Error loading Three.js:', error);
    });

    return () => {
      disposed = true;
      const state = threeRef.current as (typeof threeRef.current) & {
        resizeObserver?: ResizeObserver,
        onMouseEnter?: () => void,
        onMouseLeave?: () => void,
        onMouseMove?: (e: MouseEvent) => void
      };
      if (state) {
        cancelAnimationFrame(state.rafId);
        state.resizeObserver?.disconnect();
        if (state.onMouseEnter) container.removeEventListener('mouseenter', state.onMouseEnter);
        if (state.onMouseLeave) container.removeEventListener('mouseleave', state.onMouseLeave);
        if (state.onMouseMove) container.removeEventListener('mousemove', state.onMouseMove);
        state.renderer.dispose();
        state.texture.dispose();
        state.material.dispose();
        (state.mesh.geometry as BufferGeometry).dispose();
        if (state.renderer.domElement.parentNode) {
          state.renderer.domElement.parentNode.removeChild(state.renderer.domElement);
        }
        threeRef.current = null;
      }
    };
  }, [animate]);

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="w-full cursor-pointer"
        style={{ height: 'clamp(3rem, 20vw, 40vh)' }}
      />
      <h2 className="sr-only">QIUSHUI</h2>
    </div>
  );
}
