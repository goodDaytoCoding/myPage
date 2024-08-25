// import {
//   AdditiveBlending,
//   Color,
//   LinearFilter,
//   MeshBasicMaterial,
//   RGBAFormat,
//   ShaderMaterial,
//   Texture,
//   UniformsUtils,
//   Vector2,
//   Vector3,
//   WebGLRenderer,
//   WebGLRenderTarget,
// } from 'three';

// import { Pass } from 'three/examples/jsm/postprocessing/Pass';

// // Use CommonJS require style to handle non-ESM imports
// const FullScreenQuad =
//   require('three/examples/jsm/postprocessing/Pass').FullScreenQuad;
// const CopyShader = require('three/examples/jsm/shaders/CopyShader').CopyShader;
// const LuminosityHighPassShader =
//   require('three/examples/jsm/shaders/LuminosityHighPassShader').LuminosityHighPassShader;

// const BlurDirectionX = new Vector2(1.0, 0.0);
// const BlurDirectionY = new Vector2(0.0, 1.0);

// function createUnrealBloomPass(resolution, strength, radius, threshold) {
//   // Default values if arguments are undefined
//   strength = strength !== undefined ? strength : 1;
//   radius = radius;
//   threshold = threshold;
//   resolution =
//     resolution !== undefined
//       ? new Vector2(resolution.x, resolution.y)
//       : new Vector2(256, 256);

//   const clearColor = new Color(0, 0, 0);

//   // Render targets
//   const pars = {
//     minFilter: LinearFilter,
//     magFilter: LinearFilter,
//     format: RGBAFormat,
//   };
//   const renderTargetsHorizontal = [];
//   const renderTargetsVertical = [];
//   const nMips = 5;
//   let resx = Math.round(resolution.x / 2);
//   let resy = Math.round(resolution.y / 2);

//   const renderTargetBright = new WebGLRenderTarget(resx, resy, pars);
//   renderTargetBright.texture.name = 'UnrealBloomPass.bright';
//   renderTargetBright.texture.generateMipmaps = false;

//   for (let i = 0; i < nMips; i++) {
//     const renderTargetHorizontal = new WebGLRenderTarget(resx, resy, pars);
//     renderTargetHorizontal.texture.name = 'UnrealBloomPass.h' + i;
//     renderTargetHorizontal.texture.generateMipmaps = false;
//     renderTargetsHorizontal.push(renderTargetHorizontal);

//     const renderTargetVertical = new WebGLRenderTarget(resx, resy, pars);
//     renderTargetVertical.texture.name = 'UnrealBloomPass.v' + i;
//     renderTargetVertical.texture.generateMipmaps = false;
//     renderTargetsVertical.push(renderTargetVertical);

//     resx = Math.round(resx / 2);
//     resy = Math.round(resy / 2);
//   }

//   // Luminosity high pass material
//   if (LuminosityHighPassShader === undefined) {
//     console.error('THREE.UnrealBloomPass relies on LuminosityHighPassShader');
//   }

//   const highPassShader = LuminosityHighPassShader;
//   const highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);

//   highPassUniforms['luminosityThreshold'].value = threshold;
//   highPassUniforms['smoothWidth'].value = 0.01;

//   const materialHighPassFilter = new ShaderMaterial({
//     uniforms: highPassUniforms,
//     vertexShader: highPassShader.vertexShader,
//     fragmentShader: highPassShader.fragmentShader,
//   });

//   // Gaussian Blur Materials
//   const separableBlurMaterials = [];
//   const kernelSizeArray = [3, 5, 7, 9, 11];
//   resx = Math.round(resolution.x / 2);
//   resy = Math.round(resolution.y / 2);

//   for (let i = 0; i < nMips; i++) {
//     separableBlurMaterials.push(getSeparableBlurMaterial(kernelSizeArray[i]));

//     separableBlurMaterials[i].uniforms['texSize'].value = new Vector2(
//       resx,
//       resy,
//     );

//     resx = Math.round(resx / 2);
//     resy = Math.round(resy / 2);
//   }

//   // Composite material
//   const compositeMaterial = getCompositeMaterial(nMips);
//   compositeMaterial.uniforms['blurTexture1'].value =
//     renderTargetsVertical[0].texture;
//   compositeMaterial.uniforms['blurTexture2'].value =
//     renderTargetsVertical[1].texture;
//   compositeMaterial.uniforms['blurTexture3'].value =
//     renderTargetsVertical[2].texture;
//   compositeMaterial.uniforms['blurTexture4'].value =
//     renderTargetsVertical[3].texture;
//   compositeMaterial.uniforms['blurTexture5'].value =
//     renderTargetsVertical[4].texture;
//   compositeMaterial.uniforms['bloomStrength'].value = strength;
//   compositeMaterial.uniforms['bloomRadius'].value = 0.1;
//   compositeMaterial.needsUpdate = true;

//   const bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
//   compositeMaterial.uniforms['bloomFactors'].value = bloomFactors;
//   const bloomTintColors = [
//     new Vector3(1, 1, 1),
//     new Vector3(1, 1, 1),
//     new Vector3(1, 1, 1),
//     new Vector3(1, 1, 1),
//     new Vector3(1, 1, 1),
//   ];
//   compositeMaterial.uniforms['bloomTintColors'].value = bloomTintColors;

//   // Copy material
//   if (CopyShader === undefined) {
//     console.error('THREE.UnrealBloomPass relies on CopyShader');
//   }

//   const copyShader = CopyShader;

//   const copyUniforms = UniformsUtils.clone(copyShader.uniforms);
//   copyUniforms['opacity'].value = 1.0;

//   const materialCopy = new ShaderMaterial({
//     uniforms: copyUniforms,
//     vertexShader: copyShader.vertexShader,
//     fragmentShader: copyShader.fragmentShader,
//     blending: AdditiveBlending,
//     depthTest: false,
//     depthWrite: false,
//     transparent: true,
//   });

//   const basic = new MeshBasicMaterial();
//   const fsQuad = new FullScreenQuad(null);

//   return {
//     clearColor,
//     renderTargetBright,
//     renderTargetsHorizontal,
//     renderTargetsVertical,
//     separableBlurMaterials,
//     compositeMaterial,
//     bloomTintColors,
//     materialCopy,
//     basic,
//     fsQuad,

//     dispose() {
//       renderTargetsHorizontal.forEach((target) => target.dispose());
//       renderTargetsVertical.forEach((target) => target.dispose());
//       renderTargetBright.dispose();
//     },

//     setSize(width, height) {
//       let resx = Math.round(width / 2);
//       let resy = Math.round(height / 2);

//       renderTargetBright.setSize(resx, resy);

//       for (let i = 0; i < nMips; i++) {
//         renderTargetsHorizontal[i].setSize(resx, resy);
//         renderTargetsVertical[i].setSize(resx, resy);

//         separableBlurMaterials[i].uniforms['texSize'].value = new Vector2(
//           resx,
//           resy,
//         );

//         resx = Math.round(resx / 2);
//         resy = Math.round(resy / 2);
//       }
//     },

//     render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
//       const oldClearColor = new Color();
//       const oldClearAlpha = renderer.getClearAlpha();
//       const oldAutoClear = renderer.autoClear;
//       renderer.autoClear = false;

//       renderer.getClearColor(oldClearColor);
//       renderer.setClearColor(clearColor, 0);

//       if (maskActive) renderer.state.buffers.stencil.setTest(false);

//       // Render input to screen
//       if (this.renderToScreen) {
//         fsQuad.material = basic;
//         basic.map = readBuffer.texture;

//         renderer.setRenderTarget(null);
//         renderer.clear();
//         fsQuad.render(renderer);
//       }

//       // 1. Extract Bright Areas
//       highPassUniforms['tDiffuse'].value = readBuffer.texture;
//       highPassUniforms['luminosityThreshold'].value = threshold;
//       fsQuad.material = materialHighPassFilter;

//       renderer.setRenderTarget(renderTargetBright);
//       renderer.clear();
//       fsQuad.render(renderer);

//       // 2. Blur All the mips progressively
//       let inputRenderTarget = renderTargetBright;

//       for (let i = 0; i < nMips; i++) {
//         fsQuad.material = separableBlurMaterials[i];

//         separableBlurMaterials[i].uniforms['colorTexture'].value =
//           inputRenderTarget.texture;
//         separableBlurMaterials[i].uniforms['direction'].value = BlurDirectionX;
//         renderer.setRenderTarget(renderTargetsHorizontal[i]);
//         renderer.clear();
//         fsQuad.render(renderer);

//         separableBlurMaterials[i].uniforms['colorTexture'].value =
//           renderTargetsHorizontal[i].texture;
//         separableBlurMaterials[i].uniforms['direction'].value = BlurDirectionY;
//         renderer.setRenderTarget(renderTargetsVertical[i]);
//         renderer.clear();
//         fsQuad.render(renderer);

//         inputRenderTarget = renderTargetsVertical[i];
//       }

//       // 3. Composite all the mips
//       fsQuad.material = compositeMaterial;
//       compositeMaterial.uniforms['bloomStrength'].value = strength;
//       compositeMaterial.uniforms['bloomRadius'].value = radius;
//       compositeMaterial.uniforms['bloomTintColors'].value = bloomTintColors;

//       renderer.setRenderTarget(writeBuffer);
//       renderer.clear();
//       fsQuad.render(renderer);

//       renderer.setClearColor(oldClearColor, oldClearAlpha);
//       renderer.autoClear = oldAutoClear;

//       if (maskActive) renderer.state.buffers.stencil.setTest(true);
//     },
//   };
// }

// function getSeparableBlurMaterial(kernelSize) {
//   // Implementation for separable blur material
//   // Use Three.js shader code for the separable blur material
//   // Create and return the material
//   return new ShaderMaterial({
//     // Define uniforms and shader code here
//   });
// }

// function getCompositeMaterial(nMips) {
//   // Implementation for composite material
//   // Use Three.js shader code for the composite material
//   // Create and return the material
//   return new ShaderMaterial({
//     // Define uniforms and shader code here
//   });
// }

// export { createUnrealBloomPass };
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import {
//   AdditiveBlending,
//   Color,
//   LinearFilter,
//   MeshBasicMaterial,
//   RGBAFormat,
//   ShaderMaterial,
//   Texture,
//   UniformsUtils,
//   Vector2,
//   Vector3,
//   WebGLRenderer,
//   WebGLRenderTarget,
// } from 'three';

// import { Pass } from 'three/examples/jsm/postprocessing/Pass';

// // TypeScript 정의에 FullScreenQuad가 없음
// import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass';

// import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';
// import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader.js';

// /**
//  * 다음의 fragmentShader 수정에 감사드립니다: https://github.com/mrdoob/three.js/issues/14104#issuecomment-429664412
//  *
//  * UnrealBloomPass는 Unreal Engine의 블룸 패스를 참고한 것으로, 여러 블룸 텍스처의 MIP 맵 체인을 생성하고 다른 반경으로 블러링합니다.
//  * MIP의 가중치가 결합되고, 큰 블러가 높은 MIP에서 수행되기 때문에 이 효과는 품질과 성능 모두에서 우수한 결과를 제공합니다.
//  *
//  * 참조:
//  * - https://docs.unrealengine.com/latest/INT/Engine/Rendering/PostProcessEffects/Bloom/
//  */
// class TransparentBackgroundFixedUnrealBloomPass extends Pass {
//   constructor(resolution, strength, radius, threshold) {
//     super();

//     this.strength = strength !== undefined ? strength : 1;
//     this.radius = radius;
//     this.threshold = threshold;
//     this.resolution =
//       resolution !== undefined
//         ? new Vector2(resolution.x, resolution.y)
//         : new Vector2(256, 256);

//     // 여기서 한 번만 컬러를 생성하고, 나중에 render 함수 내에서 재사용합니다.
//     this.clearColor = new Color(0, 0, 0);

//     // 렌더 타겟들
//     const pars = {
//       minFilter: LinearFilter,
//       magFilter: LinearFilter,
//       format: RGBAFormat,
//     };
//     this.renderTargetsHorizontal = [];
//     this.renderTargetsVertical = [];
//     this.nMips = 5;
//     let resx = Math.round(this.resolution.x / 2);
//     let resy = Math.round(this.resolution.y / 2);

//     this.renderTargetBright = new WebGLRenderTarget(resx, resy, pars);
//     this.renderTargetBright.texture.name = 'UnrealBloomPass.bright';
//     this.renderTargetBright.texture.generateMipmaps = false;

//     for (let i = 0; i < this.nMips; i++) {
//       const renderTargetHorizonal = new WebGLRenderTarget(resx, resy, pars);

//       renderTargetHorizonal.texture.name = 'UnrealBloomPass.h' + i;
//       renderTargetHorizonal.texture.generateMipmaps = false;

//       this.renderTargetsHorizontal.push(renderTargetHorizonal);

//       const renderTargetVertical = new WebGLRenderTarget(resx, resy, pars);

//       renderTargetVertical.texture.name = 'UnrealBloomPass.v' + i;
//       renderTargetVertical.texture.generateMipmaps = false;

//       this.renderTargetsVertical.push(renderTargetVertical);

//       resx = Math.round(resx / 2);
//       resy = Math.round(resy / 2);
//     }

//     // 조도 하이패스 소재
//     if (LuminosityHighPassShader === undefined)
//       console.error(
//         'THREE.UnrealBloomPass는 LuminosityHighPassShader에 의존합니다.',
//       );

//     const highPassShader = LuminosityHighPassShader;
//     this.highPassUniforms = UniformsUtils.clone(highPassShader.uniforms);

//     this.highPassUniforms['luminosityThreshold'].value = threshold;
//     this.highPassUniforms['smoothWidth'].value = 0.01;

//     this.materialHighPassFilter = new ShaderMaterial({
//       uniforms: this.highPassUniforms,
//       vertexShader: highPassShader.vertexShader,
//       fragmentShader: highPassShader.fragmentShader,
//       defines: {},
//     });

//     // 가우시안 블러 소재
//     this.separableBlurMaterials = [];
//     const kernelSizeArray = [3, 5, 7, 9, 11];
//     resx = Math.round(this.resolution.x / 2);
//     resy = Math.round(this.resolution.y / 2);

//     for (let i = 0; i < this.nMips; i++) {
//       this.separableBlurMaterials.push(
//         this.getSeperableBlurMaterial(kernelSizeArray[i]),
//       );

//       this.separableBlurMaterials[i].uniforms['texSize'].value = new Vector2(
//         resx,
//         resy,
//       );

//       resx = Math.round(resx / 2);
//       resy = Math.round(resy / 2);
//     }

//     // 합성 소재
//     this.compositeMaterial = this.getCompositeMaterial(this.nMips);
//     this.compositeMaterial.uniforms['blurTexture1'].value =
//       this.renderTargetsVertical[0].texture;
//     this.compositeMaterial.uniforms['blurTexture2'].value =
//       this.renderTargetsVertical[1].texture;
//     this.compositeMaterial.uniforms['blurTexture3'].value =
//       this.renderTargetsVertical[2].texture;
//     this.compositeMaterial.uniforms['blurTexture4'].value =
//       this.renderTargetsVertical[3].texture;
//     this.compositeMaterial.uniforms['blurTexture5'].value =
//       this.renderTargetsVertical[4].texture;
//     this.compositeMaterial.uniforms['bloomStrength'].value = strength;
//     this.compositeMaterial.uniforms['bloomRadius'].value = 0.1;
//     this.compositeMaterial.needsUpdate = true;

//     const bloomFactors = [1.0, 0.8, 0.6, 0.4, 0.2];
//     this.compositeMaterial.uniforms['bloomFactors'].value = bloomFactors;
//     this.bloomTintColors = [
//       new Vector3(1, 1, 1),
//       new Vector3(1, 1, 1),
//       new Vector3(1, 1, 1),
//       new Vector3(1, 1, 1),
//       new Vector3(1, 1, 1),
//     ];
//     this.compositeMaterial.uniforms['bloomTintColors'].value =
//       this.bloomTintColors;

//     // 복사 소재
//     if (CopyShader === undefined) {
//       console.error('THREE.UnrealBloomPass는 CopyShader에 의존합니다.');
//     }

//     const copyShader = CopyShader;

//     this.copyUniforms = UniformsUtils.clone(copyShader.uniforms);
//     this.copyUniforms['opacity'].value = 1.0;

//     this.materialCopy = new ShaderMaterial({
//       uniforms: this.copyUniforms,
//       vertexShader: copyShader.vertexShader,
//       fragmentShader: copyShader.fragmentShader,
//       blending: AdditiveBlending,
//       depthTest: false,
//       depthWrite: false,
//       transparent: true,
//     });

//     this.enabled = true;
//     this.needsSwap = false;

//     this._oldClearColor = new Color();
//     this.oldClearAlpha = 1;

//     this.basic = new MeshBasicMaterial();

//     this.fsQuad = new FullScreenQuad(null);
//   }

//   dispose() {
//     for (let i = 0; i < this.renderTargetsHorizontal.length; i++) {
//       this.renderTargetsHorizontal[i].dispose();
//     }

//     for (let i = 0; i < this.renderTargetsVertical.length; i++) {
//       this.renderTargetsVertical[i].dispose();
//     }

//     this.renderTargetBright.dispose();
//   }

//   setSize(width, height) {
//     let resx = Math.round(width / 2);
//     let resy = Math.round(height / 2);

//     this.renderTargetBright.setSize(resx, resy);

//     for (let i = 0; i < this.nMips; i++) {
//       this.renderTargetsHorizontal[i].setSize(resx, resy);
//       this.renderTargetsVertical[i].setSize(resx, resy);

//       this.separableBlurMaterials[i].uniforms['texSize'].value = new Vector2(
//         resx,
//         resy,
//       );

//       resx = Math.round(resx / 2);
//       resy = Math.round(resy / 2);
//     }
//   }

//   render(renderer, writeBuffer, readBuffer, deltaTime, maskActive) {
//     renderer.getClearColor(this._oldClearColor);
//     this.oldClearAlpha = renderer.getClearAlpha();
//     const oldAutoClear = renderer.autoClear;
//     renderer.autoClear = false;

//     renderer.setClearColor(this.clearColor, 0);

//     if (maskActive) renderer.state.buffers.stencil.setTest(false);

//     // 입력을 화면에 렌더링
//     if (this.renderToScreen) {
//       this.fsQuad.material = this.basic;
//       this.basic.map = readBuffer.texture;

//       renderer.setRenderTarget(null);
//       renderer.clear();
//       this.fsQuad.render(renderer);
//     }

//     // 1. 밝은 영역 추출

//     this.highPassUniforms['tDiffuse'].value = readBuffer.texture;
//     this.highPassUniforms['luminosityThreshold'].value = this.threshold;
//     this.fsQuad.material = this.materialHighPassFilter;

//     renderer.setRenderTarget(this.renderTargetBright);
//     renderer.clear();
//     this.fsQuad.render(renderer);

//     // 2. 여러 MIP 레벨에서 광선을 블러링

//     let inputRenderTarget = this.renderTargetBright;

//     for (let i = 0; i < this.nMips; i++) {
//       this.fsQuad.material = this.separableBlurMaterials[i];

//       this.separableBlurMaterials[i].uniforms['colorTexture'].value =
//         inputRenderTarget.texture;
//       this.separableBlurMaterials[i].uniforms['direction'].value =
//         TransparentBackgroundFixedUnrealBloomPass.BlurDirectionX;

//       renderer.setRenderTarget(this.renderTargetsHorizontal[i]);
//       renderer.clear();
//       this.fsQuad.render(renderer);

//       this.separableBlurMaterials[i].uniforms['colorTexture'].value =
//         this.renderTargetsHorizontal[i].texture;
//       this.separableBlurMaterials[i].uniforms['direction'].value =
//         TransparentBackgroundFixedUnrealBloomPass.BlurDirectionY;

//       renderer.setRenderTarget(this.renderTargetsVertical[i]);
//       renderer.clear();
//       this.fsQuad.render(renderer);

//       inputRenderTarget = this.renderTargetsVertical[i];
//     }

//     // 3. 합성
//     this.fsQuad.material = this.compositeMaterial;
//     this.compositeMaterial.uniforms['bloomStrength'].value = this.strength;
//     this.compositeMaterial.uniforms['bloomRadius'].value = this.radius;
//     this.compositeMaterial.uniforms['bloomTintColors'].value =
//       this.bloomTintColors;

//     renderer.setRenderTarget(this.renderTargetsHorizontal[0]);
//     renderer.clear();
//     this.fsQuad.render(renderer);

//     // 4. 화면으로 출력
//     this.fsQuad.material = this.materialCopy;
//     this.copyUniforms['tDiffuse'].value =
//       this.renderTargetsHorizontal[0].texture;

//     if (maskActive) renderer.state.buffers.stencil.setTest(true);

//     if (this.renderToScreen) {
//       renderer.setRenderTarget(null);
//       this.fsQuad.render(renderer);
//     } else {
//       renderer.setRenderTarget(writeBuffer);
//       this.fsQuad.render(renderer);
//     }

//     // 복구
//     renderer.setClearColor(this._oldClearColor, this.oldClearAlpha);
//     renderer.autoClear = oldAutoClear;
//   }

//   getSeperableBlurMaterial(kernelRadius) {
//     return new ShaderMaterial({
//       defines: {
//         KERNEL_RADIUS: kernelRadius,
//         SIGMA: kernelRadius,
//       },

//       uniforms: {
//         colorTexture: { value: null },
//         texSize: { value: new Vector2(0.5, 0.5) },
//         direction: { value: new Vector2(0.5, 0.5) },
//       },

//       vertexShader:
//         'varying vec2 vUv;\n' +
//         'void main() {\n' +
//         'vUv = uv;\n' +
//         'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
//         '}',

//       fragmentShader:
//         '#include <common>\n' +
//         'varying vec2 vUv;\n' +
//         'uniform sampler2D colorTexture;\n' +
//         'uniform vec2 texSize;\n' +
//         'uniform vec2 direction;\n' +
//         'float gaussianPdf(in float x, in float sigma) {\n' +
//         'return 0.39894 * exp(-0.5 * x * x / (sigma * sigma)) / sigma;\n' +
//         '}\n' +
//         'void main() {\n' +
//         'vec2 invSize = 1.0 / texSize;\n' +
//         'float fSigma = float(SIGMA);\n' +
//         'float weightSum = gaussianPdf(0.0, fSigma);\n' +
//         'vec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\n' +
//         'for( int i = 1; i < KERNEL_RADIUS; i ++ ) {\n' +
//         'float x = float(i);\n' +
//         'float w = gaussianPdf(x, fSigma);\n' +
//         'vec2 uvOffset = direction * invSize * x;\n' +
//         'vec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\n' +
//         'vec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\n' +
//         'diffuseSum += (sample1 + sample2) * w;\n' +
//         'weightSum += 2.0 * w;\n' +
//         '}\n' +
//         'gl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n' +
//         '}',
//     });
//   }

//   getCompositeMaterial(nMips) {
//     return new ShaderMaterial({
//       defines: {
//         NUM_MIPS: nMips,
//       },

//       uniforms: {
//         blurTexture1: { value: null },
//         blurTexture2: { value: null },
//         blurTexture3: { value: null },
//         blurTexture4: { value: null },
//         blurTexture5: { value: null },
//         dirtTexture: { value: null },
//         bloomStrength: { value: 1.0 },
//         bloomFactors: { value: null },
//         bloomTintColors: { value: null },
//         bloomRadius: { value: 0.0 },
//       },

//       vertexShader:
//         'varying vec2 vUv;\n' +
//         'void main() {\n' +
//         'vUv = uv;\n' +
//         'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n' +
//         '}',

//       fragmentShader:
//         'varying vec2 vUv;\n' +
//         'uniform sampler2D blurTexture1;\n' +
//         'uniform sampler2D blurTexture2;\n' +
//         'uniform sampler2D blurTexture3;\n' +
//         'uniform sampler2D blurTexture4;\n' +
//         'uniform sampler2D blurTexture5;\n' +
//         'uniform sampler2D dirtTexture;\n' +
//         'uniform float bloomStrength;\n' +
//         'uniform float bloomRadius;\n' +
//         'uniform float bloomFactors[NUM_MIPS];\n' +
//         'uniform vec3 bloomTintColors[NUM_MIPS];\n' +
//         'float lerpBloomFactor(const in float factor) { \n' +
//         'float mirrorFactor = 1.2 - factor;\n' +
//         'return mix(factor, mirrorFactor, bloomRadius);\n' +
//         '}\n' +
//         'void main() {\n' +
//         'gl_FragColor = bloomStrength * ( \n' +
//         'lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \n' +
//         'lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \n' +
//         'lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \n' +
//         'lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \n' +
//         'lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\n' +
//         '}',
//     });
//   }
// }

// TransparentBackgroundFixedUnrealBloomPass.BlurDirectionX = new Vector2(
//   1.0,
//   0.0,
// );
// TransparentBackgroundFixedUnrealBloomPass.BlurDirectionY = new Vector2(
//   0.0,
//   1.0,
// );

// export { TransparentBackgroundFixedUnrealBloomPass };
