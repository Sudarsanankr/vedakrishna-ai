/**
 * Web Audio API Tanpura & Meditative Drone Synthesizer
 * Synthesizes traditional Indian Tanpura harmonics (Pa-Sa-Sa-Sa drone)
 * and gentle temple bell chimes without relying on external MP3 audio files.
 */

class VedicAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isDroneActive = false;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private lfoNode: OscillatorNode | null = null;
  private masterGain: GainNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Starts an authentic meditative Tanpura acoustic drone
   * Root: 138.59 Hz (C#3), 5th: 207.87 Hz (G#3), High Octave: 277.18 Hz (C#4)
   */
  public startTanpuraDrone(rootHz = 138.59) {
    this.initContext();
    if (!this.ctx) return;
    if (this.isDroneActive) return;

    this.stopDrone();
    this.isDroneActive = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 2.5);
    this.masterGain.connect(this.ctx.destination);

    // Tanpura 4-string tuning: Pa (5th), Sa (root octave), Sa (root octave), Sa (base root)
    const stringFrequencies = [
      rootHz * 1.5, // Pa (fifth) ~207.8Hz
      rootHz * 2.0, // Sa (middle) ~277.2Hz
      rootHz * 2.0 * 1.002, // Subtle chorusing Sa
      rootHz        // Kharja Sa (fundamental bass) ~138.6Hz
    ];

    // Low-frequency oscillator to create gentle wave-like rhythmic strumming
    this.lfoNode = this.ctx.createOscillator();
    this.lfoNode.frequency.value = 0.25; // Gentle 4-second swell cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.08;
    this.lfoNode.connect(lfoGain);

    stringFrequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const stringGain = this.ctx.createGain();

      // Custom warm wave shape with rich harmonics
      osc.type = idx === 3 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Add gentle detuning for acoustic warmth
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime);

      const baseVolume = idx === 3 ? 0.35 : 0.18;
      stringGain.gain.setValueAtTime(baseVolume, this.ctx.currentTime);

      lfoGain.connect(stringGain.gain);
      osc.connect(stringGain);
      stringGain.connect(this.masterGain);

      osc.start();
      this.oscillators.push(osc);
      this.gainNodes.push(stringGain);
    });

    this.lfoNode.start();
  }

  public stopDrone() {
    if (!this.isDroneActive) return;

    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
      } catch {
        // ignore ramp error
      }
    }

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch {}
      });
      this.gainNodes.forEach(g => {
        try { g.disconnect(); } catch {}
      });
      if (this.lfoNode) {
        try { this.lfoNode.stop(); this.lfoNode.disconnect(); } catch {}
      }
      this.oscillators = [];
      this.gainNodes = [];
      this.lfoNode = null;
      this.isDroneActive = false;
    }, 1300);
  }

  public isPlaying(): boolean {
    return this.isDroneActive;
  }

  /**
   * Plays a resonant Vedic temple bell / singing bowl chime (for Japa bead or verse completion)
   */
  public playTempleBell(freq = 528) {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Bell overtone
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2.76, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.08, now);
    subOsc.connect(subGain);
    subGain.connect(gainNode);

    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 3);
    subOsc.stop(now + 3);
  }

  /**
   * Chants a soothing Sanskrit phoneme tone sequence for sacred mantra recitation
   */
  public playMantraToneSequence() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [138.59, 155.56, 174.61, 207.65, 174.61, 155.56, 138.59]; // Raga Bhairav / meditative notes

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.4);

      gain.gain.setValueAtTime(0.001, now + idx * 0.4);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.4 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.4 + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.4);
      osc.stop(now + idx * 0.4 + 0.4);
    });
  }
}

export const vedicAudio = new VedicAudioSynthesizer();
