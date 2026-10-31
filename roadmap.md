# Birchbeat import roadmap

- [ ] Copy source code from /tmp/birchbeat/birchbeat-main into project (exclude .git, node_modules, .env, lockfiles)
- [ ] Merge package.json dependencies (keep target TanStack versions)
- [ ] Enable Lovable Cloud
- [ ] Convert drizzle migrations to Supabase migration (14 tables: profiles, user_roles, models, reasoning_levels, threads, messages, memories, tools, usage_events, provider_keys, watchlist, watch_history, playlists, game_saves)
- [ ] Wire auth (@lovable.dev/cloud-auth-js) to this project's Cloud backend
- [ ] Reconcile config files (vite.config, tsconfig, styles, index.html equivalent)
- [ ] Verify build + preview runs
- [ ] Records/user data: none exported — mark pending
