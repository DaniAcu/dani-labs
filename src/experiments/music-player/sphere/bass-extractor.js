class BassExtractor {
    constructor(options = {}) {
        this.audioContext = null;
        this.analyser = null;
        this.source = null;
        this.gainNode = null;
        this.isPlaying = false;
        this.currentBassValue = 0;
        this.callbacks = [];
        this.animationId = null;

        // Configuration
        this.config = {
            maxBassFreq: options.maxBassFreq || 250,  // Max bass frequency in Hz
            smoothing: options.smoothing || 0.8,     // Analyser smoothing (0-1)
            fftSize: options.fftSize || 2048,        // FFT size for analysis
            volume: options.volume || 0.7            // Audio volume
        };
    }

    // Load audio file and prepare for analysis
    async loadAudio(audioFile) {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            const arrayBuffer = await audioFile.arrayBuffer();
            this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);

            return true;
        } catch (error) {
            console.error('Error loading audio:', error);
            return false;
        }
    }

    // Add callback for bass value updates
    onBassUpdate(callback) {
        this.callbacks.push(callback);
    }

    // Remove callback
    removeCallback(callback) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }

    // Start playing audio in loop with real-time bass analysis
    async playWithBassDetection() {
        if (!this.audioBuffer) {
            throw new Error('No audio loaded. Call loadAudio() first.');
        }

        try {
            if (this.audioContext.state === 'suspended') {
                await this.audioContext.resume();
            }

            // Create audio nodes
            this.source = this.audioContext.createBufferSource();
            this.analyser = this.audioContext.createAnalyser();
            this.gainNode = this.audioContext.createGain();

            // Configure analyser for bass detection
            this.analyser.fftSize = this.config.fftSize;
            this.analyser.smoothingTimeConstant = this.config.smoothing;

            // Configure gain
            this.gainNode.gain.value = this.config.volume;

            // Connect audio graph
            this.source.buffer = this.audioBuffer;
            this.source.connect(this.analyser);
            this.analyser.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);

            // Enable looping
            this.source.loop = true;

            // Audio event listeners
            this.source.addEventListener('ended', () => {
                this.triggerCallbacks('loop', this.currentBassValue);
            });

            // Start playback
            this.source.start(0);
            this.isPlaying = true;

            // Start real-time analysis using requestAnimationFrame (synced with display)
            this.startBassAnalysis();

            // Trigger play event
            this.triggerCallbacks('play', this.currentBassValue);

            return true;
        } catch (error) {
            console.error('Error starting playback:', error);
            return false;
        }
    }

    // Core method: Start real-time bass analysis using requestAnimationFrame
    startBassAnalysis() {
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let lastBassValue = 0;

        const analyze = () => {
            if (!this.isPlaying) return;

            // Get frequency data
            this.analyser.getByteFrequencyData(dataArray);

            // Calculate bass energy in specified frequency range
            const nyquist = this.audioContext.sampleRate / 2;
            const maxBassIndex = Math.floor((this.config.maxBassFreq / nyquist) * bufferLength);

            let bassSum = 0;
            for (let i = 0; i < maxBassIndex; i++) {
                bassSum += dataArray[i];
            }

            // Normalize to 0-1 range
            this.currentBassValue = bassSum / (maxBassIndex * 255);

            // Trigger callbacks only when value changes significantly (reduces CPU)
            const threshold = 0.001;
            if (Math.abs(this.currentBassValue - lastBassValue) > threshold) {
                this.triggerCallbacks('update', this.currentBassValue);
                lastBassValue = this.currentBassValue;
            }

            // Continue analysis synced with display refresh rate
            this.animationId = requestAnimationFrame(analyze);
        };

        analyze();
    }

    // Trigger all registered callbacks
    triggerCallbacks(event, bassValue) {
        this.callbacks.forEach(callback => {
            try {
                callback(bassValue, event, {
                    timestamp: this.audioContext.currentTime,
                    isPlaying: this.isPlaying
                });
            } catch (error) {
                console.error('Callback error:', error);
            }
        });
    }

    // Main method: Get current normalized bass value (0-1)
    getCurrentBass() {
        return this.currentBassValue;
    }

    // Stop playback and analysis
    stop() {
        if (this.source) {
            this.source.stop();
            this.source.disconnect();
        }

        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        this.isPlaying = false;
        this.currentBassValue = 0;

        // Trigger stop event
        this.triggerCallbacks('stop', 0);
    }

    // Pause playback (preserves position)
    pause() {
        if (this.isPlaying) {
            this.stop();
            this.triggerCallbacks('pause', this.currentBassValue);
        }
    }

    // Update configuration
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };

        // Apply changes to active analyser
        if (this.analyser && this.isPlaying) {
            if (newConfig.smoothing !== undefined) {
                this.analyser.smoothingTimeConstant = newConfig.smoothing;
            }
        }

        if (this.gainNode && newConfig.volume !== undefined) {
            this.gainNode.gain.value = newConfig.volume;
        }
    }

    // Check if currently playing
    getIsPlaying() {
        return this.isPlaying;
    }

    // Get audio context time
    getCurrentTime() {
        return this.audioContext ? this.audioContext.currentTime : 0;
    }
}

export const bassExtractor = new BassExtractor({
    maxBassFreq: 250,
    smoothing: 0.8,
    volume: 0.7
});