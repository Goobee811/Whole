---
name: whole-reviewer
description: |
  Post-editing validation tool for Whole documentation.
  Reviews changes for quality, consistency, and compliance with project standards.
  Use after editing to ensure all changes meet quality criteria.
version: 1.0.0
author: Bee
tags: [review, validation, quality-assurance, documentation]
---

# Whole Content Reviewer

## Purpose
Validate and review completed edits to Whole documentation, ensuring all changes meet quality standards, maintain structural integrity, and preserve the "only add, never subtract" philosophy.

## When to Use This Skill

Use whole-reviewer when:
- After completing edits with whole-editor
- Before committing changes to version control
- When validating content from external contributors
- During periodic quality audits
- After major restructuring or consolidation

## Review Protocol

### Phase 1: Change Verification
```
Verify what changed:
1. List all modified concepts
2. Identify new additions
3. Note any consolidations or moves
4. Check for any deletions (should be rare and justified)
5. Review cross-reference updates
```

### Phase 2: Quality Checks

#### 2.1 Structural Integrity
```
✓ All concepts have complete 4-point descriptions
  - Definition present and clear
  - Context properly explained
  - Application with concrete examples
  - Integration with cross-references

✓ Bilingual format maintained
  - Headings: ## English | Vietnamese
  - Description points properly formatted
  - Both languages present and aligned

✓ Hierarchy correctness
  - Proper heading levels (##, ###, ####)
  - Logical nesting
  - Consistent structure across concepts
```

#### 2.2 Content Quality
```
✓ Clarity
  - Concepts clearly explained
  - No ambiguous terminology
  - Examples are concrete and relevant

✓ Completeness
  - No placeholder text
  - All points sufficiently detailed
  - Integration section connects to other concepts

✓ Accuracy
  - Technical accuracy verified
  - Translations conceptually accurate
  - Cross-references point to correct locations

✓ Consistency
  - Terminology consistent with rest of document
  - Formatting matches established patterns
  - Tone and style appropriate
```

#### 2.3 Cross-Reference Validation
```
✓ Bidirectional integrity
  - Every reference has reciprocal link
  - Reference paths are accurate
  - No orphaned references

✓ Relevance
  - Cross-references add value
  - Connections are logical
  - Context notes are meaningful

✓ Coverage
  - Adequate number of references (2-15)
  - Mix of internal and external references
  - References to related concepts in other domains
```

#### 2.4 Duplicate Resolution Check
```
✓ Meaningful diversity preserved
  - Concepts with different contextual roles kept separate
  - Context notes explain different perspectives

✓ True redundancy eliminated
  - Identical content consolidated appropriately
  - All unique information preserved
  - References updated to new location

✓ Consolidation quality
  - Primary location is logical
  - "See also" redirects in place if needed
  - No information lost in merge
```

### Phase 3: Compliance Check

#### 3.1 "Only Add, Never Subtract" Philosophy
```
✓ No unjustified deletions
  - All removals explicitly approved
  - Deletions limited to true duplicates
  - Unique information preserved

✓ Expansion over replacement
  - Existing content enhanced, not replaced
  - Additional context added where helpful
  - Examples added to strengthen concepts
```

#### 3.2 Bilingual Standards
```
✓ Vietnamese authenticity
  - Cultural context respected
  - Appropriate terminology used
  - Natural Vietnamese expression

✓ English accessibility
  - Conceptually accurate translation
  - Internationally understandable
  - Technical precision maintained

✓ Alignment
  - Both languages convey same meaning
  - Format consistency maintained
```

## Review Output Format

```markdown
# Review Report: [Section Name]

## Overview
- **Reviewer**: whole-reviewer skill
- **Date**: [YYYY-MM-DD]
- **Scope**: [What was reviewed]
- **Changes Reviewed**: [Summary of edits made]

## Review Results

### ✅ Passed Checks ([X]/[Total])

#### Structural Integrity ✅
- All concepts have 4-point descriptions
- Bilingual format maintained throughout
- Heading hierarchy correct

#### Content Quality ✅
- Clear explanations with concrete examples
- Terminology consistent
- Translations accurate

#### Cross-References ✅
- Bidirectional integrity verified
- All references valid
- Appropriate coverage

#### Compliance ✅
- "Only add, never subtract" followed
- Bilingual standards met

### ⚠️ Issues Found

#### Critical Issues (Must Fix)
1. **[Issue Type]**: [Description]
   - **Location**: [Specific concept/line]
   - **Problem**: [What's wrong]
   - **Fix Required**: [How to fix]

#### Minor Issues (Should Fix)
1. **[Issue Type]**: [Description]
   - **Location**: [Specific concept]
   - **Suggestion**: [Recommended improvement]

#### Recommendations (Optional)
1. **[Enhancement]**: [How it would improve quality]

## Detailed Findings

### New Concepts Added ([N] total)
| Concept Name | Function | Status | Notes |
|--------------|----------|--------|-------|
| [Name] | [Function] | ✅/⚠️/❌ | [Any issues] |

### Modified Concepts ([N] total)
| Concept Name | Changes Made | Status | Notes |
|--------------|--------------|--------|-------|
| [Name] | [Summary] | ✅/⚠️/❌ | [Any issues] |

### Consolidated Concepts ([N] total)
| Original Concepts | New Location | Preservation | Status |
|-------------------|--------------|--------------|--------|
| [A, B] | [Domain > Function] | Complete/Partial | ✅/⚠️ |

### Cross-Reference Updates
- New references added: [number]
- References updated: [number]
- Bidirectional pairs verified: [number]
- Broken references found: [number]

## Quality Metrics

### Before → After Comparison
| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Total Concepts | [n] | [n] | +[n] |
| Complete Descriptions | [%] | [%] | +[%] |
| Cross-References | [n] | [n] | +[n] |
| Bidirectional Integrity | [%] | [%] | +[%] |

### Quality Score
- **Overall**: [X]/100
  - Structural: [X]/25
  - Content: [X]/25
  - References: [X]/25
  - Compliance: [X]/25

## Verdict

### ✅ APPROVED
All critical checks passed. Minor issues noted for future improvement.
Changes are ready for commit.

**OR**

### ⚠️ APPROVED WITH RESERVATIONS
Passed with minor issues that should be addressed soon.
Changes can be committed, but follow-up required.

**OR**

### ❌ REVISION REQUIRED
Critical issues must be fixed before approval.
See "Critical Issues" section above.

## Recommendations for Next Steps

1. [Immediate action if needed]
2. [Follow-up improvements]
3. [Future enhancements to consider]

## Reviewer Notes
[Any additional context, observations, or suggestions]
```

## Review Checklists

### Quick Review Checklist (5 minutes)
Use for minor edits or small sections:
- [ ] No deletions without justification
- [ ] All new concepts have 4 points
- [ ] Bilingual format maintained
- [ ] Cross-references appear valid
- [ ] No obvious errors or typos

### Standard Review Checklist (15 minutes)
Use for typical editing sessions:
- [ ] All "Quick Review" items
- [ ] 4-point descriptions complete and detailed
- [ ] Cross-references verified bidirectional
- [ ] Terminology consistent
- [ ] Examples concrete and relevant
- [ ] Translations conceptually accurate
- [ ] No orphaned references

### Comprehensive Review Checklist (30+ minutes)
Use for major changes or consolidations:
- [ ] All "Standard Review" items
- [ ] Deep verification of all cross-references
- [ ] Duplicate analysis thorough and justified
- [ ] All unique information preserved
- [ ] Distribution across functions balanced
- [ ] Integration with existing content seamless
- [ ] Quality metrics calculated and improved
- [ ] Comparison with before state documented

## Common Issues and Solutions

### Issue: Missing Description Points
```
Problem: Concept has only 2-3 of 4 required points
Solution: Request addition of missing points with suggestions
Severity: Critical
```

### Issue: Broken Cross-Reference
```
Problem: Reference points to non-existent concept
Solution: Either fix path or remove reference and add correct one
Severity: Critical
```

### Issue: Unidirectional Reference
```
Problem: Concept A references B, but B doesn't reference A
Solution: Add reciprocal reference in concept B
Severity: Medium
```

### Issue: Bilingual Format Inconsistency
```
Problem: Some headings don't follow ## English | Vietnamese pattern
Solution: Reformat to standard pattern
Severity: Medium
```

### Issue: Literal Translation
```
Problem: English translation is word-for-word, not conceptual
Solution: Revise translation for conceptual accuracy
Severity: Low-Medium
```

### Issue: Excessive References
```
Problem: Concept has >15 cross-references
Solution: Group references by category or remove less relevant ones
Severity: Low
```

### Issue: Unjustified Deletion
```
Problem: Content removed without explicit approval or preservation
Solution: Restore deleted content or document justification
Severity: Critical
```

## Validation Tools

### Automated Checks
```bash
# Run automated validation suite
python tools/validate-all.py [section-name]

# Individual validators
python tools/structure-validator.py
python tools/reference-validator.py
python tools/bilingual-validator.py
python tools/completeness-validator.py
```

### Manual Review Focus Areas

Since automated tools can't catch everything, focus manual review on:
1. **Conceptual accuracy** - Do explanations make sense?
2. **Translation quality** - Is English conceptually accurate?
3. **Example relevance** - Are examples concrete and helpful?
4. **Logical flow** - Do concepts build on each other logically?
5. **Integration depth** - Are connections meaningful?

## Integration with Other Skills

### Complete Workflow
```
1. whole-analyzer (before editing)
   ↓
2. whole-editor (make changes)
   ↓
3. whole-reviewer (validate changes) ← YOU ARE HERE
   ↓
4. Commit if approved, or return to step 2 if revision needed
```

### Feedback Loop
```
If reviewer finds issues:
1. Document findings in review report
2. Return to whole-editor with specific fix list
3. whole-editor makes corrections
4. whole-reviewer re-reviews
5. Iterate until approval
```

## Best Practices

### For Reviewers
1. **Be Thorough**: Don't rush, even for small changes
2. **Be Specific**: Point to exact locations of issues
3. **Be Constructive**: Suggest solutions, not just problems
4. **Be Consistent**: Apply same standards across all content
5. **Be Fair**: Appreciate good work while noting issues

### For Authors (receiving review)
1. **Read Carefully**: Understand all feedback
2. **Ask Questions**: Clarify unclear feedback
3. **Fix Systematically**: Address all critical issues
4. **Learn Patterns**: Note recurring issues to avoid
5. **Appreciate Thoroughness**: Review helps improve quality

## Quality Standards

A passing review should demonstrate:
- [ ] 100% of concepts have complete 4-point descriptions
- [ ] 100% bilingual format compliance
- [ ] >95% bidirectional reference integrity
- [ ] 0 unjustified deletions
- [ ] 0 broken references
- [ ] 0 critical structural issues
- [ ] Clear improvement in quality metrics from before state

## Example Usage

```
User: "Use whole-reviewer to validate the changes I just made to Foundations domain"

Reviewer: [Loads changed sections]
          [Runs all validation checks]
          [Generates comprehensive review report]
          [Returns verdict: Approved/Needs Revision]
          [Lists specific issues if any]
          [Provides improvement suggestions]

User: "Focus on the cross-reference validation for the new concepts"

Reviewer: [Deep dive into cross-references]
          [Verifies each bidirectional pair]
          [Checks for orphaned references]
          [Provides detailed reference health report]
```
