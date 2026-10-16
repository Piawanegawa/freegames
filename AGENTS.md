---

<!-- The openspec-superpowers-opencode_instructions block below is generated from this package template. -->
<!-- openspec-superpowers-opencode_instructions -->

# AGENTS.md — AI Instructions

This project uses openspec-superpowers-opencode (the `superpowers-bridge-opencode` schema) to drive development. All feature changes follow the artifact lifecycle.

## Development Rules

- Create the artifacts and code for each change inside its worktree (`.worktrees/<name>/`) first.
- Keep the `main` branch clean and limited to completed, merged work.
- Use TDD (RED → GREEN → REFACTOR) during implementation.
- **Use the `/opsx-*` commands for all OpenSpec workflow operations** (for example, `/opsx-propose`, `/opsx-apply`, and `/opsx-ff`); do not simulate them manually.
- **Do not start OpenSpec workflow commands automatically**: commands such as `/opsx-propose`, `/opsx-ff`, `/opsx-apply`, and `/opsx-finish` require an explicit user invocation. Once the user invokes a workflow, its internal steps are authorized.

## Git Collaboration Rules

- If a rebase conflicts in a lockfile (an automatically resolved artifact such as Cargo.lock, go.sum, or package-lock), do not merge the lockfile manually; regenerate it (for example, with `cargo generate-lockfile`, `npm install`, or `go mod tidy`). Regeneration may introduce unexpected version drift, so compile and verify before `rebase --continue`.

## Superpowers Skills

Read Superpowers skill files from the installed skill directory. Follow the complete installed skill instructions as the source of truth.

### Superpowers Skill Root

```
{{SUPERPOWERS_BASE_PATH}}
```

### Superpowers v7 Workflow

Before applying a change, verify that the installed Superpowers package is major version 7. Read the complete `subagent-driven-development/SKILL.md` and its implementer, task-reviewer, and re-review prompts, along with the TDD and code-review instructions and scripts required by that skill.

Use OpenCode's native subagent delegation tool with the `general` subagent for implementation and review. Let OpenCode provide the tool name and argument schema; do not use legacy agent-call APIs. Dispatch a fresh implementer for each task, a separate reviewer for each task, and a fresh reviewer for the whole branch. Include the absolute worktree path and task context in every delegated prompt.

Follow the installed v7 task brief, workspace ledger, review-package, TDD, and re-review procedures. Do not mark an OpenSpec task complete until its implementation is tested and reviewed. If native delegation is unavailable, report the exact error and follow the documented fallback only after the user chooses it.

## Project Documentation

These documents are the main entry points for understanding project context. Items marked `*` are recommended essentials.

## Project Documentation

These documents are the main entry points for understanding project context. Items marked `*` are recommended essentials.

### Project Overview

- `README.md` — project purpose, installation, and quick start *
- `docs/QUICKSTART.md` — user quick-start guide
- `docs/features.md` — feature list and version differences

### Architecture and Design

- `docs/architecture/` — overall architecture (binary layout, module relationships, runtime paths) *
- `docs/decisions/` — decision records (ADR architecture decisions / DDR design decisions / IDR implementation decisions)
- `docs/designs/` — feature designs and comparisons

### Development and Testing

- `docs/development.md` — development environment, build commands, and coding style *
- `docs/how-it-works.md` — high-level explanation of how it works
- `docs/testing.md` — testing conventions and how to run tests *
- `docs/cli-commands.md` — command-line reference
- `docs/test-runs/` — local test run records (not tracked by Git)

### Requirements and Implementation

- `docs/requirements.md` — product requirements and roadmap *
- `docs/tasks.md` — implementation task list and current progress *

### Lessons Learned

- `docs/learnings/` — pitfalls and remedies that need to be repeated
- `docs/known-issues.md` — known issues and root causes

### Working Drafts

- `docs/local/` — personal local workspace (excluded by `.gitignore`, not version-controlled)
  - `inbox/` — raw material to analyze and unsorted drafts
  - `notes/` — personal notes and informal records

<!-- openspec-superpowers-opencode_instructions -->
<!-- The openspec-superpowers-opencode_instructions block above is generated from this package template. -->
