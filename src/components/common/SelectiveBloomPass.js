import { Pass } from 'postprocessing';
import * as THREE from 'three';

class SelectiveBloomPass extends Pass {
  constructor() {
    super('SelectiveBloomPass');
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        tDiffuse: { value: null },
        bloomThreshold: { value: 0.5 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float bloomThreshold;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tDiffuse, vUv);
          float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114));
          if (luminance < bloomThreshold) {
            discard;
          }
          gl_FragColor = color;
        }
      `,
    });

    // We will use a custom render method instead of FullScreenQuad
    this.fsQuad = new Pass.FullScreenQuad(this.material);
  }

  render(renderer, writeBuffer, readBuffer, delta, maskActive) {
    // Set the texture for the shader material
    this.material.uniforms.tDiffuse.value = readBuffer.texture;

    // Render the full screen quad with the shader
    this.fsQuad.render(renderer);
  }
}

export default SelectiveBloomPass;
