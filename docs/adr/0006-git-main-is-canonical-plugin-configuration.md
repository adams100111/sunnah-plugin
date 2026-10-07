# Keep plugin source and policy state canonical in Git

Source Registry, Source Packs, and policy configuration merged into the repository's main branch are the canonical configuration state for Sunnah Plugin. Human tooling such as the future Source Studio is an editor and proposal surface over that state, with pull requests as the default publication path. This avoids creating a second mutable authority database inside the plugin and preserves reviewable history, CI validation, rollback, and compatibility with the future Sunnah Engine boundary.
