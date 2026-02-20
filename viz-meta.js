import * as THREE from 'three';

export class MetaAgentVisualization {
    constructor() {
        this.raf = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
    }

    create(container) {
        if (!container) return;
        
        const width = container.clientWidth;
        const height = container.clientHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0);
        container.appendChild(this.renderer.domElement);

        const coreGeo = new THREE.IcosahedronGeometry(2, 2);
        const coreMat = new THREE.MeshPhongMaterial({
            color: 0x00ffff,
            wireframe: true,
            emissive: 0x00ffff,
            emissiveIntensity: 0.5
        });
        this.metaCore = new THREE.Mesh(coreGeo, coreMat);
        this.scene.add(this.metaCore);

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(5, 5, 5);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));

        this.subAgents = [];
        const colors = [0xff00ff, 0x0066ff, 0xff6600, 0x00cc66];
        for (let i = 0; i < 4; i++) {
            const subGeo = new THREE.SphereGeometry(0.5, 16, 16);
            const subMat = new THREE.MeshBasicMaterial({ color: colors[i] });
            const subAgent = new THREE.Mesh(subGeo, subMat);
            this.subAgents.push(subAgent);
            this.scene.add(subAgent);
        }

        this.camera.position.z = 10;

        const animate = () => {
            const time = Date.now() * 0.001;
            this.metaCore.rotation.y += 0.01;
            this.metaCore.rotation.x += 0.005;
            this.metaCore.scale.setScalar(1 + Math.sin(time * 2) * 0.1);

            this.subAgents.forEach((agent, i) => {
                const angle = time + (i * Math.PI * 0.5);
                agent.position.x = Math.cos(angle) * 5;
                agent.position.z = Math.sin(angle) * 5;
                agent.position.y = Math.sin(time * 0.5 + i) * 2;
                agent.scale.setScalar(0.8 + Math.sin(time * 5 + i) * 0.2);
            });

            this.renderer.render(this.scene, this.camera);
            this.raf = requestAnimationFrame(animate);
        };

        animate();
    }

    destroy() {
        if (this.raf) cancelAnimationFrame(this.raf);
        if (this.renderer) {
            this.renderer.dispose();
            this.renderer.domElement.remove();
        }
    }
}