---
description: Validate a section of Whole.md for structure, bilingual, and cross-reference compliance
---

Validate the specified section of Whole.md: **$ARGUMENTS**

## Validation Process

1. **Identify Target Section**
   - If function number provided: Validate CHUC NANG [number]
   - If domain provided: Validate entire domain
   - If no argument: Ask which section to validate

2. **Run Validation Scripts**
   Execute these validation scripts in sequence:

   ```bash
   # Structure validation (4-point compliance)
   node .claude/skills/whole-editor/scripts/validate-structure.js [number]

   # Bilingual format check
   node .claude/skills/whole-editor/scripts/bilingual-check.js [number]

   # Cross-reference validation
   node .claude/skills/whole-editor/scripts/check-cross-refs.js [number]
   ```

3. **Generate Validation Report**

   Output format:
   ```markdown
   ## Validation Report: [Section Name]

   ### Structure Validation
   - Status: PASS/FAIL
   - Issues: [list if any]

   ### Bilingual Check
   - Status: PASS/FAIL
   - Issues: [list if any]

   ### Cross-Reference Check
   - Status: PASS/FAIL
   - Issues: [list if any]

   ### Summary
   - Total checks: 3
   - Passed: N
   - Failed: N

   ### Recommendations
   [Action items if any issues found]
   ```

4. **Handle Failures**
   - If any validation fails, list specific issues
   - Suggest fixes for each problem
   - Do NOT auto-fix without user approval

## Usage Examples

- `/validate 1` - Validate CHUC NANG 1
- `/validate foundations` - Validate all functions in Foundations domain
- `/validate` - Interactive mode (asks which section)
