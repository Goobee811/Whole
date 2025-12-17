# Development Rules for Whole Knowledge Architecture

**CRITICAL PRINCIPLES:**
- **Only Add, Never Subtract**: Content is sacred. Never delete without explicit approval.
- **Bilingual First**: Vietnamese primary, English secondary for all content.
- **Structure Compliance**: Every concept must have 4-point structure.

## Content Rules

1. **File Size Management**
   - Whole.md is >1MB - always use grep with offset/limit
   - Never read entire file at once
   - Target specific sections using function markers

2. **Editing Protocol**
   - ALWAYS run `/analyze` before editing
   - Get explicit approval before changes
   - Run validation after edit completes

3. **Bilingual Format**
   - Heading format: `#### **[num]. English Name - Ten Tieng Viet**`
   - Vietnamese captures cultural context, not literal translation
   - Maintain conceptual precision in both languages

4. **Cross-Reference Maintenance**
   - Format: `Domain > Function > Concept`
   - Must be bidirectional (A->B requires B->A)
   - Update all affected references when content changes

## Pre-commit Rules

- Run `node .claude/skills/whole-regrouper/scripts/validate-regroup.js`
- Ensure no broken cross-references
- Verify concept numbering is sequential
- Check bilingual headers are complete

## Quality Checkpoints

| Gate | Requirement |
|------|-------------|
| Pre-edit | Analysis complete with `/analyze` |
| Edit | Explicit user approval obtained |
| Post-edit | Validation passes via whole-reviewer |

## Structural Requirements

### Concept Format
```markdown
#### **[num]. English Name - Ten Tieng Viet**

[Brief description]

- **Term 1**: Vietnamese explanation
- **Term 2**: Vietnamese explanation
- **Term 3**: Vietnamese explanation
- **Term 4**: Vietnamese explanation
- ... (minimum 4 points, can have more)

-> **Lien ket:** [Cross-references]
```

### Domain Structure
- 10 Domains total
- 5 Functions per Domain
- Sequential numbering within each function

## Error Prevention

| Error Type | Prevention |
|------------|------------|
| Content deletion | Always use Edit, never Write for existing content |
| Missing bilingual | Validate headers before commit |
| Broken references | Check targets exist before adding links |
| Structure violation | Use validation scripts |
