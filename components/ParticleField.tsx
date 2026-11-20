"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A terrain of data points that breathes slowly and ripples away from the pointer.
 * Rendered with a single THREE.Points draw call and a small custom shader.
 */
const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  uniform float uReveal;
  attribute float aSeed;
  varying float vAlpha;
  varying float vHot;

  void main() {
    vec3 p = position;
    float wave = sin(p.x * 0.35 + uTime * 0.6) * 0.45
               + cos(p.y * 0.42 + uTime * 0.45) * 0.35
               + sin((p.x + p.y) * 0.18 + uTime * 0.3) * 0.6;

    float d = distance(p.xy, uMouse);
    float ripple = exp(-d * 0.55) * 2.4;
    p.z += wave + ripple;

    // the field rises out of the floor during the intro
    p.z *= uReveal;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    float depth = clamp(1.0 - (-mv.z - 4.0) / 26.0, 0.0, 1.0);
    gl_PointSize = (1.4 + aSeed * 1.6 + ripple * 1.6) * uPixelRatio * (0.6 + depth);
    vAlpha = depth * (0.25 + aSeed * 0.55) * uReveal;
    vHot = clamp(ripple / 2.4, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  uniform vec3 uCold;
  uniform vec3 uHot;
  varying float vAlpha;
  varying float vHot;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, r);
    vec3 col = mix(uCold, uHot, vHot);
    gl_FragColor = vec4(col, soft * (vAlpha + vHot * 0.6));
  }
`;

export default function ParticleField({ revealEvent }: { revealEvent: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 760;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // no WebGL: the CSS grid behind still reads fine
    }
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.set(0, -11, 7.5);
    camera.lookAt(0, 2, 0);

    const cols = small ? 90 : 170;
    const rows = small ? 60 : 100;
    const w = 44;
    const h = 30;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        positions[i * 3] = (x / (cols - 1) - 0.5) * w;
        positions[i * 3 + 1] = (y / (rows - 1) - 0.5) * h;
        positions[i * 3 + 2] = 0;
        seeds[i] = Math.random();
        i++;
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) },
      uPixelRatio: { value: pr },
      uReveal: { value: reduce ? 1 : 0 },
      uCold: { value: new THREE.Color("#3cf0ff") },
      uHot: { value: new THREE.Color("#ff3da8") },
    };
    const mat = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const resize = () => {
      const { clientWidth, clientHeight } = el;
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // project the pointer onto the z=0 plane of the field
    const ray = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const ndc = new THREE.Vector2();
    const hit = new THREE.Vector3();
    const target = new THREE.Vector2(999, 999);
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      if (ray.ray.intersectPlane(plane, hit)) target.set(hit.x, hit.y);
    };
    window.addEventListener("pointermove", move, { passive: true });

    let revealing = reduce;
    const startReveal = () => (revealing = true);
    window.addEventListener(revealEvent, startReveal);
    if (document.documentElement.classList.contains("is-ready")) revealing = true;

    // pause when the hero is off screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!reduce) uniforms.uTime.value += dt;
      if (revealing && uniforms.uReveal.value < 1) {
        uniforms.uReveal.value = Math.min(1, uniforms.uReveal.value + dt * 0.7);
      }
      uniforms.uMouse.value.lerp(target, 0.08);
      points.rotation.z = Math.sin(uniforms.uTime.value * 0.05) * 0.05;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener(revealEvent, startReveal);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [revealEvent]);

  return <div className="field" ref={host} aria-hidden="true" />;
}
