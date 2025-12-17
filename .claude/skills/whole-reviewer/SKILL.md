---
name: whole-reviewer
description: |
  Post-editing validation for Whole documentation. Use when: (1) After completing edits,
  (2) Before marking task complete, (3) Validating cross-reference updates,
  (4) Verifying bilingual consistency, (5) Final quality check.
version: 2.0.0
license: MIT
allowed-tools:
  - Grep
  - Read
  - Bash
metadata:
  author: "Whole Project"
  category: "documentation"
  updated: "2025-12-17"
---

# Whole Content Reviewer

## Purpose
Validate all changes meet quality standards before completion.

## Review Checklist

### Content Integrity
- [ ] No content deleted without approval
- [ ] All additions follow 4-point structure
- [ ] Bilingual format consistent

### Cross-Reference Integrity
- [ ] All refs updated bidirectionally
- [ ] No orphaned refs
- [ ] Correct format used

### Quality Standards
- [ ] Vietnamese culturally authentic
- [ ] English conceptually precise
- [ ] Examples relevant and clear

## Verification Protocol
1. Compare before/after sections
2. Validate each change type
3. Check cross-ref consistency
4. Verify bilingual alignment
5. Confirm structure preservation

## Report Format

```markdown
# Review Report: [Section]

## Changes Applied
- Additions: [N]
- Modifications: [N]
- Cross-ref updates: [N]

## Validation Results
- [✓/✗] Content integrity
- [✓/✗] Cross-ref integrity
- [✓/✗] Quality standards

## Issues Found
[List if any]

## Approval Status
[APPROVED / NEEDS REVISION]
```
