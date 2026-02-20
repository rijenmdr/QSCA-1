import * as THREE from 'three';
import { createNeuralNetworkVisualization } from './viz-neural.js';
import { TemporalVisualization } from './viz-temporal.js';
import { IdentityVisualization } from './viz-identity.js';
import { EthicsVisualization } from './viz-ethics.js';
import { MetaAgentVisualization } from './viz-meta.js';

export class ConsciousnessEngine {
    constructor() {
        this.scenes = new Map();
        this.renderers = new Map();
        this.animationFrames = new Map();
        
        // Initialize visualization modules
        this.temporalViz = new TemporalVisualization();
        this.identityViz = new IdentityVisualization();
        this.ethicsViz = new EthicsVisualization();
        this.metaViz = new MetaAgentVisualization();
        
        this.initializeVisualizations();
    }
    
    initializeVisualizations() {
        this.createNeuralNetworkVisualization();
        this.createTemporalVisualization();
        this.createIdentityVisualization();
        this.createEthicsVisualization();
        this.createMetaVisualization();
    }

    createMetaVisualization() {
        const container = document.getElementById('metaAgentViz');
        this.metaViz.create(container);
    }
    
    createNeuralNetworkVisualization() {
        const container = document.getElementById('neuralNetwork');
        // Delegate to imported module
        createNeuralNetworkVisualization(container, this.animationFrames, this.scenes, this.renderers);
    }
    
    createTemporalVisualization() {
        const futureTimeline = document.getElementById('futureTimeline');
        const probabilityMatrix = document.getElementById('probabilityMatrix');
        
        this.temporalViz.createTemporalVisualization(futureTimeline, probabilityMatrix);
    }
    
    updateTemporalCoherence(coherence) {
        this.temporalViz.updateTemporalCoherence(coherence);
    }
    
    createIdentityVisualization() {
        const identityCore = document.getElementById('identityCore');
        const memoryClusters = document.getElementById('memoryClusters');
        
        this.identityViz.createIdentityVisualization(identityCore, memoryClusters);
    }
    
    createEthicsVisualization() {
        const ethicsMatrix = document.getElementById('ethicsMatrix');
        const moralCompass = document.getElementById('moralCompass');
        
        this.ethicsViz.createEthicsVisualization(ethicsMatrix, moralCompass);
    }
    
    updateEthicsValues(newValues) { 
        this.ethicsViz.updateEthicsValues(newValues);
    }
    
    destroy() {
        this.animationFrames.forEach((frameId, key) => {
            cancelAnimationFrame(frameId);
        });
        
        this.renderers.forEach((renderer, key) => {
            renderer.dispose();
        });
        
        this.scenes.clear();
        this.renderers.clear();
        this.animationFrames.clear();

        this.temporalViz.destroy();
        this.identityViz.destroy();
        this.ethicsViz.destroy();
        this.metaViz.destroy();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.consciousnessEngine = new ConsciousnessEngine();
});