export function secondsToTimecode(sec: number, fps: number): string {
  const totalFrames = Math.round(sec * fps);
  const hours = Math.floor(totalFrames / (fps * 3600));
  const minutes = Math.floor((totalFrames % (fps * 3600)) / (fps * 60));
  const seconds = Math.floor((totalFrames % (fps * 60)) / fps);
  const frames = totalFrames % fps;

  const pad = (n: number, l = 2) => n.toString().padStart(l, '0');
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

export function timecodeToSeconds(tc: string, fps: number): number {
  const [h, m, s, f] = tc.split(':').map(Number);
  if ([h, m, s, f].some(Number.isNaN)) throw new Error('Invalid timecode');
  const totalFrames = h * fps * 3600 + m * fps * 60 + s * fps + f;
  return totalFrames / fps;
}
