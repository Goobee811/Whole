# Codebase Summary - Whole Knowledge Architecture

## Project Overview

**Whole** is a comprehensive bilingual (Vietnamese-English) knowledge architecture documentation system. The codebase is organized around the concept of structured knowledge management with automated tools for analysis, editing, and validation.

**Status**: 100% Complete (50/50 functions across 10 domains)
**Last Updated**: 2025-12-29
**Total Files**: 66 files across multiple categories

---

## Directory Structure

```
Whole/
├── Whole.md                           # Main knowledge base (>1MB, ~32,939 lines)
├── .whole-progress.json               # Progress tracking (50/50 complete)
├── README.md                          # Project overview and quick start
│
├── .claude/                           # Claude Code integration & automation
│   ├── CLAUDE.md                      # Core project instructions
│   ├── README.md                      # Claude Code configuration docs
│   ├── settings.json                  # Claude Code environment settings
│   │
│   ├── skills/                        # 4 specialized skills for knowledge management
│   │   ├── whole-editor/              # Content editing skill (v2.0.0)
│   │   │   ├── SKILL.md               # Skill definition
│   │   │   ├── references/
│   │   │   │   ├── editing-protocol.md
│   │   │   │   ├── duplicate-resolution.md
│   │   │   │   ├── bilingual-rules.md
│   │   │   │   └── structure-validation.md
│   │   │   └── scripts/
│   │   │       ├── bilingual-check.js
│   │   │       ├── check-cross-refs.js
│   │   │       └── validate-structure.js
│   │   │
│   │   ├── whole-analyzer/            # Pre-edit analysis skill (v2.0.0)
│   │   │   └── SKILL.md
│   │   │
│   │   ├── whole-reviewer/            # Post-edit validation skill (v2.0.0)
│   │   │   └── SKILL.md
│   │   │
│   │   └── whole-regrouper/           # Concept reorganization skill (v5.0.0)
│   │       ├── SKILL.md               # Main skill with intelligent analysis
│   │       ├── references/
│   │       │   ├── grouping-principles.md
│   │       │   ├── workflow-steps.md
│   │       │   ├── naming-guidelines.md
│   │       │   ├── quality-checklist.md
│   │       │   └── robust-operations.md
│   │       ├── plans/
│   │       │   └── templates/
│   │       │       └── regroup-template.md
│   │       └── scripts/
│   │           └── validate-regroup.js
│   │
│   ├── commands/                      # 9 slash commands
│   │   ├── analyze.md                 # /analyze - Pre-edit analysis
│   │   ├── edit.md                    # /edit - Start editing session
│   │   ├── expand.md                  # /expand - Add new concepts
│   │   ├── next.md                    # /next - Auto-detect next task
│   │   ├── regroup.md                 # /regroup - Reorganize concepts
│   │   ├── reconcile.md               # /reconcile - Sync Tổng Quan ↔ Content
│   │   ├── status.md                  # /status - Show progress
│   │   ├── report.md                  # /report - Generate progress report
│   │   └── validate.md                # /validate - Validate changes
│   │
│   ├── hooks/                         # Automation hooks (4 active)
│   │   ├── session-init.cjs           # Display progress on startup
│   │   ├── dev-rules-reminder.cjs     # Context injection
│   │   ├── progress-indicator.cjs     # PostToolUse feedback
│   │   ├── validate-edit.cjs          # Pre-commit validation
│   │   ├── lib/
│   │   │   └── ck-config-utils.cjs    # Utility functions
│   │   └── docs/
│   │       └── README.md              # Hook documentation
│   │
│   ├── agents/                        # 3 specialized agents
│   │   ├── whole-content-validator.md # Validates 4-point structure, bilingual integrity
│   │   ├── whole-translator.md        # Vietnamese-English translation assistance
│   │   └── whole-cross-reference.md   # Manages bidirectional links
│   │
│   └── workflows/                     # 4 process guides
│       ├── primary-workflow.md        # Main content workflow
│       ├── editing-workflow.md        # Step-by-step editing process
│       ├── development-rules.md       # Code standards and rules
│       └── quality-assurance.md       # QA procedures
│
├── docs/                              # Public documentation
│   ├── project-overview.md            # Project description and structure
│   ├── project-overview-pdr.md        # PDR and requirements (generated)
│   ├── codebase-summary.md            # This file - technical structure
│   ├── skill-reference.md             # Skill documentation (updated v5.0.0)
│   ├── workflow-guide.md              # User-facing workflow guide
│   ├── system-architecture.md         # Architecture and components
│   ├── project-roadmap.md             # Future enhancements
│   ├── troubleshooting.md             # Common issues and solutions
│   └── IMPROVEMENTS-2025-12-16.md     # Historical improvements log
│
├── plans/                             # Planning and reports
│   ├── templates/
│   │   └── regroup-template.md        # Standardized regrouping plan template
│   └── reports/
│       ├── cf30-split-recommendation-251228-1607.md
│       └── subdomain-alignment-analysis-251228-1513.md
│
├── [Root Scripts] (Python automation)
│   ├── verify_all_50.py               # Verify all 50 functions
│   ├── add_tong_quan_8.py             # Add summary sections
│   ├── add_nav_tong_quan.py           # Add navigation summaries
│   ├── fix_final_8.py                 # Fix formatting issues
│   ├── fix_remaining_4.py             # Fix remaining issues
│   ├── update_validation.py           # Update validation rules
│   └── verification_report.txt        # Output from verification
│
├── .gitignore                         # Git ignore rules
├── PROMPT-TEMPLATE-REGROUP.md         # Regroup command template
└── repomix-output.xml                 # Packed codebase representation
```

---

## Core Components

### 1. Knowledge Base (`Whole.md`)

**Size**: ~1MB, 32,939 lines

**Structure**:
- **10 Domains** (epistemological to meta-cognitive)
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

- **50 Functions** (5 per domain, with unique names for each)
  - Each function contains multiple concepts organized into thematic groups

- **2,072 Concepts** organized into **371 thematic groups**
  - Minimum 4-point structure: Definition, Context, Application, Integration
  - Bilingual format (Vietnamese primary, English secondary)
  - Cross-references linking concepts across domains/functions

**Bilingual Format Example**:
```
#### **[num]. Concept Name - Tên Khái Niệm Tiếng Việt**

[Description with bilingual content]

- **Key Point 1**: [Vietnamese explanation]
- **Key Point 2**: [Vietnamese explanation]
- **Key Point 3**: [Vietnamese explanation]
- **Key Point 4**: [Vietnamese explanation]

→ **Liên kết**: [Cross-references to related concepts]
```

### 2. Progress Tracking (`.whole-progress.json`)

**Purpose**: Real-time tracking of completion status

**Contents**:
- `version`: Current schema version
- `totalFunctions`: 50
- `completedFunctions`: Array of all completed function IDs (1-1 through 10-5)
- `currentFunction`: Currently active function (null if all complete)
- `nextSuggested`: Auto-suggested next function
- `lastUpdated`: Timestamp of last update
- `lastCompletedFunction`: Details of most recent completion
- `sessions`: Array of work session history with date, functions worked, concepts added, duration

**Metrics Tracked**:
- Completion percentage (100%)
- Average concepts per function (41.1)
- Average groups per function (7.5)
- Session count and duration
- Project timeline (12 days: 2025-12-16 to 2025-12-27)

### 3. Skills System

Four specialized Claude Code skills provide automated knowledge management:

#### **whole-editor** (v2.0.0)
- **Purpose**: Primary editing skill for content modification
- **Use Cases**: Add/modify concepts, expand descriptions, update cross-references
- **Key Rules**: Never delete without approval, maintain 4-point structure, preserve bilingual format
- **Activation**: `/edit [section]`
- **References**: 4 markdown guides covering editing protocol, duplicate resolution, bilingual rules, structure validation

#### **whole-analyzer** (v2.0.0)
- **Purpose**: Pre-editing analysis and duplicate detection
- **Features**: Analyzes section completeness, detects duplicates, recommends improvements
- **Output**: Comprehensive analysis reports with findings and recommendations
- **Activation**: `/analyze [section]`

#### **whole-reviewer** (v2.0.0)
- **Purpose**: Post-editing validation and quality assurance
- **Checks**: 4-point structure compliance, bilingual integrity, cross-reference validity, numbering consistency
- **Output**: Review reports with validation results
- **Activation**: Automatically after edits or via `/validate [section]`

#### **whole-regrouper** (v5.0.0) - LATEST
- **Purpose**: Reorganize concepts into thematic groups + intelligent reconciliation
- **Innovation**: v5.0.0 introduces intelligent analysis (no assumptions about which grouping is "correct")
- **Analysis Criteria**: Coherence, Balance, Natural Thinking, Accuracy
- **Strategy Options**:
  - [A] Tổng Quan → Content (Tổng Quan logic better)
  - [B] Content → Tổng Quan (Content details more accurate)
  - [C] Full Regroup (Both have issues)
  - [H] Hybrid Merge (Combine best of both)
  - [S] Skip (Already synced)
- **Activation**: `/regroup [function-number]` or `/regroup` (auto-detect)
- **Key Feature**: Progressive disclosure (loads guidance as needed, ~60% token savings)
- **Validation**: Integrated validation before commit via `validate-regroup.js`

### 4. Commands (9 Total)

| Command | Purpose | Status |
|---------|---------|--------|
| `/status` | Display progress (X/50 functions, estimated time) | Active |
| `/next` | Auto-detect next function to work on | Active |
| `/analyze [section]` | Pre-edit analysis with recommendations | Active |
| `/edit [section]` | Start editing session | Active |
| `/expand [domain] [func] [topic]` | Add new concepts to section | Active |
| `/regroup [number]` | Full regrouping (auto-detects if no arg) | Active |
| `/reconcile [number]` | Sync Tổng Quan ↔ Content mismatch (v2.0.0) | Active |
| `/validate [section]` | Post-edit validation | Active |
| `/report` | Generate comprehensive progress report | Active |

### 5. Automation Hooks (4 Active)

| Hook | Trigger | Purpose |
|------|---------|---------|
| `session-init.cjs` | On session start | Display progress and suggest next task |
| `dev-rules-reminder.cjs` | Context injection | Remind about project rules |
| `progress-indicator.cjs` | PostToolUse | Show feedback on tool execution |
| `validate-edit.cjs` | Pre-commit | Validate changes before committing |

### 6. Agents (3 Specialized)

| Agent | Model | Purpose |
|-------|-------|---------|
| `whole-content-validator` | haiku | Validates 4-point structure, bilingual format, cross-references |
| `whole-translator` | haiku | Vietnamese-English translation with cultural authenticity |
| `whole-cross-reference` | haiku | Manages bidirectional links and detects orphaned references |

### 7. Validation Scripts

**validate-regroup.js** - Pre-commit validation
- Checks "Tổng Quan" section preservation
- Verifies continuous numbering (1, 2, 3...)
- Validates bilingual group names
- Ensures no content deletion
- Checks group size (3-8 concepts recommended)

---

## Key Workflows

### 1. Regrouping Workflow

```
/status → Show progress
    ↓
/next or /regroup [number] → Activate whole-regrouper
    ↓
[whole-regrouper analyzes concepts]
    ↓
[Claude proposes thematic groups]
    ↓
[User approves/modifies]
    ↓
[Apply changes & preserve Tổng Quan]
    ↓
/validate [number] → Run validation
    ↓
git commit → Auto-update progress
```

### 2. Reconciliation Workflow (v5.0.0 NEW)

```
/reconcile [number] → Activate intelligent analysis
    ↓
[Analyze Tổng Quan grouping]
    ↓
[Analyze Content grouping]
    ↓
[Compare using 4 criteria:]
  - Coherence (HIGH weight)
  - Balance (MEDIUM weight)
  - Natural Thinking (HIGH weight)
  - Accuracy (MEDIUM weight)
    ↓
[Choose strategy: A/B/C/H/S]
    ↓
[Apply changes if needed]
    ↓
/validate → Confirm sync
```

### 3. Editing Workflow

```
/analyze [section] → Pre-edit analysis
    ↓
[whole-analyzer reports duplicates/gaps]
    ↓
/edit [section] → Start editing
    ↓
[Apply changes following 4-point structure]
    ↓
[Maintain bilingual format & cross-refs]
    ↓
/validate [section] → Final check
    ↓
git commit → Update tracking
```

---

## Development Technologies

### Languages Used
- **Markdown** - All documentation (.md files)
- **JSON** - Progress tracking, configuration
- **JavaScript** - Validation and automation scripts
- **Python** - Data processing and verification scripts
- **YAML** - Skill and command definitions

### Key Tools
- **Claude Code** - AI-powered development environment
- **Repomix** - Codebase packing and analysis
- **Git** - Version control
- **Bash** - Command automation

### External Dependencies
- Claude API (for AI-powered skills)
- Node.js (for script execution)
- Python 3 (for automation scripts)

---

## Data Organization

### Concept Numbering System
- **Domain**: 1-10 (FOUNDATIONS through META)
- **Function**: 1-5 per domain
- **Full ID**: Domain-Function (e.g., "3-4" = OPERATIONS > Function 4)
- **Concepts**: Numbered sequentially within function (1, 2, 3...)
- **Groups**: Numbered sequentially within function (1, 2, 3...)

### Bilingual Content Standards
- **Header Format**: `#### **[num]. English Name - Tên Tiếng Việt**`
- **Vietnamese**: Primary language, cultural authenticity
- **English**: Secondary, conceptual precision
- **Required**: Both languages in every heading and major section

### Cross-Reference Format
```
→ **Liên kết:** [Domain] > [Function] > [Concept]
   Examples: FOUNDATIONS > Function 2 > Concept 3
             VALIDATION > Function 1 > Concepts 2, 5
```

---

## Quality Assurance Standards

### Validation Checklist
- **4-Point Structure**: Each concept has Definition, Context, Application, Integration (minimum)
- **Bilingual Integrity**: Both Vietnamese and English present for all headings
- **Cross-References**: All links valid and bidirectional
- **Numbering**: Sequential within each section, no gaps
- **Group Size**: 3-8 concepts per group (recommended)
- **Content Preservation**: No deletion of existing material (append-only model)

### Error Rates
- Current error rate: <5% (down from 15% at project start)
- Most common issues: Numbering inconsistencies, missing bilingual headers
- Resolution: Automated validation and user-guided fixes

---

## Project Completion Status

**100% Complete** (2025-12-27)

| Metric | Value |
|--------|-------|
| Functions Completed | 50/50 |
| Domains Completed | 10/10 |
| Total Concepts | 2,072 |
| Total Groups | 371 |
| Avg Concepts/Function | 41.1 |
| Avg Groups/Function | 7.5 |
| Sessions Completed | 31 |
| Total Duration | 12 days |
| Avg Time/Function | 10.4 minutes |

---

## Notable Features

### Progressive Disclosure
The whole-regrouper skill uses progressive disclosure to load detailed guidance only when needed, reducing token consumption by approximately 60% per activation.

### Intelligent Reconciliation (v5.0.0)
Unlike previous versions that assumed one representation was "correct," v5.0.0 analyzes both Tổng Quan and Content groupings using four weighted criteria before recommending a strategy.

### Auto-Progress Tracking
All changes automatically update `.whole-progress.json` with session statistics, enabling accurate time estimates and progress visualization.

### Append-Only Architecture
The entire system follows "Only Add, Never Subtract" principle, ensuring no knowledge is lost and all content changes are cumulative.

---

## Integration Points

### With Claude Code
- Uses Claude Code skills system for automation
- Integrated hooks for session management and validation
- Custom commands for workflow automation
- Agent integration for specialized tasks

### With Git
- Progress tracking updates on every commit
- Hook validation before commit acceptance
- Branching support for experimental features
- Full change history preservation

### With External Tools
- Repomix for codebase analysis
- Node.js for script execution
- Python for data validation

---

## File Statistics (Repomix Analysis)

**Total Repository Size**:
- 66 files
- 543,731 tokens
- 1,921,902 characters

**Largest Files**:
1. `Whole.md` - Main knowledge base
2. `repomix-output.xml` - Packed codebase
3. `.whole-progress.json` - Progress tracking
4. Various skill references and workflow guides

---

## Security & Compliance

- No suspicious files detected (verified by Repomix security check)
- Git-based version control for audit trails
- All code reviewed before execution
- Private project (not for distribution)
- Access controlled via Claude Code environment

---

## Maintenance & Support

### Regular Tasks
- Update progress tracker after each session
- Run validation before commits
- Update cross-references when concepts change
- Monitor for duplicate concepts

### Troubleshooting
See `docs/troubleshooting.md` for common issues and solutions

### Future Enhancements
See `docs/project-roadmap.md` for planned improvements including CF30 split analysis

---

*Generated from repomix analysis on 2025-12-29*
*For latest updates, see `.whole-progress.json` and `Whole.md`*
