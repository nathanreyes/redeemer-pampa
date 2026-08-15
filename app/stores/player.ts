import { defineStore } from 'pinia';

export interface Track {
  id: string;
  title: string;
  leader: string;
  series: string;
  date: string;
  audioUrl: string;
  /** Seconds, from the feed. Known before the audio loads. */
  duration: number;
}

const RESUME_KEY = 'rp:player:resume';
/** Don't offer to resume a sermon that was nearly finished, or barely begun. */
const RESUME_MIN = 30;
const RESUME_TAIL = 60;

export const usePlayer = defineStore('player', () => {
  const current = shallowRef<Track | null>(null);
  const queue = shallowRef<Track[]>([]);
  const playing = ref(false);
  const waiting = ref(false);
  const elapsed = ref(0);
  const total = ref(0);
  const failed = ref(false);

  /**
   * One <audio>, created lazily and never torn down. It lives here rather than
   * in a component so that playback is untouched by navigation — the component
   * only reflects this state.
   */
  let el: HTMLAudioElement | null = null;

  const resumeStore = (): Record<string, number> => {
    if (!import.meta.client) return {};
    try {
      return JSON.parse(localStorage.getItem(RESUME_KEY) || '{}');
    } catch {
      return {};
    }
  };

  const rememberPosition = () => {
    if (!import.meta.client || !current.value || !el) return;
    const at = el.currentTime;
    const end = el.duration || current.value.duration;
    const map = resumeStore();
    if (at > RESUME_MIN && (!end || at < end - RESUME_TAIL)) {
      map[current.value.id] = Math.floor(at);
    } else {
      delete map[current.value.id];
    }
    try {
      localStorage.setItem(RESUME_KEY, JSON.stringify(map));
    } catch {
      /* storage full or blocked — resume is a nicety, not a requirement */
    }
  };

  let lastSaved = 0;

  const audio = () => {
    if (!import.meta.client) return null;
    if (el) return el;

    el = new Audio();
    el.preload = 'metadata';

    el.addEventListener('timeupdate', () => {
      elapsed.value = el!.currentTime;
      // Throttle writes; timeupdate fires ~4x a second.
      if (Date.now() - lastSaved > 5000) {
        lastSaved = Date.now();
        rememberPosition();
      }
    });
    el.addEventListener('loadedmetadata', () => {
      total.value = el!.duration || current.value?.duration || 0;
    });
    el.addEventListener('play', () => {
      playing.value = true;
      failed.value = false;
    });
    el.addEventListener('pause', () => {
      playing.value = false;
      rememberPosition();
    });
    el.addEventListener('waiting', () => (waiting.value = true));
    el.addEventListener('playing', () => (waiting.value = false));
    el.addEventListener('error', () => {
      failed.value = true;
      playing.value = false;
      waiting.value = false;
    });
    el.addEventListener('ended', () => {
      rememberPosition();
      next();
    });

    return el;
  };

  /**
   * Lock-screen, headphone and car controls. Cheap to add, and it is the
   * difference between a web page and something people listen to while driving.
   */
  const publishMediaSession = () => {
    if (!import.meta.client || !('mediaSession' in navigator) || !current.value) return;
    const track = current.value;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.leader,
      album: track.series || 'Redeemer Pampa',
    });
    navigator.mediaSession.setActionHandler('play', () => resume());
    navigator.mediaSession.setActionHandler('pause', () => pause());
    navigator.mediaSession.setActionHandler('nexttrack', () => next());
    navigator.mediaSession.setActionHandler('previoustrack', () => previous());
    navigator.mediaSession.setActionHandler('seekbackward', () => nudge(-15));
    navigator.mediaSession.setActionHandler('seekforward', () => nudge(30));
  };

  function play(track: Track, upNext: Track[] = []) {
    const element = audio();
    if (!element || !track.audioUrl) return;

    if (current.value?.id === track.id) {
      toggle();
      return;
    }

    current.value = track;
    queue.value = upNext;
    failed.value = false;
    elapsed.value = 0;
    total.value = track.duration || 0;

    element.src = track.audioUrl;
    const resumeAt = resumeStore()[track.id];
    if (resumeAt) element.currentTime = resumeAt;

    element.play().catch(() => (failed.value = true));
    publishMediaSession();
  }

  function resume() {
    audio()?.play().catch(() => (failed.value = true));
  }
  function pause() {
    audio()?.pause();
  }
  function toggle() {
    if (!current.value) return;
    playing.value ? pause() : resume();
  }
  function seek(seconds: number) {
    const element = audio();
    if (element) element.currentTime = seconds;
    elapsed.value = seconds;
  }
  function nudge(by: number) {
    seek(Math.max(0, Math.min((total.value || 0) || Infinity, elapsed.value + by)));
  }

  const indexInQueue = () =>
    queue.value.findIndex((t) => t.id === current.value?.id);

  function next() {
    const at = indexInQueue();
    const upcoming = at >= 0 ? queue.value[at + 1] : undefined;
    if (upcoming) play(upcoming, queue.value);
    else stop();
  }
  function previous() {
    // Restart the current sermon first, as media players conventionally do.
    if (elapsed.value > 5) return seek(0);
    const at = indexInQueue();
    const before = at > 0 ? queue.value[at - 1] : undefined;
    if (before) play(before, queue.value);
    else seek(0);
  }

  function stop() {
    pause();
    playing.value = false;
  }

  function close() {
    rememberPosition();
    const element = audio();
    if (element) {
      element.pause();
      element.removeAttribute('src');
      element.load();
    }
    current.value = null;
    queue.value = [];
    playing.value = false;
    elapsed.value = 0;
    total.value = 0;
  }

  return {
    current, queue, playing, waiting, elapsed, total, failed,
    play, toggle, resume, pause, seek, nudge, next, previous, close,
  };
});
