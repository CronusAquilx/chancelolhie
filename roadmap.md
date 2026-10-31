# Birchbeat import roadmap

## Console Mode
- [ ] Finish Sony media, actual games/apps store and library, first-launch layout choice, profile/background settings and verification.
- [ ] Shared navigation, per-user library, Sony home/store/library/settings/profile.
- [ ] Xbox Series and Xbox Classic screens and guides.
- [ ] Settings picker, Home entry, documentation and verification.

- [x] Import source and dependencies into the existing TanStack project.
- [x] Enable Lovable Cloud, migrate schema and wire authentication.
- [x] Reconcile configuration and verify preview launches.
- [ ] Import previous user records — no source data export supplied.

## Game smoothness
- [x] Apply GTA's supported performance profile with a native-quality option.
- [x] Use the standalone player by default for every Cloud game and lighten inline playback.
- [x] Remove proxy connection-selection delays and test profile/connection behavior.
- [x] Verify public relay isolation and manifest loading; eight regression tests pass.
- [ ] Verify signed-in launches and real FPS gains — requires the user to sign in to the preview and play on real GPU hardware.
