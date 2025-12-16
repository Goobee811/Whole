---
description: ⚡ Regroup CHỨC NĂNG (auto-detects next or specify function)
argument-hint: [function-number (optional)]
---

## Auto-Detection & Intelligent Routing

This command intelligently determines which CHỨC NĂNG to regroup:

### If NO argument provided:
1. Check `.whole-progress.json` for last completed function
2. Suggest next function automatically
3. Display progress stats
4. Ask for confirmation before proceeding

### If argument provided:
- Use specified CHỨC NĂNG number directly
- Validate it exists in Whole.md
- Skip auto-detection

---

## Pre-Work Checks

Before activating the workflow:

- [ ] Check `.whole-progress.json` exists (if not, create from scratch)
- [ ] Read Whole.md to verify CHỨC NĂNG exists
- [ ] Confirm function hasn't been regrouped already (check git log or structure)
- [ ] **Auto-activate** `whole-regrouper` skill

---

## Workflow Execution

Execute the complete 5-step workflow:

### Step 1: Auto-detect target CHỨC NĂNG
```javascript
// Read .whole-progress.json
// If $ARG1 provided: use it
// Else: use progress.nextSuggested

const targetFunction = $ARG1 || progress.nextSuggested;
```

### Step 2: Display context
```markdown
📍 Target: CHỨC NĂNG ${targetFunction}
📊 Progress: ${completed.length}/${totalFunctions} done (${percent}%)
🎯 This will be: #${completed.length + 1}
```

### Step 3: Ask confirmation (if auto-detected)
If no $ARG1 provided, ask:
```
Ready to regroup CHỨC NĂNG ${targetFunction}? [Y/n]
```

### Step 4: Activate whole-regrouper skill
```markdown
## Task: Regroup CHỨC NĂNG ${targetFunction}

**Instructions:**
1. Use whole-regrouper skill (already activated)
2. Follow 5-step workflow: Grep → Read → Analyze → Edit → Commit
3. Validate before committing (use scripts/validate-regroup.js)
4. Update progress tracker after successful push

**Target:** CHỨC NĂNG ${targetFunction}

**Progress Context:**
- This is function #${completed.length + 1} of ${totalFunctions}
- ${totalFunctions - completed.length - 1} remaining after this
```

### Step 5: Post-completion
After successful commit & push:
```javascript
// Update .whole-progress.json:
// - Add targetFunction to completed[]
// - Update nextSuggested (targetFunction + 1)
// - Update lastUpdated timestamp
// - Update stats (if available: time, concept count, group count)
```

---

## Validation Integration

Before committing, automatically run validation:

```bash
node .claude/skills/whole-regrouper/scripts/validate-regroup.js ${targetFunction}
```

**If validation fails:**
- Display errors
- Prompt user to fix
- Re-run validation after fixes
- Only commit when all checks pass

**If validation passes:**
- Proceed with commit
- Use proper commit message format (from whole-regrouper skill)

---

## Progress Tracking

### Auto-update after success:
```json
{
  "completed": [...previous, targetFunction],
  "nextSuggested": targetFunction + 1,
  "lastUpdated": "ISO timestamp",
  "lastCompletedFunction": {
    "domain": "[detected from Whole.md]",
    "functionNumber": targetFunction,
    "functionName": "[detected from heading]",
    "completedDate": "ISO timestamp",
    "conceptCount": [detected during regroup],
    "groupCount": [detected during regroup]
  }
}
```

---

## Error Handling

### If CHỨC NĂNG not found:
```
❌ Error: CHỨC NĂNG ${targetFunction} not found in Whole.md
   Available: 1-50
   Please check function number and try again
```

### If already regrouped:
```
⚠️  Warning: CHỨC NĂNG ${targetFunction} may already be regrouped
    Last regrouped: [git log info]
    Continue anyway? [y/N]
```

### If validation fails:
```
❌ Validation failed for CHỨC NĂNG ${targetFunction}
   [Display validation errors]

   Fix errors and run validation again:
   node .claude/skills/whole-regrouper/scripts/validate-regroup.js ${targetFunction}
```

---

## Examples

### Example 1: Auto-detect next
```bash
/regroup

# Output:
📊 Progress: 4/50 done (8.0%)
🎯 Next suggested: CHỨC NĂNG 5
Ready to regroup CHỨC NĂNG 5? [Y/n]
# User types: y
# → Activates whole-regrouper skill for CF5
```

### Example 2: Specify function
```bash
/regroup 10

# Output:
🎯 Target: CHỨC NĂNG 10 (as specified)
📊 Progress: 4/50 done (8.0%)
# → Activates whole-regrouper skill for CF10 immediately
```

### Example 3: Batch mode (future enhancement)
```bash
/regroup 5-7

# Output:
🎯 Batch mode: CHỨC NĂNGs 5, 6, 7
📊 Progress: 4/50 → 7/50 after completion
Ready to start batch? [Y/n]
# → Processes CF5, CF6, CF7 sequentially
```

---

## Integration with Skill

This command works seamlessly with `whole-regrouper` skill:

- **Auto-activation**: Skill activated automatically on /regroup
- **References loading**: Skill loads detailed guidance as needed (progressive disclosure)
- **Validation**: Integrated validation before commit
- **Progress tracking**: Auto-updates .whole-progress.json

---

## Output Format

Minimal output during execution:

```
⚡ /regroup command activated

📊 PROGRESS: 4/50 (8.0%)
🎯 TARGET: CHỨC NĂNG 5
📍 DOMAIN: [Auto-detected from Whole.md]

───────────────────────────────────────

🔍 Grep: Line 1450
📖 Read: 15 concepts
🧠 Analyze: 15 → 4 groups

📝 NEW GROUPS:
1. [Group 1] (4 concepts)
2. [Group 2] (4 concepts)
3. [Group 3] (4 concepts)
4. [Group 4] (3 concepts)

✍️ Writing...
✅ Validation: PASS
📦 Commit: [hash]
🚀 Pushed successfully

📊 Updated progress: 5/50 (10.0%)
🎯 Next: CHỨC NĂNG 6
```

---

## Notes

- This command is designed for the 50-function regrouping task
- Saves ~90% manual work per iteration (no prompt editing needed)
- Integrates with hooks (if available) for session init reminders
- Extensible for future enhancements (batch mode, AI-powered grouping suggestions)

---

**Version:** 2.0.0 (Intelligent routing with auto-detection)
**Requires:** `whole-regrouper` skill v3.0.0+, `.whole-progress.json`
**Optional:** `.claude/hooks/regroup-session-init.cjs` for auto-reminders
