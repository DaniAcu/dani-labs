import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

import vertexShader from './shaders/vertex.glsl?raw';
import fragmentShader from './shaders/fragment.glsl?raw';
import { bassExtractor } from './bass-extractor';

export function renderIn(app) {

    bassExtractor.onBassUpdate((bassValue, event, info) => {
        console.log(`Bass ${event}:`, bassValue.toFixed(3), 'at', info.timestamp.toFixed(2) + 's');

        // Handle different events
        switch (event) {
            case 'pause':
                material.uniforms.uFrequency.value = new THREE.Vector2(0, 0);
                break;
            case 'update':
                material.uniforms.uFrequency.value = new THREE.Vector2(10 * bassValue, 7 * bassValue);
                break;
        }
    });


    const canvas = document.createElement('canvas');
    app.appendChild(canvas);

    const scene = new THREE.Scene();

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 1;

    scene.add(camera);


    const cursor = new OrbitControls(camera, canvas);
    cursor.enableDamping = true;

    const renderer = new THREE.WebGLRenderer({ canvas });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const geometry = new THREE.SphereGeometry(0.5, 64, 64)
    //const geometry = new THREE.PlaneGeometry(1, 1, 32, 32)
    const material = new THREE.RawShaderMaterial({
        side: THREE.DoubleSide,
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uFrequency: { value: new THREE.Vector2(0, 0) }
        }
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);


    const clock = new THREE.Clock()
    const loop = () => {
        const elapseTime = clock.getElapsedTime();
        cursor.update();
        renderer.render(scene, camera);

        material.uniforms.uTime.value = elapseTime;

        requestAnimationFrame(loop);
    }

    loop();

    return {
        cleanup() {
            canvas.remove();
        }
    }

}
