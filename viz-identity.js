export class IdentityVisualization {
    constructor() {
        this.identityRAF = null;
        this.memoryRAF = null;
    }

    createIdentityVisualization(identityCoreContainer, memoryClustersContainer) {
        if (identityCoreContainer) {
            identityCoreContainer.innerHTML = '';
            this.createIdentityCore(identityCoreContainer);
        }
        if (memoryClustersContainer) {
            memoryClustersContainer.innerHTML = '';
            this.createMemoryClusters(memoryClustersContainer);
        }
    }

    createIdentityCore(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        
        const animateIdentity = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            
            const coreRadius = 20 + Math.sin(time) * 5;
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreRadius);
            gradient.addColorStop(0, 'rgba(102, 0, 204, 0.8)');
            gradient.addColorStop(1, 'rgba(102, 0, 204, 0.1)');
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
            ctx.fill();
            
            for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2 + time * 0.5;
                const length = 30 + Math.sin(time + i) * 10;
                const endX = centerX + Math.cos(angle) * length;
                const endY = centerY + Math.sin(angle) * length;
                
                ctx.strokeStyle = `rgba(102, 0, 204, ${0.3 + Math.sin(time + i) * 0.2})`;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(endX, endY);
                ctx.stroke();
            }
            
            this.identityRAF = requestAnimationFrame(animateIdentity);
        };
        
        animateIdentity();
    }
    
    createMemoryClusters(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const clusters = [];
        
        for (let i = 0; i < 6; i++) {
            clusters.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 10 + 5,
                connections: []
            });
        }
        
        clusters.forEach((cluster, index) => {
            const connectionCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < connectionCount; i++) {
                const targetIndex = (index + 1 + i) % clusters.length;
                cluster.connections.push(targetIndex);
            }
        });
        
        const animateMemory = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            
            ctx.strokeStyle = 'rgba(102, 0, 204, 0.3)';
            ctx.lineWidth = 1;
            clusters.forEach((cluster, index) => {
                cluster.connections.forEach(targetIndex => {
                    const target = clusters[targetIndex];
                    const alpha = 0.2 + Math.sin(time + index) * 0.1;
                    ctx.strokeStyle = `rgba(102, 0, 204, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(cluster.x, cluster.y);
                    ctx.lineTo(target.x, target.y);
                    ctx.stroke();
                });
            });
            
            clusters.forEach((cluster, index) => {
                const pulse = Math.sin(time + index) * 0.3 + 0.7;
                const alpha = 0.4 + pulse * 0.4;
                ctx.fillStyle = `rgba(102, 0, 204, ${alpha})`;
                ctx.beginPath();
                ctx.arc(cluster.x, cluster.y, cluster.size * pulse, 0, Math.PI * 2);
                ctx.fill();
            });
            
            this.memoryRAF = requestAnimationFrame(animateMemory);
        };
        
        animateMemory();
    }
    
    destroy() {
        if (this.identityRAF) cancelAnimationFrame(this.identityRAF);
        if (this.memoryRAF) cancelAnimationFrame(this.memoryRAF);
    }
}