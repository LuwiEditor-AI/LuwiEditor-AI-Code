# Editor AI API

AI-driven endpoints for captions, TTS, music/effects generation, and script assistance.

## Captions
- **generateCaptions(track, lang, options):** SRT/VTT output.
- **validateCaptions(file):** Structural and timing checks.

## TTS
- **synthesize(text, lang, voice, params):** WAV/MP3 output.
- **estimateDuration(text, params):** Time estimation.

## Generation
- **generateMusic(context, style):** Background tracks.
- **generateEffects(cues, intensity):** Sound effects aligned to timeline.
- **generateTransitions(scenes, style):** Transition configs.

## Script
- **assistScript(params):** Outline and narration suggestions.

## Policies
- Built-in filters for unsafe or disallowed prompts; clear refusals.
