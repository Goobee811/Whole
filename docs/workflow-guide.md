# Workflow Guide

Step-by-step guide for working with Whole Knowledge Architecture.

## Quick Start

1. **Check Status**: `/status`
2. **Find Next Task**: `/next`
3. **Start Working**: `/regroup [number]` or `/edit [section]`
4. **Validate**: `/validate [section]`
5. **Commit**: Follow commit message format

## Detailed Workflows

### Workflow 1: Regrouping Concepts

Use when reorganizing concepts within a function.

**Steps:**

1. **Identify Target**
   ```
   /next
   ```
   Or specify directly: `/regroup 9`

2. **Analyze Current State**
   - Grep finds function section
   - Read loads concepts with offset/limit
   - Analysis proposes new groupings

3. **Review Proposal**
   - Check group coherence (3-8 concepts each)
   - Verify bilingual naming
   - Confirm no content deletion

4. **Apply Changes**
   - Preserve "Tong Quan" section exactly
   - Renumber concepts sequentially (1, 2, 3...)
   - Apply new group structure

5. **Validate**
   ```
   /validate [number]
   ```

6. **Commit**
   ```
   Regroup [DOMAIN] CHUC NANG [num]: [summary]

   - [N] concepts -> [M] thematic groups
   - Groups: [list names]
   - Preserved: Tong Quan, all content
   ```

### Workflow 2: Reconciliation (NEW - v5.0.0)

Use when synchronizing Tổng Quan listing with actual content.

**Steps:**

1. **Identify Target Function**
   - After regrouping: `/reconcile [number]`
   - After manual edits: `/reconcile [number]`
   - Routine check: `/reconcile [number]`

2. **Analyze Both Representations**
   - Command analyzes Tổng Quan grouping
   - Command analyzes Content headers
   - Compares using 4 criteria:
     - Coherence (HIGH weight)
     - Balance (MEDIUM weight)
     - Natural Thinking (HIGH weight)
     - Accuracy (MEDIUM weight)

3. **Review Recommendation**
   - Strategy [A]: Tổng Quan → Content
   - Strategy [B]: Content → Tổng Quan
   - Strategy [C]: Full Regroup needed
   - Strategy [H]: Hybrid Merge (combine best)
   - Strategy [S]: Skip (already synced)

4. **Approve & Apply**
   ```
   Accept strategy? [A/B/C/H/S]
   ```

5. **Validate**
   ```
   /validate [number]
   ```

6. **Commit**
   ```
   Reconcile [DOMAIN] CHUC NANG [num]: [summary]
   - Strategy: [A/B/C/H/S]
   - Changes: [brief description]
   ```

---

### Workflow 3: Adding New Concepts

Use when expanding content with new concepts.

**Steps:**

1. **Analyze Target Section**
   ```
   /analyze [section]
   ```

2. **Identify Gaps**
   - Missing concepts
   - Incomplete descriptions
   - Weak cross-references

3. **Propose Additions**
   - Follow 4-point structure
   - Include bilingual headers
   - Add cross-references

4. **Apply After Approval**
   ```
   /edit [section]
   ```

5. **Validate**
   ```
   /validate [section]
   ```

### Workflow 4: Validation and Review

Use for quality assurance.

**Steps:**

1. **Run Full Validation**
   ```
   /validate [section]
   ```

2. **Review Results**
   - Structure compliance
   - Bilingual format
   - Cross-references

3. **Fix Issues**
   - Address critical issues first
   - Update cross-references
   - Correct formatting

4. **Re-validate**
   Ensure all checks pass before committing.

## Command Reference

| Command | Purpose |
|---------|---------|
| `/status` | Show progress status |
| `/next` | Suggest next function |
| `/analyze [section]` | Pre-edit analysis |
| `/edit [section]` | Start editing |
| `/expand [domain] [func] [topic]` | Add concepts |
| `/regroup [number]` | Reorganize concepts |
| `/validate [section]` | Validate changes |
| `/report` | Generate progress report |

## Best Practices

1. **Always analyze before editing**
2. **Get approval before changes**
3. **Validate after every edit**
4. **Use descriptive commit messages**
5. **Update progress tracker**

## Common Mistakes to Avoid

- Loading entire Whole.md at once
- Deleting content without approval
- Skipping validation
- Missing bilingual headers
- Breaking cross-references
