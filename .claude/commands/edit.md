---
description: Edit a section of Whole documentation
argument-hint: [section-path]
---

## Task
Edit the Whole documentation section specified.

## Workflow
1. Activate `whole-analyzer` skill to analyze current state
2. Review analysis report
3. Activate `whole-editor` skill
4. Follow editing protocol in `references/editing-protocol.md`
5. Present proposed changes
6. After approval, implement changes
7. Activate `whole-reviewer` skill for validation
8. Report completion with summary

## Section Path Format
`Domain > Function` or `Domain > Function > Concept`

Examples:
- `Foundations > Understanding`
- `Dynamics > Analysis > Feedback Loops`

## Input
<section>$ARGUMENTS</section>
