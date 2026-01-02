---
description: Edit a section of Whole documentation
argument-hint: [section-path]
---

## Task
Edit the Whole documentation section specified.

## Workflow

### Standard Editing Flow
1. Activate `whole-analyzer` skill to analyze current state
2. Review analysis report
3. Activate `whole-editor` skill (v2.1.0)
4. Follow editing protocol in `references/editing-protocol.md`
5. Present proposed changes
6. After approval, implement changes
7. Activate `whole-reviewer` skill for validation
8. Report completion with summary

### With Complex Translations (Optional)
If editing involves complex abstract concepts or terminology:

**Invoke whole-translator agent:**
```javascript
// For complex abstract concepts requiring cultural adaptation
Task(subagent_type: 'whole-translator',
     prompt: 'Translate and culturally adapt concept [name] in CF[N]')

// For terminology consistency audit
Task(subagent_type: 'whole-translator',
     prompt: 'Review terminology consistency in [section]')
```

**When to use whole-translator:**
- Complex abstract concepts needing cultural adaptation
- Technical terminology requiring Vietnamese equivalents
- Bulk translation of new content sections
- Terminology consistency audits across functions

**Don't use for:**
- Simple word translations (use `references/bilingual-rules.md`)
- Format validation (use `bilingual-check.js` script)

---

## Section Path Format
`Domain > Function` or `Domain > Function > Concept`

Examples:
- `Foundations > Understanding`
- `Dynamics > Analysis > Feedback Loops`

---

## Integration Points

### Skills Activated:
- **whole-analyzer** (v2.0.0) - Pre-editing analysis
- **whole-editor** (v2.1.0) - Main editing (integrates whole-translator)
- **whole-reviewer** (v2.1.0) - Post-editing validation (integrates agents)

### Agents Available:
- **whole-translator** - Complex translation with cultural adaptation
- **whole-content-validator** - Comprehensive validation (via whole-reviewer)
- **whole-cross-reference** - Reference graph analysis (via whole-reviewer)

---

## Input
<section>$ARGUMENTS</section>

---

**Version**: 2.1.0 (Agent integration support)
