# Retrospective: steam-free-games

> Written: 2026-10-16 (after verify passed)
> Commit range: `c712b9e6bcbf9dcb4924d44a95d1f7fb448630ee..1cd50f2`
> Worktree: `C:\documents\software\freegames\.worktrees\steam-free-games`

---

## 0. Evidence

- **Commit range**: `c712b9e..1cd50f2` (14 commits)
- **Diff size**: +8,079 / -0 lines across 60 files (includes binary icons and lockfiles; git numstat reports text changes)
- **Tasks done**: 8/8 OpenSpec task checkboxes; Task 4.2 includes a note that interactive install/runtime acceptance remains outstanding.
- **Active hours**: approximately 2 hours of recorded implementation/review activity; estimate from session timestamps, not a time tracker.
- **Subagent dispatches**: 14 (implementation and independent review/fix rounds across tasks; includes initial and retry Task 5 work)
- **New external dependencies**: Tauri opener plugin (`@tauri-apps/plugin-opener` / `tauri-plugin-opener`, 2.x, MIT); existing scaffold dependencies include Tauri 2 / React / Vitest. Cargo.lock committed after successful native build.
- **Bugs encountered post-merge**: 1 test defect during native artifact re-verification before merge — the absent-installer test used the application directory, so it passed incorrectly once the built installer existed; isolated its working directory in `1cd50f2`.
- **OpenSpec validate state at archive**: pass (`openspec validate steam-free-games` reported valid before retrospective/archive; verify artifact records PASS WITH WARNINGS).
- **Test coverage signal**: Vitest 5 files / 36 tests; Rust lib/main/doc test targets passed with zero tests defined; Windows NSIS artifact check passed (1,453,895 bytes).

Commit chain (chronological order):

```
c712b9e initial design document
64f5662 change: steam-free-games
da ff656 scaffold Steam Free Games desktop app
4529073 fix Steam Free Games page metadata
580402c implement Steam free-to-keep offer acquisition
06465d2 validate Steam offer original prices
d2e16c1 present Steam offers and retrieval states
e3d76c0 mark Steam offer UI tasks complete
783fba0 validate and open Steam store links
9daadd2 accept multi-segment Steam app paths
4e410d2 mark Steam link task complete
bf78d3b document Windows packaging and verification
324836b clarify Windows package verification
6e8e902 record completed application foundation
cd46f64 build: verify native Windows installer
1cd50f2 test: isolate missing installer smoke check
```

## 1. Wins

- The work was built in an isolated worktree and split into reviewed increments; the OpenSpec plan and normalized offer contract allowed acquisition, presentation, link policy, and packaging to be handled separately (`daff656`, `580402c`, `d2e16c1`, `783fba0`, `bf78d3b`).
- Deterministic fixture tests cover the offer qualification and UI states; Tauri opener handling is protected by URL policy tests (`steamOffers.test.ts`, `App.test.tsx`, `steamStoreLink.test.ts`).
- Source uncertainty was documented rather than presented as Steam-guaranteed entitlement: the adapter uses FreeToKeep.GG classification and Steam metadata checks, and explicitly avoids SteamDB scraping (`steam-free-games/README.md`, `design.md`).
- After Rust/MSVC became available, the Windows NSIS bundle was successfully generated and checked by an artifact smoke command; the report and `verify.md` state precisely what that check establishes (`cd46f64`).
- Reviews caught both overly permissive price parsing and an overly restrictive Steam app path validator; regression tests were added and scoped re-reviews confirmed those fixes (`06465d2`, `9daadd2`).

## 2. Misses

- 🟡 [painful | evidence: `openspec/changes/steam-free-games/verify.md`; `steam-free-games/README.md`] Interactive install, double-click launch, runtime offer behavior, and actual standard-browser link opening remain unverified. Package generation and frontend tests cannot substitute for a manual install/runtime acceptance run.
- 🟡 [painful | evidence: `steam-free-games/src-tauri/src/lib.rs`; `cargo test` output in `verify.md`] Rust test targets currently define zero tests; native behavioral confidence comes from successful compilation/package generation, not Rust unit coverage.
- 📌 [nit | evidence: `1cd50f2`, `tests/windows-installer-smoke.test.ts`] The first run after producing the installer exposed an environment-dependent test: an “artifact absent” test ran in the project folder and became invalid once the artifact existed. Isolating the cwd fixed it; future artifact tests should isolate filesystem state.

## 3. Plan deviations

| Plan task | What changed | Why |
|-----------|--------------|-----|
| 2 | Used FreeToKeep.GG API classification as evidence, not an official Steam entitlement signal. | SteamDB disallows scraping and Steam appdetails cannot identify promotion type; third-party limitations are documented, and ambiguous records are filtered. |
| 4 | Added a follow-up fix to accept canonical multi-segment Steam app paths. | Independent review found the original validator rejected valid app path forms; regression-tested in `9daadd2`. |
| 5 / 4.2 | Initially documented native package checks as blocked; after toolchain availability changed, re-ran Rust tests and produced the NSIS installer. Interactive installer/runtime verification remains open and is explicitly noted. | Rust/MSVC became available after the initial Task 5 attempt; successful package evidence is captured in `cd46f64` and `verify.md`. |

## 4. Skill / workflow compliance

| Skill | Used |
|--------------------------------------------------|------|
| superpowers:brainstorming | ✓ (existing brainstorm artifact informed this work) |
| superpowers:writing-plans | ✓ (existing plan guided implementation) |
| superpowers:using-git-worktrees | ✓ (worktree verified/used) |
| superpowers:subagent-driven-development | ✓ |
| (transitive) superpowers:test-driven-development | ✓ |
| (transitive) superpowers:requesting-code-review | ✓ |
| superpowers:finishing-a-development-branch | ✓ |

### Deliberately Skipped Skills

None.

## 5. Surprises

- Rust/MSVC prerequisites changed from unavailable to available during the lifecycle; an early report of native build blockage became stale, so the package was retried and verified later (`cd46f64`).
- The native artifact changed test assumptions: once the expected installer existed, a test intended to prove the missing case no longer ran in a missing-artifact environment; the test required an isolated temporary working directory (`1cd50f2`).
- Steam’s public appdetails response enriches metadata but does not itself establish Free-to-Keep classification; the design had to rely on an explicitly classified aggregator feed and document the residual accuracy risk (`design.md`, `steam-free-games/README.md`).

## 6. Promote candidates → long-term learning

- [ ] 🟡 **Re-run previously blocked native checks when tool availability changes** → **Promote to one-off**
  > **Why**: Rust and MSVC were unavailable at first, but later became available and allowed the Windows bundle to be built (`cd46f64`).
  > **How to apply**: When a blocker is environment-based, record the exact missing tool and retry the blocked command before finalizing if the environment changes.

- [ ] 📌 **Isolate artifact tests from generated build outputs** → **Promote to project testing guidance**
  > **Why**: The installer-existence test became invalid once the real artifact was generated; fixing it required a fresh temporary cwd (`1cd50f2`).
  > **How to apply**: Tests for expected-absent files must run in isolated temporary paths, while a separate smoke test checks real build output.
