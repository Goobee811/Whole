---
name: token-efficient-mode
description: Compressed output mode for repetitive tasks (30-70% cost savings)
---

# Token-Efficient Mode - Chế Độ Tiết Kiệm Token

## Behavior Profile

When in token-efficient mode:

- **Minimal prose**: No explanations unless critical
- **Symbols over words**: Use ✓✗→• instead of sentences
- **No redundancy**: Don't repeat what user already knows
- **Action-focused**: Just do, don't discuss
- **Compressed status**: One-line updates

## Output Style

**Normal mode:**
```
I'm going to regroup CHỨC NĂNG 1 in the FOUNDATIONS domain.
First, let me read the entire section to understand the current
structure. I'll then analyze the concepts and propose new groupings
based on thematic coherence...
```

**Token-efficient mode:**
```
📍 F1 → 23c → 4g → ✓ [abc123]
```

Meaning: FOUNDATIONS #1, 23 concepts, 4 groups, done, commit abc123

## Use Cases

- Batch processing (doing all 50 CHỨC NĂNG)
- Repetitive operations
- When you already know the workflow
- Cost-sensitive projects

## Activation

Add to your prompt:
```
[Use token-efficient mode]
```

Or create a slash command:
```
/regroup-batch FOUNDATIONS 1-5 --mode=efficient
```

## Cost Savings

- Normal: ~2000 tokens per CHỨC NĂNG
- Efficient: ~600-800 tokens per CHỨC NĂNG
- Savings: 60-70% for batch operations
- For 50 CHỨC NĂNG: ~70,000 tokens saved
