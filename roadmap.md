# Birchbeat import roadmap

## Console Mode
- [ ] Fix the published proxy startup failure and verify production-safe loading.
- [ ] Ask layout, device and content every new visit; always show matching login/account confirmation.
- [x] Finish Sony media, actual games/apps store and library, first-launch layout choice, profile/background settings and verification.
- [x] Shared navigation, per-user library, Sony home/store/library/settings/profile.
- [ ] Xbox Series and Xbox Classic screens and guides.
- [x] Sony settings picker, Home entry, documentation and verification.
- [ ] Real controller hardware and individual provider gameplay validation — needs controller/GPU playtesting; the OvO provider stayed on its loading screen during the browser check.

- [x] Import source and dependencies into the existing TanStack project.
- [x] Enable Lovable Cloud, migrate schema and wire authentication.
- [x] Reconcile configuration and verify preview launches.
- [ ] Import previous user records — no source data export supplied.

## Game smoothness
- [x] Apply GTA's supported performance profile with a native-quality option.
- [x] Use the standalone player by default for every Cloud game and lighten inline playback.
- [x] Remove proxy connection-selection delays and test profile/connection behavior.
- [x] Verify public relay isolation and manifest loading; eight regression tests pass.
- [ ] Verify signed-in launches and real FPS gains — signed-in cloud launch verified; FPS measurement requires playtesting on real GPU hardware.
