# Quality Assurance Workflow

Systematic QA process for Whole Knowledge Architecture documentation.

## QA Checkpoints

### Pre-Edit Validation

Before making any changes:

1. **Section Analysis**
   - Run `/analyze [section-path]`
   - Review existing content structure
   - Identify potential conflicts

2. **Scope Verification**
   - Confirm target location
   - Check adjacent sections for overlap
   - Map cross-reference dependencies

3. **Format Compliance Check**
   - Verify bilingual headers exist
   - Confirm 4-point structure
   - Check numbering sequence

### During-Edit Validation

While making changes:

1. **Content Preservation**
   - Use Edit tool (not Write) for existing files
   - Never remove content without approval
   - Maintain existing cross-references

2. **Structure Maintenance**
   - Keep 4-point format:
     - Definition
     - Context
     - Application
     - Integration
   - Use correct heading levels
   - Maintain bilingual format

3. **Cross-Reference Updates**
   - Add bidirectional links
   - Update all affected sections
   - Verify target existence

### Post-Edit Validation

After completing changes:

1. **Run Validation Script**
   ```bash
   node .claude/skills/whole-regrouper/scripts/validate-regroup.js [num]
   ```

2. **Manual Checks**
   - [ ] "Tổng Quan" section preserved
   - [ ] Continuous numbering (1, 2, 3...)
   - [ ] Bilingual group names
   - [ ] No content deletion

3. **Cross-Reference Audit**
   - Verify new links work
   - Check reciprocal links exist
   - Test navigation paths

## Validation Checklist

### Content Quality

| Check | Status |
|-------|--------|
| Vietnamese text is culturally authentic | [ ] |
| English translations are conceptually accurate | [ ] |
| Technical terms are consistent | [ ] |
| No grammatical errors | [ ] |

### Structure Quality

| Check | Status |
|-------|--------|
| 4-point structure complete | [ ] |
| Bilingual headers present | [ ] |
| Sequential numbering | [ ] |
| Proper heading levels | [ ] |

### Reference Quality

| Check | Status |
|-------|--------|
| All cross-references valid | [ ] |
| Bidirectional links exist | [ ] |
| No orphaned references | [ ] |
| Consistent format used | [ ] |

## Error Recovery

### Common Issues and Fixes

| Issue | Fix |
|-------|-----|
| Missing bilingual header | Add English - Vietnamese format |
| Incomplete 4-point | Add missing sections |
| Broken cross-reference | Verify target, update link |
| Numbering gap | Renumber sequential |
| Missing reciprocal link | Add bidirectional reference |

### Rollback Procedure

If validation fails:

1. Do not commit changes
2. Identify specific failures
3. Fix issues one by one
4. Re-run validation
5. Only commit when all checks pass

## Automated Validation

### Available Scripts

| Script | Purpose | Status |
|--------|---------|--------|
| `validate-regroup.js` | Regroup validation (Tổng Quan, numbering, groups) | ✅ Available |
| `validate-structure.js` | 4-point structure check | ✅ Available |
| `check-cross-refs.js` | Reference validation | ✅ Available |
| `bilingual-check.js` | Bilingual compliance | ✅ Available |

### Running Validation

```bash
# Full function validation (recommended - most comprehensive)
node .claude/skills/whole-regrouper/scripts/validate-regroup.js [num]

# Structure validation
node .claude/skills/whole-editor/scripts/validate-structure.js [num]

# Cross-reference check
node .claude/skills/whole-editor/scripts/check-cross-refs.js [num]

# Bilingual compliance
node .claude/skills/whole-editor/scripts/bilingual-check.js [num]
```

### Agent-Based Deep Analysis (Optional)

For complex validations or major edits, invoke specialized agents:

```javascript
// Comprehensive content validation
Task(subagent_type: 'whole-content-validator', prompt: 'Validate CF[N]')

// Cross-reference graph analysis
Task(subagent_type: 'whole-cross-reference', prompt: 'Analyze CF[N] cross-references')

// Translation/terminology consistency
Task(subagent_type: 'whole-translator', prompt: 'Review CF[N] terminology')
```

**When to use agents:**
- After major structural changes
- Complex cross-reference updates
- Bilingual terminology consistency audit
- When scripts pass but deeper analysis needed

### Manual Checks (complement to scripts and agents)

When automated validation passes but you want extra assurance:
- **Structure**: Review 4-point format visually
- **Cross-refs**: Verify links navigate correctly
- **Bilingual**: Check headers match meaning, not just format

## Reporting

After QA completion, document:

1. **Validation Results**: Pass/Fail status
2. **Issues Found**: List with severity
3. **Actions Taken**: How issues were resolved
4. **Recommendations**: Future improvements
