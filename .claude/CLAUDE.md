# Whole Knowledge Architecture Editor

## Overview
Specialized Claude skills for editing and expanding the Whole bilingual knowledge architecture documentation.

## Core Philosophy
- **Only Add, Never Subtract**: Never delete existing content without explicit approval
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **Structural Preservation**: Maintain 10 domains, 5 functions each, 4-point (at least 4, can have more) descriptions

## Skills Available
- `whole-editor` (v2.1.0): Main editing skill for content expansion (integrates whole-translator)
- `whole-analyzer` (v2.1.0): Pre-editing analysis and duplicate detection (integrates agents for deep analysis)
- `whole-reviewer` (v2.1.0): Post-editing validation (integrates agents for deep analysis)
- `whole-regrouper` (v5.1.0): Phân tích, gom nhóm, và ĐỒNG BỘ Tổng Quan ↔ Content (Intelligent Analysis + Agent Integration)
- `whole-group-processor` (v1.0.0): Xử lý từng GROUP một cách có hệ thống với progress tracking (371 groups across 50 functions)

## Agents Available (v2.1.0 - Modernized)
- `whole-content-validator`: Comprehensive validation (scripts + manual checks)
- `whole-cross-reference`: Bidirectional link validation + reference graph analysis
- `whole-translator`: Complex translation with cultural adaptation

## Workflows
- `.claude/workflows/editing-workflow.md`: Step-by-step editing process

## Automation & Productivity Features

### Reconciliation & Progressive Disclosure
- **whole-regrouper v5.1.0**: Intelligent Analysis with agent integration and reconciliation support
- **Three Workflows:**
  - `/regroup` - Full regroup (analyze concepts → new groups → update both)
  - `/reconcile` - Sync only (compare → detect mismatch → fix → direct push)
- Detailed guidance in `references/` (loaded as needed):
  - `grouping-principles.md` - Coherence, balance, bilingual criteria
  - `workflow-steps.md` - Detailed 5-step workflow
  - `naming-guidelines.md` - Group naming best practices
  - `quality-checklist.md` - Pre/during/post validation
- **Token savings:** ~60% per skill activation

### Progress Tracking (NEW)
- `.whole-progress.json` - Tracks completed CHỨC NĂNGs (X/50)
- `.group-progress.json` - Tracks completed GROUPs (X/431) ← NEW
- Auto-suggests next function to regroup
- Auto-suggests next group to process
- Session stats: avg concepts/function, time, completion %
- Milestone tracking with estimates

### Intelligent Commands (NEW)
- `/regroup` - Auto-detects next CHỨC NĂNG to process
- `/regroup [number]` - Specify function explicitly
- `/group next` - Auto-detects next GROUP to process ← NEW
- `/group [D-F-G]` - Process specific group (e.g., 1-1-3) ← NEW
- Integrated validation before commit
- Auto-updates progress tracker after completion

### Hooks System (NEW)
- `session-init.cjs` - Displays progress on session start
- `progress-indicator.cjs` - PostToolUse feedback
- Suggests next CHỨC NĂNG automatically

### Validation Scripts (NEW)
- `scripts/validate-regroup.js` - Pre-commit validation
  - Checks "Tổng Quan" preservation
  - Verifies continuous numbering (1, 2, 3...)
  - Validates bilingual group names
  - Ensures no content deletion
- Run: `node .claude/skills/whole-regrouper/scripts/validate-regroup.js [number]`

### Plan Templates (NEW)
- `plans/templates/regroup-template.md` - Standardized regrouping plan
- Built-in checklists for each phase
- Success criteria validation
- Learnings capture for iteration improvement

## Document Structure
- **10 Domains**: Foundations, Dynamics, Operations, Creation, Navigation, Integration, Validation, Amplification, Transcendence, Meta
- **5 Functions per Domain**: Understanding, Analysis, Synthesis, Application, Integration
- **4-Point Descriptions**: Definition, Context, Application, Integration...

## Content Guidelines

### Bilingual Requirements
- Vietnamese: Primary language, cultural authenticity
- English: Translation with conceptual precision

### Concept Format Standard

#### Heading Levels (Bilingual Required)
```
# [số]. DOMAIN NAME - TÊN DOMAIN
## CHỨC NĂNG [số]: FUNCTION NAME - TÊN CHỨC NĂNG
#### **[số]. Concept Name - Tên Khái Niệm**
```

#### Concept Content
```
#### **[số]. Tên English - Tên Tiếng Việt**

[Mô tả ngắn về khái niệm]

- **[English term]**: [Vietnamese explanation]
- **[English term]**: [Vietnamese explanation]
- **[English term]**: [Vietnamese explanation]
- **[English term]**: [Vietnamese explanation]
- ... (tối thiểu 4 points, có thể nhiều hơn)

→ **Liên kết:** [Cross-references]
```

### Structural Integrity
- Each concept: minimum 4-point description (can have more)
- Cross-references: Maintain bidirectional links
- Functions per domain: 5 core functions
- NO deletion of existing content

### Duplicate Analysis
When evaluating duplicates:
1. **Meaningful Diversity** - Keep if concept serves different contextual roles
2. **True Redundancy** - Consolidate if identical across contexts
3. Decision factors: Primary function, natural user thinking patterns

## Working with Whole.md
**IMPORTANT**: Whole.md is a large file (>1MB). Always use Grep first to find relevant sections before reading.

```
1. Grep for concept name/keyword → Get line numbers
2. Read specific lines with offset/limit → Get context
3. Edit the specific section
```

**NEVER** try to read Whole.md without offset/limit parameters.

## Editing Workflow
1. **Grep** for relevant content first
2. **Read** specific sections (with offset/limit)
3. Analyze for improvements/duplicates
4. Propose changes with rationale
5. Apply after approval
6. Update cross-references

## Custom Commands
- `/analyze [section-path]` - Analyze section for issues
- `/edit [section-path]` - Start editing session
- `/expand [domain] [function] [topic]` - Add new concepts
- `/regroup [function-number]` - ⚡ Regroup CHỨC NĂNG (full regroup workflow)
- `/reconcile [function-number]` - 🔄 Sync Tổng Quan ↔ Content mismatch (v5.1.0)
- `/group [identifier]` - 📦 Process specific group (e.g., `/group 1-1-3` or `/group CF5-7`)
- `/group-status [scope]` - 📊 View group processing progress
- `/group-plan [scope]` - 📋 Create processing plan for groups

## Style Preferences
- Formal yet accessible tone
- Comprehensive, complete coverage
- No partial deliverables
- Systematic, methodical approach

## Task Completion Protocol
After completing any task (commit/push done), you MUST:

1. Output summary of changes
2. Output this exact block:
```
═══════════════════════════════════════
🛑 END OF TASK - AWAITING NEW COMMAND
═══════════════════════════════════════
```
3. **STOP COMPLETELY** - No more tool calls, no analysis, no suggestions
4. **WAIT** for user's next command

**NEVER** after task completion:
- Start new tasks automatically
- Analyze additional files
- Suggest improvements
- Run any commands
