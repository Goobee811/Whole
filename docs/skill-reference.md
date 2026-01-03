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

### whole-regrouper (v5.1.0)

**Purpose**: Reorganize concepts into thematic groups with intelligent reconciliation.

**Use When**:
- Function has too many ungrouped concepts
- Concepts need logical reorganization
- Improving navigation within a function
- Synchronizing Tổng Quan listing with actual content (NEW - v5.0.0)

**Key Rules**:
- Preserve all concept content (append-only)
- Create groups of 3-8 concepts
- Number groups and concepts sequentially
- Use bilingual group names
- Analyze both grouping representations before deciding strategy (v5.0.0)

**Features** (v5.0.0 - Intelligent Analysis):
- **Dual-Representation Analysis**: No longer assumes one grouping is "correct"
- **4-Criterion Evaluation**: Analyzes Coherence, Balance, Natural Thinking, Accuracy
- **Strategy Options**: Choose [A] Tổng Quan→Content, [B] Content→Tổng Quan, [C] Full Regroup, [H] Hybrid Merge, or [S] Skip
- **Progressive Disclosure**: Loads detailed guidance only when needed (~60% token savings)
- **Auto-Detection**: Identifies next function to process automatically
- **Integrated Validation**: Pre-commit validation via `validate-regroup.js`
- **Progress Tracking**: Updates `.whole-progress.json` with session statistics

**Key Improvement (v5.0.0)**: Intelligent decision-making instead of fixed assumptions

```
OLD (v4.0.0): Assume Tổng Quan → Content is always correct
NEW (v5.0.0): Analyze BOTH representations against 4 criteria
              → Choose best strategy based on evidence
```

**Analysis Criteria**:

1. **Coherence (HIGH weight)**: Do concepts share a common theme?
2. **Balance (MEDIUM weight)**: Are groups 3-8 concepts (ideal 5-6)?
3. **Natural Thinking (HIGH weight)**: Matches user mental model?
4. **Accuracy (MEDIUM weight)**: Names describe content correctly?

**Strategy Options**:

| Option | When to Use | Action |
|--------|-------------|--------|
| **[A]** Tổng Quan → Content | Tổng Quan logic better | Reorganize content to match Tổng Quan |
| **[B]** Content → Tổng Quan | Content details more accurate | Update Tổng Quan listing to match actual |
| **[C]** Full Regroup | Both have significant issues | Run `/regroup` for complete analysis |
| **[H]** Hybrid Merge | Both have distinct strengths | Combine best groups from each |
| **[S]** Skip | Already synchronized | No changes needed |

**Activation**:
- `/regroup [function-number]` - Full regrouping workflow
- `/reconcile [function-number]` - Intelligent sync only (v5.1.0)
- `/regroup` - Auto-detects next function (no argument needed)

**References**:
- `.claude/skills/whole-regrouper/references/grouping-principles.md` - Grouping philosophy
- `.claude/skills/whole-regrouper/references/workflow-steps.md` - 5-step workflow
- `.claude/skills/whole-regrouper/references/naming-guidelines.md` - Naming best practices
- `.claude/skills/whole-regrouper/references/quality-checklist.md` - Pre/during/post validation
- `.claude/skills/whole-regrouper/references/robust-operations.md` - Operations guide

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

## Reconciliation Command (v5.1.0)

**Command**: `/reconcile [function-number]`

**Purpose**: Intelligent synchronization between Tổng Quan listing and actual content groups.

**When to Use**:
- After /regroup to verify grouping matches Tổng Quan
- When Content and Tổng Quan appear misaligned
- For periodic consistency checks
- Before major edits to ensure baseline synchronization

**Workflow**:
1. Analyze current Tổng Quan grouping
2. Analyze actual Content headers and groups
3. Compare using 4 criteria (Coherence, Balance, Natural Thinking, Accuracy)
4. Propose strategy [A/B/C/H/S]
5. Apply changes if needed
6. Validate with `/validate [number]`

**Example Output**:
```
Analyzing CHỨC NĂNG 15...

Tổng Quan has 6 groups (avg 7.2 concepts/group)
Content has 7 groups (avg 6.1 concepts/group)

Coherence: Tổng Quan slightly better (85% vs 82%)
Balance: Content better (ideal 5-6 per group)
Natural Thinking: Tổng Quan more intuitive
Accuracy: Content more precisely named

RECOMMENDATION: Strategy [B] - Content → Tổng Quan
Reason: More accurate grouping, better concept distribution

Apply? [yes/no]
```

**Key Difference from /regroup**:
- `/regroup`: Full analysis and regrouping from scratch
- `/reconcile`: Compare two existing representations, choose best

---

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
/reconcile [number] → Check Tổng Quan ↔ Content sync (NEW)
    ↓
/validate → Run validation
    ↓
Commit → Update progress tracker
```

---

## Command Reference Summary

| Command | Skill | Purpose | Activation |
|---------|-------|---------|------------|
| `/status` | - | Show progress (X/50) | Built-in |
| `/next` | - | Auto-detect next function | Built-in |
| `/analyze [section]` | whole-analyzer | Pre-edit analysis | Interactive |
| `/edit [section]` | whole-editor | Content editing | Interactive |
| `/expand [domain] [func] [topic]` | whole-editor | Add new concepts | Interactive |
| `/regroup [number]` | whole-regrouper v5.1.0 | Full regrouping | Interactive |
| `/reconcile [number]` | whole-regrouper v5.1.0 | Sync Tổng Quan ↔ Content | Interactive (NEW) |
| `/validate [section]` | whole-reviewer | Validate changes | Post-edit |
| `/report` | - | Generate progress report | Built-in |
