# Editor core API

Core APIs for project management, assets, timeline operations, and commands.

## Project
- **createProject(options):** Initialize a new project.
- **loadProject(path):** Load from disk or remote.
- **saveProject(path):** Persist with versioned metadata.

## Assets
- **importAsset(file, options):** Normalize and register.
- **getAssets(query):** Retrieve by type/tags.
- **removeAsset(id):** Safe cleanup with references.

## Timeline
- **addTrack(type):** Audio/video/subtitle tracks.
- **addClip(trackId, assetId, range):** Place segments.
- **setKeyframe(clipId, param, time, value):** Animate properties.
- **removeClip(clipId):** Non-destructive remove.

## Commands
- **undo():** Revert last operation.
- **redo():** Reapply reverted operation.
- **transaction(callback):** Group atomic changes.

## Events
- **on(event, handler):** Subscribe to project/timeline events.
- **off(event, handler):** Unsubscribe.

## Types
- Strong TypeScript definitions for IDs, ranges, assets, tracks, clips, keyframes.
