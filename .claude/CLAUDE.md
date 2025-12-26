# Whole Knowledge Architecture Editor

## Overview
Specialized Claude skills for editing and expanding the Whole bilingual knowledge architecture documentation.

## Core Philosophy
- **Only Add, Never Subtract**: Never delete existing content without explicit approval
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **Structural Preservation**: Maintain 10 domains, 5 functions each, 4-point (at least 4, can have more) descriptions

## Skills Available
- `whole-editor`: Main editing skill for content expansion
- `whole-analyzer`: Pre-editing analysis and duplicate detection
- `whole-reviewer`: Post-editing validation
- `whole-regrouper`: Phân tích và gom nhóm lại khái niệm trong CHỨC NĂNG (v3.0.0 - Progressive disclosure)

## Workflows
- `.claude/workflows/editing-workflow.md`: Step-by-step editing process

## Automation & Productivity Features

### Progressive Disclosure (NEW)
- **whole-regrouper v3.0.0**: Main skill file reduced from 199 → 108 lines (45% reduction)
- Detailed guidance in `references/` (loaded as needed):
  - `grouping-principles.md` - Coherence, balance, bilingual criteria
  - `workflow-steps.md` - Detailed 5-step workflow
  - `naming-guidelines.md` - Group naming best practices
  - `quality-checklist.md` - Pre/during/post validation
- **Token savings:** ~60% per skill activation

### Progress Tracking (NEW)
- `.whole-progress.json` - Tracks completed CHỨC NĂNGs (X/50)
- Auto-suggests next function to regroup
- Session stats: avg concepts/function, time, completion %
- Milestone tracking with estimates

### Intelligent Commands (NEW)
- `/regroup` - Auto-detects next CHỨC NĂNG to process
- `/regroup [number]` - Specify function explicitly
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
- `/regroup [function-number]` - ⚡ Regroup CHỨC NĂNG (auto-detects next, v2.0.0)

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
