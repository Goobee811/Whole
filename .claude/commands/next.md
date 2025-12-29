---
description: Auto-detect and suggest the next function to work on
---

Analyze progress and determine the optimal next function to process.

## Detection Logic

1. **Load Progress Data**
   Read `.whole-progress.json` to get:
   - Completed functions list
   - Current in-progress function (if any)
   - Next suggested function

2. **Determine Next Function**

   Priority order:
   a. **In-progress first**: If a function is marked in-progress, suggest continuing it
   b. **Sequential next**: Use `nextSuggested` from progress file
   c. **Domain completion**: Prioritize completing a domain before starting new one
   d. **Lowest numbered**: Default to lowest uncompleted function number

3. **Gather Context**
   For the suggested function:
   - Grep to find function section
   - Count concepts
   - Check if any previous analysis exists

4. **Output Recommendation**

   ```markdown
   ## Next Function to Process

   **Recommended: CHỨC NĂNG [N]**
   - Domain: [Domain Name]
   - Function: [Function Name]
   - Concepts: ~[N] estimated

   ### Why This Function?
   [Explanation based on priority logic]

   ### Quick Start
   1. Run `/regroup [N]` to start
   2. Or `/analyze [N]` to preview first

   ### Progress Context
   - Domain completion: [N]/5 functions
   - Overall: [N]/50 functions ([%]%)
   ```

5. **Optional Auto-Start**
   If user provides `--start` argument:
   - Automatically invoke `/regroup [N]` with detected function
   - Skip confirmation step

## Usage

- `/next` - Show next recommended function
- `/next --start` - Auto-start regrouping next function
- `/next --analyze` - Auto-start with analysis first
