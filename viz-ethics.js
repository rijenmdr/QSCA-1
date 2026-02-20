export class EthicsVisualization {
    constructor() {
        this.ethicsRAF = null;
        this.compassRAF = null;
        this.currentEthicsValues = { beneficence: 1.0, nonMaleficence: 1.0, autonomy: 0.8, justice: 0.9, transparency: 0.7 };
        this.ethicsBarData = [];
    }

    updateEthicsValues(newValues) { 
        this.currentEthicsValues = newValues;
    }

    createEthicsVisualization(ethicsMatrixContainer, moralCompassContainer) {
        if (ethicsMatrixContainer) {
            ethicsMatrixContainer.innerHTML = '';
            this.createEthicsMatrix(ethicsMatrixContainer);
        }
        if (moralCompassContainer) {
            moralCompassContainer.innerHTML = '';
            this.createMoralCompass(moralCompassContainer);
        }
    }

    createEthicsMatrix(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        const animateEthics = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            const values = Object.keys(this.currentEthicsValues);
            const barWidth = canvas.width / values.length;
            
            values.forEach((key, index) => {
                const targetValue = this.currentEthicsValues[key];
                if (typeof this.ethicsBarData[index] !== 'number') {
                    this.ethicsBarData[index] = targetValue;
                } else {
                    this.ethicsBarData[index] += (targetValue - this.ethicsBarData[index]) * 0.1;
                }
                
                const displayValue = this.ethicsBarData[index];
                const height = displayValue * canvas.height * 0.8;
                const x = index * barWidth;
                const alpha = 0.3 + displayValue * 0.5;
                
                ctx.fillStyle = `rgba(0, 204, 102, ${alpha})`;
                ctx.fillRect(x + 5, canvas.height - height, barWidth - 10, height);
                
                ctx.fillStyle = 'rgba(0, 204, 102, 0.8)';
                ctx.font = '8px Orbitron';
                ctx.textAlign = 'center';
                
                let label = key.slice(0, 8);
                if (key === 'nonMaleficence') label = 'Non-Mal';
                
                ctx.fillText(label, x + barWidth / 2, canvas.height - 5);
                ctx.fillText(displayValue.toFixed(2), x + barWidth / 2, canvas.height - 15 - (height > canvas.height * 0.7 ? 10 : 0));
            });
            
            this.ethicsRAF = requestAnimationFrame(animateEthics);
        };
        
        animateEthics();
    }
    
    createMoralCompass(container) {
        const canvas = document.createElement('canvas');
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        const animateCompass = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const time = Date.now() * 0.001;
            
            ctx.strokeStyle = 'rgba(0, 204, 102, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            const directions = ['Good', 'Truth', 'Beauty', 'Justice'];
            directions.forEach((direction, index) => {
                const angle = (index / directions.length) * Math.PI * 2;
                const x = centerX + Math.cos(angle) * radius * 0.8;
                const y = centerY + Math.sin(angle) * radius * 0.8;
                ctx.fillStyle = 'rgba(0, 204, 102, 0.7)';
                ctx.font = '10px Orbitron';
                ctx.textAlign = 'center';
                ctx.fillText(direction, x, y);
            });
            
            const needleAngle = time * 0.2;
            const needleLength = radius * 0.6;
            const needleX = centerX + Math.cos(needleAngle) * needleLength;
            const needleY = centerY + Math.sin(needleAngle) * needleLength;
            
            ctx.strokeStyle = 'rgba(0, 204, 102, 0.9)';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(needleX, needleY);
            ctx.stroke();
            
            this.compassRAF = requestAnimationFrame(animateCompass);
        };
        
        animateCompass();
    }

    destroy() {
        if (this.ethicsRAF) cancelAnimationFrame(this.ethicsRAF);
        if (this.compassRAF) cancelAnimationFrame(this.compassRAF);
    }
}