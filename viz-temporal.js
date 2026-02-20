export class TemporalVisualization {
    constructor() {
        this.temporalCoherence = 1.0; 
        this.timelineRAF = null;
        this.probabilityRAF = null;
    }

    updateTemporalCoherence(coherence) { 
        this.temporalCoherence = coherence;
    }

    createTemporalVisualization(futureTimelineContainer, probabilityMatrixContainer) {
        if (futureTimelineContainer) {
            futureTimelineContainer.innerHTML = '';
            this.createTimelineEffect(futureTimelineContainer);
        }
        if (probabilityMatrixContainer) {
            probabilityMatrixContainer.innerHTML = '';
            this.createProbabilityEffect(probabilityMatrixContainer);
        }
    }

    createTimelineEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const timeNodes = [];
        
        for (let i = 0; i < 5; i++) {
            timeNodes.push({
                x: (i + 1) * (canvas.width / 6),
                y: canvas.height / 2,
                radius: 5,
                probability: Math.random(),
                phase: Math.random() * Math.PI * 2
            });
        }
        
        const animateTimeline = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            
            ctx.strokeStyle = '#ff6600';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(20, canvas.height / 2);
            ctx.lineTo(canvas.width - 20, canvas.height / 2);
            ctx.stroke();
            
            const influence = 0.5 + 0.5 * this.temporalCoherence;
            
            timeNodes.forEach((node, index) => {
                const pulse = Math.sin(time + node.phase) * 0.5 + 0.5;
                const alpha = 0.3 + pulse * 0.7 * influence;
                
                ctx.fillStyle = `rgba(255, 102, 0, ${alpha})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y + Math.sin(time + index) * 10 * influence, 
                       node.radius * (1 + pulse * 0.5), 0, Math.PI * 2);
                ctx.fill();
                
                ctx.strokeStyle = `rgba(255, 102, 0, ${alpha * 0.5})`;
                ctx.lineWidth = 1;
                for (let r = 10; r < 50; r += 10) {
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, r * pulse * influence, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            
            this.timelineRAF = requestAnimationFrame(animateTimeline);
        };
        
        animateTimeline();
    }
    
    createProbabilityEffect(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        const animateProbability = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            const gridSize = 20;
            for (let x = 0; x < canvas.width; x += gridSize) {
                for (let y = 0; y < canvas.height; y += gridSize) {
                    const probability = Math.sin(time + x * 0.01 + y * 0.01) * 0.5 + 0.5;
                    const alpha = probability * 0.5;
                    ctx.fillStyle = `rgba(255, 102, 0, ${alpha})`;
                    ctx.fillRect(x, y, 2, 2);
                }
            }
            this.probabilityRAF = requestAnimationFrame(animateProbability);
        };
        
        animateProbability();
    }

    destroy() {
        if (this.timelineRAF) cancelAnimationFrame(this.timelineRAF);
        if (this.probabilityRAF) cancelAnimationFrame(this.probabilityRAF);
    }
}