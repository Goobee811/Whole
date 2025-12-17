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

### whole-regrouper

**Purpose**: Reorganize concepts into thematic groups.

**Use When**:
- Function has too many ungrouped concepts
- Concepts need logical reorganization
- Improving navigation within a function

**Key Rules**:
- Preserve "Tong Quan" section exactly
- Keep all concept content intact
- Create groups of 3-8 concepts
- Number groups and concepts sequentially

**Activation**: `/regroup [function-number]`

## Validation Scripts

Located in `.claude/skills/whole-editor/scripts/`:

### validate-structure.js

```bash
node .claude/skills/whole-editor/scripts/validate-structure.js [function-number]
```

Checks:
- 4-point structure compliance
- Bullet point count (minimum 4)
- Cross-reference section presence

### bilingual-check.js

```bash
node .claude/skills/whole-editor/scripts/bilingual-check.js [function-number]
```

Checks:
- Bilingual header format
- Separator usage (- or |)
- Vietnamese character presence

### check-cross-refs.js

```bash
node .claude/skills/whole-editor/scripts/check-cross-refs.js [function-number]
```

Checks:
- Reference format compliance
- Target existence
- Bidirectional link suggestions

## Agents

Located in `.claude/agents/`:

### whole-content-validator

**Purpose**: Automated content validation after edits.

**Model**: haiku (fast, efficient)

**Checks**:
- 4-point structure
- Bilingual integrity
- Cross-references
- Numbering consistency

### whole-translator

**Purpose**: Translation assistance for Vietnamese-English.

**Model**: haiku

**Capabilities**:
- Cultural adaptation
- Terminology consistency
- Format compliance

### whole-cross-reference

**Purpose**: Manage bidirectional cross-references.

**Model**: haiku

**Capabilities**:
- Link validation
- Orphan detection
- Reference mapping

## Integration Notes

- Skills auto-activate based on commands
- Agents can be invoked for specialized tasks
- Validation scripts run automatically via hooks
- Progress tracker updates after commits
