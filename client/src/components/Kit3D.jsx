import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const Kit3D = () => {

    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;
        const width = window.innerWidth;

        const isMobile = width < 768
            ? [0.045, 0.045, 0.03]
            : [0.06, 0.06, 0.05];
        console.log(width);
        // Scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xD40000);

        // Lights
        const pointLight = new THREE.PointLight(0xffffff, 4);
        pointLight.position.set(0.6, 1.2, 1.7);
        scene.add(pointLight);

        const ambientLight = new THREE.AmbientLight();
        scene.add(ambientLight);


        // Camera
        const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(0.07, 0.7, 3.7);

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.clientWidth, container.clientHeight);

        // Controls


        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = false;
        controls.enableDamping = true;
        controls.target.set(0.08, 0.08, 0.7);

        // postprocessing
        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const glitchPass = new GlitchPass();
        composer.addPass(glitchPass);

        const outputPass = new OutputPass();
        composer.addPass(outputPass);

        // Resize handling
        let resizeRAF;
        const resizeObserver = new ResizeObserver(() => {
            if (resizeRAF) cancelAnimationFrame(resizeRAF);
            resizeRAF = requestAnimationFrame(() => {
                const width = container.clientWidth;
                const height = container.clientHeight;
                if (width === 0 || height === 0) return;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
                composer.setSize(width, height);
            });
        });
        resizeObserver.observe(container);



        // Load 3D model
        const fbxLoader = new FBXLoader();
        fbxLoader.load(
            './pixelKit/Pixel2.fbx',
            (object) => {
                //object.scale.set(0.045, 0.045, 0.03);
                object.scale.set(...isMobile);
                scene.add(object);

                renderer.setAnimationLoop((time) => {
                    object.position.y = Math.sin(time * 0.001 * Math.PI) * 0.015;
                    controls.update();
                    composer.render();
                });
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.error('Error loading FBX model:', error);
            }
        );


        // Cleanup on unmount
        return () => {
            resizeObserver.disconnect();
            renderer.setAnimationLoop(null);
            controls.dispose();
            renderer.dispose();
            scene.traverse((obj) => {
                if (obj.geometry) obj.geometry.dispose();
                if (obj.material) {
                    if (Array.isArray(obj.material)) {
                        obj.material.forEach((m) => m.dispose());
                    } else {
                        obj.material.dispose();
                    }
                }
            });
        };
    }, []);

    return (
        <div ref={containerRef} style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <canvas ref={canvasRef} style={{
                display: 'block',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }} />
        </div>
    );
};

export default Kit3D;