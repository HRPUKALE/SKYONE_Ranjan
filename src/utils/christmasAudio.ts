/**
 * Background Christmas Music Player
 * Plays the custom Christmas instrumental track (/christmas-song.mp3)
 * at a soft, comfortable volume with autoplay support and user mute/unmute control.
 */

type StateListener = (isPlaying: boolean) => void;

class ChristmasAudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private isCurrentlyPlaying = false;
  private userMuted = false;
  private listeners = new Set<StateListener>();

  private ensureAudio(): HTMLAudioElement {
    if (!this.audio) {
      const audio = new Audio('/christmas-song.mp3');
      audio.loop = true;
      audio.volume = 0.25; // Soft, comfortable background volume
      audio.preload = 'auto';

      audio.addEventListener('play', () => {
        this.isCurrentlyPlaying = true;
        this.notify();
      });

      audio.addEventListener('pause', () => {
        this.isCurrentlyPlaying = false;
        this.notify();
      });

      this.audio = audio;
    }
    return this.audio;
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isCurrentlyPlaying));
  }

  public subscribe(listener: StateListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Attempts to start playback. Returns true if started, false if blocked by browser policy.
   */
  public async play(fromAutoGesture = false): Promise<boolean> {
    if (fromAutoGesture && this.userMuted) {
      return false;
    }

    const audio = this.ensureAudio();
    if (!audio.paused) {
      this.isCurrentlyPlaying = true;
      return true;
    }

    try {
      await audio.play();
      this.isCurrentlyPlaying = true;
      this.userMuted = false;
      this.notify();
      return true;
    } catch {
      this.isCurrentlyPlaying = false;
      this.notify();
      return false;
    }
  }

  public pause(explicitUserAction = false): void {
    if (explicitUserAction) {
      this.userMuted = true;
    }
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    this.isCurrentlyPlaying = false;
    this.notify();
  }

  public async toggle(): Promise<boolean> {
    if (this.isCurrentlyPlaying) {
      this.pause(true);
      return false;
    } else {
      this.userMuted = false;
      return await this.play(false);
    }
  }

  public hasUserMuted(): boolean {
    return this.userMuted;
  }

  public isPlaying(): boolean {
    return this.isCurrentlyPlaying;
  }
}

export const christmasAudio = new ChristmasAudioPlayer();
