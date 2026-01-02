# Whole Knowledge Architecture

Claude Code skills for editing and managing the Whole bilingual knowledge architecture documentation.

## Project Status: COMPLETE

```
████████████████████████████████ 100% (50/50 functions) ✅
```

**🎉 PROJECT COMPLETE!** All 10 domains regrouped (2025-12-27)

**Completed Domains**: FOUNDATIONS, DYNAMICS, OPERATIONS, CREATION, NAVIGATION, INTEGRATION, VALIDATION, AMPLIFICATION, TRANSCENDENCE, META

**Project Duration**: 12 days (2025-12-16 to 2025-12-27)

## Quick Start

1. Clone this repo
2. Open with Claude Code: `cd Whole && claude`
3. Check progress: `/status`
4. Start working: `/regroup` (auto-detects next function)

## Skills

| Skill | Version | Purpose |
|-------|---------|---------|
| whole-editor v2.1.0 | Main editing operations |
| whole-analyzer | v2.0.0 | Pre-edit analysis & duplicate detection |
| whole-reviewer v2.1.0 | Post-edit validation |
| whole-regrouper | v5.0.0 | Concept reorganization + intelligent reconciliation |

**whole-regrouper v5.0.0 NEW FEATURES** (2025-12-29):
- **Intelligent Analysis**: Analyzes both Tổng Quan and Content groupings
- **Strategy Options**: Choose [A/B/C/H/S] based on 4-criterion evaluation
- **Reconciliation Command**: `/reconcile [number]` for smart sync (NEW)
- **Progressive Disclosure**: ~60% token savings per activation

## Commands (9 Total)

| Command | Skill/System | Description |
|---------|--------------|-------------|
| `/status` | Built-in | Show current progress status |
| `/next` | Built-in | Auto-detect next function to work on |
| `/analyze [section]` | whole-analyzer | Analyze section for issues |
| `/edit [section]` | whole-editor | Start editing session |
| `/expand [domain] [func] [topic]` | whole-editor | Add new concepts |
| `/regroup [number]` | whole-regrouper | Full concept reorganization (auto-detects if no number) |
| `/reconcile [number]` | whole-regrouper | Intelligent Tổng Quan ↔ Content sync (NEW - v5.0.0) |
| `/validate [section]` | whole-reviewer | Validate changes |
| `/report` | Built-in | Generate comprehensive progress report |

## Core Philosophy

- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **4-Point Structure**: Definition, Context, Application, Integration (minimum)
- **Cross-Reference Integrity**: Bidirectional links always

## Document Structure

- **10 Domains** × **5 Functions** = **50 sections**
- 4-point descriptions for each concept
- Cross-references across domains

### Domains

1. FOUNDATIONS - Epistemological & ontological basics
2. DYNAMICS - Systems thinking & emergence
3. OPERATIONS - Process & workflow management
4. CREATION - Innovation & design thinking
5. NAVIGATION - Decision making & pathfinding
6. INTEGRATION - Synthesis & connection
7. VALIDATION - Testing & verification
8. AMPLIFICATION - Scaling & growth
9. TRANSCENDENCE - Meta-cognition & evolution
10. META - Self-reference & documentation

## Project Structure

```
Whole/
├── Whole.md                          # Main knowledge base (33,056 lines, 1.9MB)
├── .whole-progress.json              # Progress tracker (50/50 complete ✅)
├── README.md                         # This file
├── .gitignore                        # Git exclusions
│
├── .claude/                          # Claude Code configuration
│   ├── CLAUDE.md                     # Project instructions (CRITICAL)
│   ├── README.md                     # .claude directory guide
│   ├── settings.json                 # Claude Code settings
│   ├── settings.local.json           # Local overrides (git-ignored)
│   ├── .eslintrc.js                  # JavaScript linting
│   │
│   ├── skills/                       # 4 specialized skills + shared lib
│   │   ├── shared/                   # Shared utilities (v1.0.0 - DRY refactoring)
│   │   │   ├── README.md             # Comprehensive utilities documentation
│   │   │   ├── index.js              # Central export hub
│   │   │   ├── config/
│   │   │   │   └── constants.js      # 50+ configuration constants
│   │   │   ├── types/
│   │   │   │   └── validation-result.js
│   │   │   └── utils/
│   │   │       ├── cli-helpers.js    # CLI initialization (70% code reduction)
│   │   │       ├── display.js + .test.js
│   │   │       ├── security.js + .test.js
│   │   │       └── whole-md-parser.js + .test.js
│   │   │
│   │   ├── whole-editor v2.1.0)
│   │   │   ├── SKILL.md
│   │   │   ├── references/           # 4 guidance docs
│   │   │   │   ├── editing-protocol.md
│   │   │   │   ├── duplicate-resolution.md
│   │   │   │   ├── bilingual-rules.md
│   │   │   │   └── structure-validation.md
│   │   │   └── scripts/              # 3 validation scripts
│   │   │       ├── bilingual-check.js
│   │   │       ├── check-cross-refs.js
│   │   │       └── validate-structure.js
│   │   │
│   │   ├── whole-analyzer/           # Pre-edit analysis (v2.0.0)
│   │   │   └── SKILL.md
│   │   │
│   │   ├── whole-reviewer v2.1.0)
│   │   │   └── SKILL.md
│   │   │
│   │   └── whole-regrouper/          # Intelligent regrouping (v5.0.0)
│   │       ├── SKILL.md
│   │       ├── references/           # 5 detailed guides
│   │       │   ├── grouping-principles.md
│   │       │   ├── workflow-steps.md
│   │       │   ├── naming-guidelines.md
│   │       │   ├── quality-checklist.md
│   │       │   └── robust-operations.md
│   │       ├── plans/templates/
│   │       │   └── regroup-template.md
│   │       └── scripts/
│   │           └── validate-regroup.js
│   │
│   ├── commands/                     # 9 slash commands
│   │   ├── analyze.md                # /analyze [section]
│   │   ├── edit.md                   # /edit [section]
│   │   ├── expand.md                 # /expand [domain] [func] [topic]
│   │   ├── next.md                   # /next (auto-detect)
│   │   ├── regroup.md                # /regroup [number]
│   │   ├── reconcile.md              # /reconcile [number] (NEW v5.0)
│   │   ├── report.md                 # /report
│   │   ├── status.md                 # /status
│   │   └── validate.md               # /validate [section]
│   │
│   ├── hooks/                        # Automation & feedback (4 hooks)
│   │   ├── README.md                 # Hooks documentation
│   │   ├── session-init.cjs          # Session startup (unified v2.0)
│   │   ├── progress-indicator.cjs    # PostToolUse feedback
│   │   ├── validate-edit.cjs         # Edit validation
│   │   ├── dev-rules-reminder.cjs    # Development rules display
│   │   ├── docs/                     # Hook documentation
│   │   └── lib/                      # Hook utilities
│   │
│   ├── agents/                       # 3 specialized agents
│   │   ├── whole-content-validator.md
│   │   ├── whole-cross-reference.md
│   │   └── whole-translator.md
│   │
│   └── workflows/                    # Process guides (4 + hub)
│       ├── README.md                 # Workflow navigation hub (CRITICAL)
│       ├── primary-workflow.md       # Main operational workflow
│       ├── editing-workflow.md       # Content editing process
│       ├── quality-assurance.md      # QA & validation procedures
│       └── development-rules.md      # Core principles & standards
│
├── docs/                             # Project documentation (9 files)
│   ├── project-overview.md           # Quick overview
│   ├── project-overview-pdr.md       # Extended overview (647 lines)
│   ├── skill-reference.md            # Comprehensive skill docs
│   ├── system-architecture.md        # Technical architecture (27KB)
│   ├── project-roadmap.md            # Development roadmap
│   ├── codebase-summary.md           # Code structure summary
│   ├── workflow-guide.md             # Workflow instructions
│   ├── troubleshooting.md            # Common issues & fixes
│   └── IMPROVEMENTS-2025-12-16.md    # Historical improvements
│
└── plans/                            # Project plans & reports
    ├── improvement-260101-sub-domain-coherence-plan.md
    │
    ├── 251229-1232-codebase-review/  # First comprehensive review
    │   ├── plan.md
    │   └── phase-*.md (5 phases)
    │
    ├── 260101-1613-skill-structure-refactoring/
    │   └── refactoring-plan.md
    │
    ├── 260101-1710-codebase-review/  # Second comprehensive review
    │   ├── plan.md
    │   └── phase-*.md (4 phases)
    │
    ├── templates/
    │   └── regroup-template.md
    │
    └── reports/                      # Analysis & review reports (19 files)
        ├── codebase-review-260102-1517-final-summary.md
        ├── bottom-up-analysis-*.md (2 files)
        ├── code-reviewer-*.md (6 files)
        ├── researcher-*.md (4 files)
        └── [other specialized reports]
```

## Workflow Example

```
User: /status
Claude: Progress: 37/50 (74%) | Next: CF38 | Domain: AMPLIFICATION

User: /regroup
Claude: [Auto-detects CF38: AMPLIFICATION > RESOURCE OPTIMIZATION]
        [Activates whole-regrouper]
        [Analyzes 45 concepts]
        [Proposes 8 thematic groups]

User: Approved

Claude: [Applies regrouping]
        [Validates changes]
        [Updates progress tracker]
        Summary: 45 concepts -> 8 groups, all content preserved
```

## Working with Whole.md

**IMPORTANT**: Whole.md is a large file (>1MB). Always:

1. Use `grep` to find relevant sections first
2. Read with `offset/limit` parameters
3. Never load the entire file at once

## Final Statistics

| Metric | Value |
|--------|-------|
| Functions completed | 50/50 (100%) |
| Domains completed | 10/10 |
| Total concepts processed | 2,072 |
| Total groups created | 371 |
| Average concepts/function | 41.1 |
| Average groups/function | 7.5 |
| Sessions completed | 31 |
| Total time | 491 minutes (~8.2 hours) |
| Average time/function | 10.4 minutes |
| Project duration | Dec 16-27, 2025 (12 days) |

## License

Private project for Whole Knowledge Architecture development.
