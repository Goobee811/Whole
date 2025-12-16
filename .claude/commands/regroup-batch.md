---
description: Batch regroup multiple CHỨC NĂNG at once
argument-hint: [domain] [start-end OR all]
---

# Batch Regroup Command

## Usage

```bash
/regroup-batch FOUNDATIONS 1-5       # Regroup functions 1 through 5
/regroup-batch DYNAMICS all          # Regroup all 5 functions in DYNAMICS
/regroup-batch ALL all               # Regroup all 50 functions (careful!)
```

## Workflow

For each CHỨC NĂNG in range:
1. Activate `whole-regrouper` skill
2. Use `token-efficient-mode` for minimal output
3. Read → Analyze → Regroup → Edit
4. Commit after EACH function (safety)
5. Continue to next

## Output Format (Compressed)

```
[BATCH: FOUNDATIONS 1-5]

F1: 23c→4g ✓ [abc123]
F2: 19c→3g ✓ [def456]
F3: 27c→5g ✓ [ghi789]
F4: 31c→6g ✓ [jkl012]
F5: 22c→4g ✓ [mno345]

[5/5 DONE | 5 commits | ~15min]
```

Legend:
- `F1` = FOUNDATIONS CHỨC NĂNG 1
- `23c` = 23 concepts
- `4g` = 4 groups
- `✓` = completed
- `[abc123]` = commit hash

## Safety Features

- ✅ Commit after EACH function (not at the end)
- ✅ Stop on error (don't continue batch)
- ✅ Progress checkpoint every 5 functions
- ✅ Can resume from failure point

## Resume on Failure

If batch stops at function 3:

```
/regroup-batch FOUNDATIONS 3-5  # Resume from where it stopped
```

## Estimated Time

- Single CHỨC NĂNG: ~3-5 minutes
- 5 CHỨC NĂNG batch: ~15-25 minutes
- Full domain (5): ~15-25 minutes
- All 50 CHỨC NĂNG: ~2.5-4 hours

## Token Cost Estimate

With token-efficient mode:
- Per CHỨC NĂNG: ~600-800 tokens
- 5 CHỨC NĂNG: ~3,000-4,000 tokens
- 50 CHỨC NĂNG: ~30,000-40,000 tokens (vs ~100,000 normal mode)

## Example Usage

### Scenario 1: Single Domain
```
/regroup-batch FOUNDATIONS all
```

Output:
```
[BATCH: FOUNDATIONS 1-5]
F1: 23c→4g ✓ [abc123]
F2: 19c→3g ✓ [def456]
F3: 27c→5g ✓ [ghi789]
F4: 31c→6g ✓ [jkl012]
F5: 22c→4g ✓ [mno345]
[5/5 ✓]
```

### Scenario 2: Custom Range
```
/regroup-batch DYNAMICS 2-4
```

Output:
```
[BATCH: DYNAMICS 2-4]
D2: 18c→3g ✓ [pqr678]
D3: 25c→5g ✓ [stu901]
D4: 21c→4g ✓ [vwx234]
[3/3 ✓]
```

### Scenario 3: All 50 (Ultimate Batch)
```
/regroup-batch ALL all --confirm
```

Requires `--confirm` flag for safety.

Output:
```
[BATCH: ALL DOMAINS 1-50]

[FOUNDATIONS]
F1-F5: ✓✓✓✓✓ [5/5]

[DYNAMICS]
D1-D5: ✓✓✓✓✓ [10/10]

[OPERATIONS]
O1-O5: ✓✓✓✓✓ [15/15]

[CREATION]
C1-C5: ✓✓✓✓✓ [20/20]

[NAVIGATION]
N1-N5: ✓✓✓✓✓ [25/25]

[INTEGRATION]
I1-I5: ✓✓✓✓✓ [30/30]

[VALIDATION]
V1-V5: ✓✓✓✓✓ [35/35]

[AMPLIFICATION]
A1-A5: ✓✓✓✓✓ [40/40]

[TRANSCENDENCE]
T1-T5: ✓✓✓✓✓ [45/45]

[META]
M1-M5: ✓✓✓✓✓ [50/50]

[ALL COMPLETE | 50 commits | ~3.5h]
```

## Flags

- `--mode=efficient` - Use token-efficient mode (default for batch)
- `--mode=normal` - Use normal verbose mode
- `--checkpoint=N` - Save checkpoint every N functions (default: 5)
- `--confirm` - Required for "ALL all" operation
- `--dry-run` - Show what would be done without executing

## Implementation Note

Activate skill: `whole-regrouper`
Activate mode: `token-efficient-mode` (unless --mode=normal)
