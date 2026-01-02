---
description: Validate a section of Whole.md for structure, bilingual, and cross-reference compliance
---

Validate the specified section of Whole.md: **$ARGUMENTS**

## Validation Strategy

### Quick Validation (Scripts Only - Recommended First)
Fast, automated checks using validation scripts

### Deep Analysis (Optional - After Major Edits)
Invoke specialized agents for comprehensive analysis and graph visualization

---

## Validation Process

### 1. Identify Target Section
- If function number provided: Validate CHỨC NĂNG [number]
- If domain provided: Validate entire domain
- If no argument: Ask which section to validate

### 2. Run Validation Scripts (Always First)
Execute validation scripts in sequence:

```bash
# Comprehensive validation (recommended - most thorough)
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [number]

# Detailed validation suite
node .claude/skills/whole-editor/scripts/validate-structure.js [number]
node .claude/skills/whole-editor/scripts/bilingual-check.js [number]
node .claude/skills/whole-editor/scripts/check-cross-refs.js [number]
```

### 3. Optional: Invoke Agents for Deep Analysis
**When to use agents:**
- After major edits or regrouping
- Need reference graph visualization
- Require terminology consistency analysis
- Want strategic link suggestions

**Available agents:**

```javascript
// Comprehensive content validation
Task(subagent_type: 'whole-content-validator',
     prompt: 'Validate CF[N] - comprehensive check with scripts + manual analysis')

// Cross-reference graph analysis
Task(subagent_type: 'whole-cross-reference',
     prompt: 'Analyze CF[N] cross-references - build graph, find orphaned links')

// Translation/terminology consistency (if needed)
Task(subagent_type: 'whole-translator',
     prompt: 'Review CF[N] terminology consistency across functions')
```

### 4. Generate Validation Report

```markdown
## Validation Report: CHỨC NĂNG [N]

### Scripts Executed:
- ✅ validate-regroup.js: PASS (0 issues)
- ✅ validate-structure.js: PASS (0 issues)
- ✅ bilingual-check.js: PASS (0 issues)
- ⚠️ check-cross-refs.js: WARNING (2 orphaned refs)

### Agent Analysis (if invoked):
- ✅ whole-content-validator: PASS
  - 15 concepts validated, 23 cross-refs checked
  - 0 critical, 2 warnings
- ⚠️ whole-cross-reference: WARNINGS
  - 5 orphaned references found
  - Reference graph: 3 high-connectivity concepts identified

### Issues Found:
#### Critical (Must fix before commit):
*None*

#### Warnings (Fix recommended):
1. CF[N] Concept 5 → CF12 Concept 3 missing reciprocal link
2. CF[N] Concept 8 → CF25 Concept 1 missing reciprocal link

### Recommendations:
1. Add reciprocal cross-references for orphaned links
2. Review high-connectivity concepts for integration opportunities
```

### 5. Handle Failures
- If validation fails, list specific issues
- Suggest fixes for each problem
- Do NOT auto-fix without user approval
- Re-run validation after fixes

---

## Usage Examples

### Basic Validation (Scripts Only)
```bash
/validate 1              # Validate CF1 (scripts only - fast)
/validate foundations    # Validate all functions in Foundations domain
/validate                # Interactive mode
```

### With Agent Deep Analysis
```bash
/validate 1 --deep       # Scripts + invoke all agents
/validate 1 --graph      # Scripts + cross-reference graph analysis
/validate 1 --terms      # Scripts + terminology consistency check
```

---

## Decision Guide

| Scenario | Approach |
|----------|----------|
| After minor edits | Scripts only (fast) |
| After regrouping | Scripts + whole-content-validator |
| Editing cross-refs | Scripts + whole-cross-reference |
| Complex translations | Scripts + whole-translator |
| Before commit | Always run scripts minimum |

---

**Version**: 2.1.0 (Agent integration support)
**Agents Available**: whole-content-validator, whole-cross-reference, whole-translator
