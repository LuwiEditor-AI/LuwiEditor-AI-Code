# Editor render API

Rendering interfaces for preview and export, with caching and deterministic outputs.

## Preview
- **createPreview(playerOptions):** Initialize player.
- **seek(time):** Move playback head with low-latency.
- **getFrame(time):** Retrieve a frame buffer.
- **onStats(cb):** Performance metrics (fps, cache hits).

## Export
- **renderProject(settings):** Full export with progress callbacks.
- **abortRender(id):** Cancel ongoing job gracefully.
- **getRenderLogs(id):** Retrieve structured logs.

## Settings
- **format:** MP4/WebM/MOV/WAV.
- **resolution:** 720p/1080p/4K.
- **bitrate/profile:** Presets for platforms.
- **audio:** Sample rate, channels, loudness target.

## Caching
- Transparent frame caching with invalidation on edits.
