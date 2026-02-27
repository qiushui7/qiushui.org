export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uMouse;     // normalised mouse position (0-1)
  uniform float uHover;    // 0 = idle, 1 = full effect
  uniform vec2 uResolution;
  uniform float uTime;

  varying vec2 vUv;

  // Deterministic per-band hash (cheap integer-ish noise)
  float bandHash(float band) {
    return fract(sin(band * 127.1 + 311.7) * 43758.5453);
  }

  void main() {
    vec2 pixel = gl_FragCoord.xy;

    // --- Background layer (always visible) ---
    vec3 bg = vec3(0.0);

    // Subtle grid lines
    float gridSize = 40.0;
    float lineWidth = 1.0;
    float gx = step(mod(pixel.x, gridSize), lineWidth);
    float gy = step(mod(pixel.y, gridSize), lineWidth);
    float grid = max(gx, gy) * 0.04;
    bg += vec3(grid);

    // Cursor-following radial glow on background
    float bgDx = (vUv.x - uMouse.x) * (uResolution.x / uResolution.y);
    float bgDy = vUv.y - uMouse.y;
    float bgDist = sqrt(bgDx * bgDx + bgDy * bgDy);
    float cursorGlow = exp(-bgDist * 3.5) * uHover * 0.12;
    bg += cursorGlow * vec3(0.5, 0.7, 1.0);

    // Faint noise / static
    float noise = fract(sin(dot(pixel + uTime * 30.0, vec2(12.9898, 78.233))) * 43758.5453);
    float staticNoise = noise * 0.02 * (0.3 + uHover * 0.7);
    bg += vec3(staticNoise);

    // --- Pixel-band quantisation ---
    float bandHeight = 8.0; // px per band
    float bandIndex = floor(gl_FragCoord.y / bandHeight);

    // --- Distance falloff from cursor ---
    float radius = 0.11; // normalised radius of effect
    float dy = abs(vUv.y - uMouse.y) * 0.35; // stretched vertically
    float dx = abs(vUv.x - uMouse.x) * 0.7; // slightly wider horizontal tolerance
    float dist = sqrt(dx * dx + dy * dy);
    float falloff = 1.0 - smoothstep(0.0, radius, dist);
    falloff *= uHover; // master gate

    // --- Per-band displacement ---
    float hash = bandHash(bandIndex);
    float direction = mod(bandIndex, 2.0) == 0.0 ? 1.0 : -1.0;
    float maxOffset = 20.0 + hash * 30.0; // px
    float offset = direction * hash * maxOffset * falloff / uResolution.x;

    // --- RGB channel split ---
    float rgbSpread = 4.0 * falloff / uResolution.x;

    vec2 uvR = vUv + vec2(offset + rgbSpread, 0.0);
    vec2 uvG = vUv + vec2(offset, 0.0);
    vec2 uvB = vUv + vec2(offset - rgbSpread, 0.0);

    float r = texture2D(uTexture, uvR).r;
    float g = texture2D(uTexture, uvG).g;
    float b = texture2D(uTexture, uvB).b;
    float a = texture2D(uTexture, uvG).a;

    // Blend alpha from all channels so shifted edges stay visible
    float aR = texture2D(uTexture, uvR).a;
    float aB = texture2D(uTexture, uvB).a;
    a = max(a, max(aR, aB));

    // --- Scanline darkening ---
    float scanline = 1.0 - 0.12 * falloff * step(0.5, fract(gl_FragCoord.y / 4.0));

    vec3 col = vec3(r, g, b) * scanline;

    // --- Glow effect ---
    // Subtle ambient glow on the text
    float glowBase = a * 0.15;
    // Intensified glow near cursor on hover
    float glowCursor = falloff * a * 0.6;
    float glow = glowBase + glowCursor;
    // Tint glow slightly cyan-white
    vec3 glowColor = vec3(0.7, 0.85, 1.0);
    col += glow * glowColor;

    // Soft outer bloom: sample nearby pixels and add diffuse light
    float bloomRadius = 2.0 / uResolution.x;
    float bloom = 0.0;
    bloom += texture2D(uTexture, vUv + vec2(bloomRadius, 0.0)).a;
    bloom += texture2D(uTexture, vUv + vec2(-bloomRadius, 0.0)).a;
    bloom += texture2D(uTexture, vUv + vec2(0.0, bloomRadius)).a;
    bloom += texture2D(uTexture, vUv + vec2(0.0, -bloomRadius)).a;
    bloom += texture2D(uTexture, vUv + vec2(bloomRadius, bloomRadius) * 0.707).a;
    bloom += texture2D(uTexture, vUv + vec2(-bloomRadius, bloomRadius) * 0.707).a;
    bloom += texture2D(uTexture, vUv + vec2(bloomRadius, -bloomRadius) * 0.707).a;
    bloom += texture2D(uTexture, vUv + vec2(-bloomRadius, -bloomRadius) * 0.707).a;
    bloom *= 0.125; // average
    float bloomStrength = 0.1 + falloff * 0.35;
    col += bloom * bloomStrength * glowColor;

    // Extend alpha to cover glow area
    a = max(a, bloom * (0.3 + falloff * 0.7));

    // Composite text over background
    vec3 final = mix(bg, col, a);
    gl_FragColor = vec4(final, 1.0);
  }
`;
