import * as THREE from 'three';

export function createNeuralNetworkVisualization(container, animationFrames, scenes, renderers) {
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const nodeGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const nodeMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x0066ff,
        transparent: true,
        opacity: 0.8
    });

    const nodes = [];
    const connections = [];

    for (let layer = 0; layer < 4; layer++) {
        const layerNodes = layer === 0 || layer === 3 ? 3 : 5;
        for (let i = 0; i < layerNodes; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.set(
                (layer - 1.5) * 4,
                (i - layerNodes / 2) * 2,
                0
            );
            nodes.push(node);
            scene.add(node);
        }
    }

    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0x00ffff,
        transparent: true,
        opacity: 0.3
    });

    for (let i = 0; i < nodes.length - 1; i++) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[i + 1].position
        ]);
        const line = new THREE.Line(geometry, lineMaterial.clone());
        connections.push(line);
        scene.add(line);
    }

    camera.position.z = 15;

    const animate = () => {
        nodes.forEach((node, index) => {
            const time = Date.now() * 0.001;
            node.material.opacity = 0.5 + 0.3 * Math.sin(time + index * 0.5);
            node.scale.setScalar(0.8 + 0.2 * Math.sin(time * 2 + index));
        });

        connections.forEach((connection, index) => {
            const time = Date.now() * 0.001;
            connection.material.opacity = 0.1 + 0.2 * Math.sin(time + index * 0.3);
        });

        renderer.render(scene, camera);
        animationFrames.set('neural', requestAnimationFrame(animate));
    };

    animate();

    scenes.set('neural', scene);
    renderers.set('neural', renderer);
}