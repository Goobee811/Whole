# Skill Reference

Comprehensive reference for all Claude Code skills in the Whole project.

## Available Skills

### whole-editor

**Purpose**: Primary editing skill for content modification.

**Use When**:
- Editing content in Whole docs
- Expanding domain/function concepts
- Adding new concepts with 4-point descriptions
- Updating cross-references
- Resolving duplicate concepts

**Key Rules**:
- Never delete without approval
- Always use bilingual format
- Maintain 4-point structure
- Update cross-references bidirectionally

**Activation**: `/edit [section]`

**References**:
- `.claude/skills/whole-editor/references/editing-protocol.md`
- `.claude/skills/whole-editor/references/duplicate-resolution.md`
- `.claude/skills/whole-editor/references/bilingual-rules.md`
- `.claude/skills/whole-editor/references/structure-validation.md`

### whole-analyzer

**Purpose**: Pre-editing analysis and duplicate detection.

**Use When**:
- Starting new editing session
- Checking for duplicates across domains
- Analyzing section completeness
- Validating structure before bulk edits

**Output**: Analysis report with findings, duplicates, recommendations

**Activation**: `/analyze [section]`

### whole-reviewer

**Purpose**: Post-editing validation and quality check.

**Use When**:
- After completing edits
- Before marking task complete
- Validating cross-reference updates
- Final quality check

**Output**: Review report with validation results

**Activation**: Automatically after edits

### whole-regrouper (v3.0.0)

**Purpose**: Reorganize concepts into thematic groups with progressive disclosure.

**Use When**:
- Function has too many ungrouped concepts
- Concepts need logical reorganization
- Improving navigation within a function

**Key Rules**:
- Preserve "Tổng Quan" section exactly
- Keep all concept content intact
- Create groups of 3-8 concepts
- Number groups and concepts sequentially
- Use bilingual group names

**Features** (v3.0.0):
- Progressive disclosure - loads detailed guidance only when needed
- Auto-detection of next function to process
- Integrated validation before commit
- Progress tracking with `.whole-progress.json`

**Activation**: `/regroup [function-number]` or just `/regroup`

**References**:
- `.claude/skills/whole-regrouper/references/grouping-principles.md`
- `.claude/skills/whole-regrouper/references/workflow-steps.md`
- `.claude/skills/whole-regrouper/references/naming-guidelines.md`
- `.claude/skills/whole-regrouper/references/quality-checklist.md`
- `.claude/skills/whole-regrouper/references/robust-operations.md`

## Validation Scripts

Located in `.claude/skills/whole-regrouper/scripts/`:

### validate-regroup.js

```bash
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [function-number]
```

**Checks**:
- "Tổng Quan" section preservation
- Continuous numbering (1, 2, 3...)
- Bilingual group names
- No content deletion
- Group size (3-8 concepts recommended)

## Agents

Located in `.claude/agents/`:

### whole-content-validator

**Purpose**: Automated content validation after edits.

**Model**: haiku (fast, efficient)

**Checks**:
- 4-point structure compliance
- Bilingual integrity
- Cross-references validity
- Numbering consistency

### whole-translator

**Purpose**: Translation assistance for Vietnamese-English.

**Model**: haiku

**Capabilities**:
- Cultural adaptation (Vietnamese authenticity)
- Terminology consistency
- Format compliance
- Bidirectional translation

### whole-cross-reference

**Purpose**: Manage bidirectional cross-references.

**Model**: haiku

**Capabilities**:
- Link validation
- Orphan detection
- Reference mapping
- Broken link identification

## Integration Notes

- Skills auto-activate based on commands
- Agents can be invoked for specialized tasks
- Validation scripts run automatically via hooks
- Progress tracker updates after commits
- Progressive disclosure reduces token usage by ~60%

## Skill Activation Flow

```
/status → Display progress
    ↓
/next → Identify next function
    ↓
/regroup or /edit → Activate skill
    ↓
[Work on content]
    ↓
/validate → Run validation
    ↓
Commit → Update progress tracker
```
