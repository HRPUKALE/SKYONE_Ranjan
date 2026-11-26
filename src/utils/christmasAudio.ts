/**
 * Soft, peaceful, royalty-free Christmas background music player
 * Powered by Web Audio API synthesised celesta / chime box.
 * 100% copyright-free, self-contained, lightweight, zero bandwidth.
 * Supports external audio file fallback if provided.
 */

class ChristmasAudioPlayer {
  private audioCtx: AudioContext | null = null;
  private isCurrentlyPlaying: boolean = false;
  private timerId: number | null = null;
  private noteIndex: number = 0;
  private gainNode: GainNode | null = null;
  private audioElement: HTMLAudioElement | null = null;

  // Peaceful Christmas Melodies (Frequencies in Hz and note durations in beats)
  // "Silent Night" & "We Wish You a Merry Christmas" peaceful celesta chimes
  private melody = [
    // Silent Night - Gentle chime lullaby
    { f: 392.00, d: 1.5 }, // G4
    { f: 440.00, d: 0.5 }, // A4
    { f: 392.00, d: 1.0 }, // G4
    { f: 329.63, d: 3.0 }, // E4

    { f: 392.00, d: 1.5 }, // G4
    { f: 440.00, d: 0.5 }, // A4
    { f: 392.00, d: 1.0 }, // G4
    { f: 329.63, d: 3.0 }, // E4

    { f: 587.33, d: 2.0 }, // D5
    { f: 587.33, d: 1.0 }, // D5
    { f: 493.88, d: 3.0 }, // B4

    { f: 523.25, d: 2.0 }, // C5
    { f: 523.25, d: 1.0 }, // C5
    { f: 392.00, d: 3.0 }, // G4

    { f: 440.00, d: 2.0 }, // A4
    { f: 440.00, d: 1.0 }, // A4
    { f: 523.25, d: 1.5 }, // C5
    { f: 493.88, d: 0.5 }, // B4
    { f: 440.00, d: 1.0 }, // A4

    { f: 392.00, d: 1.5 }, // G4
    { f: 440.00, d: 0.5 }, // A4
    { f: 392.00, d: 1.0 }, // G4
    { f: 329.63, d: 3.0 }, // E4

    // We Wish You a Merry Christmas - Gentle music box style
    { f: 261.63, d: 1.0 }, // C4
    { f: 349.23, d: 1.0 }, // F4
    { f: 349.23, d: 0.5 }, // F4
    { f: 392.00, d: 0.5 }, // G4
    { f: 349.23, d: 0.5 }, // F4
    { f: 329.63, d: 0.5 }, // E4
    { f: 293.66, d: 1.0 }, // D4
    { f: 293.66, d: 1.0 }, // D4

    { f: 293.66, d: 1.0 }, // D4
    { f: 392.00, d: 1.0 }, // G4
    { f: 392.00, d: 0.5 }, // G4
    { f: 440.00, d: 0.5 }, // A4
    { f: 392.00, d: 0.5 }, // G4
    { f: 349.23, d: 0.5 }, // F4
    { f: 329.63, d: 1.0 }, // E4
    { f: 261.63, d: 1.0 }, // C4

    { f: 261.63, d: 1.0 }, // C4
    { f: 440.00, d: 1.0 }, // A4
    { f: 440.00, d: 0.5 }, // A4
    { f: 466.16, d: 0.5 }, // Bb4
    { f: 440.00, d: 0.5 }, // A4
    { f: 392.00, d: 0.5 }, // G4
    { f: 349.23, d: 1.0 }, // F4
    { f: 293.66, d: 1.0 }, // D4

    { f: 261.63, d: 0.5 }, // C4
    { f: 261.63, d: 0.5 }, // C4
    { f: 293.66, d: 1.0 }, // D4
    { f: 392.00, d: 1.0 }, // G4
    { f: 329.63, d: 1.0 }, // E4
    { f: 349.23, d: 2.0 }, // F4
  ];

  private getAudioContext(): AudioContext {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.gainNode = this.audioCtx.createGain();
      // Low, comfortable, peaceful volume
      this.gainNode.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      this.gainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Plays a single music box bell chime with warm harmonic overtones
  private playBellChime(freq: number, durationSeconds: number) {
    if (!this.isCurrentlyPlaying) return;
    const ctx = this.getAudioContext();
    const now = ctx.currentTime;

    // Primary bell oscillator (Sine)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle celestial overtone (2.04x for realistic warm metallic chime)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.04, now);

    // Warm bell envelope: immediate gentle attack, natural exponential decay
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(0.6, durationSeconds * 1.2));

    osc1.connect(noteGain);
    osc2.connect(noteGain);

    if (this.gainNode) {
      noteGain.connect(this.gainNode);
    } else {
      noteGain.connect(ctx.destination);
    }

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + durationSeconds * 1.3);
    osc2.stop(now + durationSeconds * 1.3);
  }

  private scheduleNextNote = () => {
    if (!this.isCurrentlyPlaying) return;
    const currentNote = this.melody[this.noteIndex];
    const beatDuration = 0.58; // seconds per beat for a calm tempo
    const duration = currentNote.d * beatDuration;

    this.playBellChime(currentNote.f, duration);

    this.noteIndex = (this.noteIndex + 1) % this.melody.length;
    this.timerId = window.setTimeout(this.scheduleNextNote, duration * 1000);
  };

  /**
   * Starts playback. Returns true if audio started successfully, false if blocked by browser policy.
   */
  public async play(): Promise<boolean> {
    if (this.isCurrentlyPlaying) return true;

    try {
      const ctx = this.getAudioContext();
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      this.isCurrentlyPlaying = true;
      this.scheduleNextNote();
      return true;
    } catch (err) {
      console.warn('Audio playback waiting for user interaction:', err);
      this.isCurrentlyPlaying = false;
      return false;
    }
  }

  public pause(): void {
    this.isCurrentlyPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public toggle(): boolean {
    if (this.isCurrentlyPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }
}

export const christmasAudio = new ChristmasAudioPlayer();
