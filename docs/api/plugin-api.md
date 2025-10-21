# Plugin API

Interfaces and lifecycle to extend the editor with custom functionality.

## Registration
- **registerPlugin(plugin):** Name, version, capabilities.
- **enablePlugin(id):** Activate with permissions.
- **disablePlugin(id):** Deactivate safely.

## Capabilities
- **processors:** Import/transform/render hooks.
- **ui:** Panels, toolbar items, context menus.
- **commands:** Actions accessible via shortcuts.

## Hooks
- **onImport(asset):** Analyze and tag.
- **beforeRender(project):** Adjust settings or validate.
- **afterRender(result):** Post-process or publish.

## Sandboxing
- Strict isolation; limited APIs; audit logging for plugin actions.
