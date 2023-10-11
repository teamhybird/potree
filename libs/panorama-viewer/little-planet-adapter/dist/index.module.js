/*!
 * PhotoSphereViewer.LittlePlanetAdapter 0.0.0
 * @copyright 2023 Damien "Mistic" Sorel
 * @licence MIT (https://opensource.org/licenses/MIT)
 */

// src/index.ts
import { DEFAULTS } from "@photo-sphere-viewer/core";

// src/LittlePlanetAdapter.ts
import { EquirectangularAdapter, events } from "@photo-sphere-viewer/core";
import { Euler, MathUtils, Matrix4, Mesh, PlaneGeometry, ShaderMaterial, Texture } from "three";
var euler = new Euler();
var LittlePlanetAdapter = class extends EquirectangularAdapter {
  constructor(viewer) {
    super(viewer, void 0);
    this.viewer.state.littlePlanet = true;
    this.viewer.addEventListener(events.SizeUpdatedEvent.type, this);
    this.viewer.addEventListener(events.ZoomUpdatedEvent.type, this);
    this.viewer.addEventListener(events.PositionUpdatedEvent.type, this);
  }
  supportsTransition() {
    return false;
  }
  supportsPreload() {
    return true;
  }
  /**
   * @internal
   */
  handleEvent(e) {
    if (e instanceof events.SizeUpdatedEvent) {
      this.__setResolution(e.size);
    } else if (e instanceof events.ZoomUpdatedEvent) {
      this.__setZoom();
    } else if (e instanceof events.PositionUpdatedEvent) {
      this.__setPosition(e.position);
    }
  }
  createMesh() {
    const geometry = new PlaneGeometry(20, 10).translate(0, 0, -1);
    const material = new ShaderMaterial({
      uniforms: {
        panorama: { value: new Texture() },
        resolution: { value: 2 },
        transform: { value: new Matrix4() },
        zoom: { value: 10 },
        opacity: { value: 1 }
      },
      vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4( position, 1.0 );
}`,
      fragmentShader: `
uniform sampler2D panorama;
uniform float resolution;
uniform mat4 transform;
uniform float zoom;
uniform float opacity;

varying vec2 vUv;

const float PI = 3.1415926535897932384626433832795;

void main() {
  vec2 position = -1.0 + 2.0 * vUv;
  position *= vec2( zoom * resolution, zoom * 0.5 );

  float x2y2 = position.x * position.x + position.y * position.y;
  vec3 sphere_pnt = vec3( 2. * position, x2y2 - 1. ) / ( x2y2 + 1. );
  sphere_pnt = vec3( transform * vec4( sphere_pnt, 1.0 ) );

  vec2 sampleUV = vec2(
    1.0 - (atan(sphere_pnt.y, sphere_pnt.x) / PI + 1.0) * 0.5,
    (asin(sphere_pnt.z) / PI + 0.5)
  );

  gl_FragColor = texture2D( panorama, sampleUV );
  gl_FragColor.a *= opacity;
}`
    });
    this.uniforms = material.uniforms;
    return new Mesh(geometry, material);
  }
  setTexture(mesh, textureData) {
    mesh.material.uniforms.panorama.value.dispose();
    mesh.material.uniforms.panorama.value = textureData.texture;
  }
  __setResolution(size) {
    this.uniforms.resolution.value = size.width / size.height;
  }
  __setZoom() {
    this.uniforms.zoom.value = Math.max(0.1, MathUtils.mapLinear(this.viewer.state.vFov, 90, 30, 50, 2));
  }
  __setPosition(position) {
    euler.set(Math.PI / 2 + position.pitch, 0, -Math.PI / 2 - position.yaw, "ZYX");
    this.uniforms.transform.value.makeRotationFromEuler(euler);
  }
};
LittlePlanetAdapter.id = "little-planet";
LittlePlanetAdapter.supportsDownload = true;
LittlePlanetAdapter.supportsOverlay = false;

// src/index.ts
DEFAULTS.defaultPitch = -Math.PI / 2;
export {
  LittlePlanetAdapter
};
//# sourceMappingURL=index.module.js.map