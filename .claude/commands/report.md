---
description: Generate a comprehensive progress report for Whole Knowledge Architecture
---

Generate a detailed progress report based on `.whole-progress.json` and git history.

## Report Sections

### 1. Executive Summary
- Overall completion percentage
- Time spent
- Quality metrics
- Key milestones achieved

### 2. Domain-by-Domain Progress

For each of the 10 domains:
```markdown
## [Domain N]: [Domain Name]

| Function | Status | Concepts | Groups | Date |
|----------|--------|----------|--------|------|
| CF1 | Done | 25 | 5 | 2025-12-16 |
| CF2 | Done | 30 | 6 | 2025-12-16 |
| CF3 | In Progress | - | - | - |
| CF4 | Pending | - | - | - |
| CF5 | Pending | - | - | - |

Progress: 2/5 functions (40%)
```

### 3. Statistics

| Metric | Value |
|--------|-------|
| Total functions completed | N |
| Total concepts processed | N |
| Total groups created | N |
| Average concepts/function | N |
| Average groups/function | N |
| Total editing time | N hours |
| Average time/function | N minutes |

### 4. Quality Metrics

- Validation pass rate: N%
- Content preservation: 100% (strict requirement)
- Bilingual compliance: N%
- Cross-reference integrity: N%

### 5. Timeline Analysis

```
Week 1: [N] functions completed
Week 2: [N] functions completed
...
Projected completion: [date]
```

### 6. Recommendations

1. **Immediate**: Next function to process
2. **Short-term**: Domain completion priority
3. **Quality**: Any areas needing review

## Output Format Options

- `/report` - Full markdown report
- `/report --summary` - Executive summary only
- `/report --export` - Export to `docs/progress-report-[date].md`

## Data Sources

1. `.whole-progress.json` - Primary progress data
2. Git log - Commit history for timeline
3. Whole.md - Source content for verification

## Usage

```bash
/report              # Full report to console
/report --summary    # Quick summary
/report --export     # Save to docs folder
```
