---
description: Show current progress status of Whole Knowledge Architecture editing
---

Analyze `.whole-progress.json` and provide a comprehensive status report:

## Status Report Generation

1. **Read Progress File**
   Load and parse `.whole-progress.json` from the project root.

2. **Overall Progress**
   - Total functions: 50 (10 domains x 5 functions)
   - Completed: N/50
   - In progress: N
   - Remaining: N
   - Completion percentage: N%

3. **Current Session**
   - Last edited function: $ARGUMENTS (if provided)
   - Last session date
   - Concepts processed

4. **Domain Breakdown**
   List each domain with completion status:

   | Domain | Functions | Completed | Status |
   |--------|-----------|-----------|--------|
   | 1. Foundations | 5 | N/5 | [status] |
   | 2. Dynamics | 5 | N/5 | [status] |
   | ... | ... | ... | ... |

5. **Statistics**
   - Average concepts per function: N
   - Average groups per function: N
   - Total time spent: N minutes
   - Estimated time remaining: N hours

6. **Recommendations**
   - Suggest next function to work on
   - Note any incomplete sections from previous sessions
   - Highlight high-priority items

## Output Format

```markdown
# Whole Progress Status

## Summary
| Metric | Value |
|--------|-------|
| Total Functions | 50 |
| Completed | N |
| Progress | N% |
| Last Updated | [date] |

## Domain Progress
[table with domain breakdown]

## Recent Activity
- Last completed: [function name] on [date]
- Concepts processed: N
- Groups created: N

## Next Steps
1. [recommendation 1]
2. [recommendation 2]
```

## Usage

- `/status` - Show full status report
- `/status [function-number]` - Show status with focus on specific function
