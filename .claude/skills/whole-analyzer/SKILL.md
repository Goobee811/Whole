---
name: whole-analyzer
description: |
  Pre-editing analysis tool for Whole documentation.
  Identifies gaps, duplicates, and structural issues before editing begins.
  Use before making changes to understand current state and plan improvements.
version: 1.0.0
author: Bee
tags: [analysis, quality-check, documentation, planning]
---

# Whole Content Analyzer

## Purpose
Run comprehensive analysis on Whole documentation sections before editing.
Identifies issues and opportunities for improvement systematically.

## When to Use This Skill

Use whole-analyzer when:
- Starting work on a new domain or function
- Planning major content additions or restructuring
- Investigating reported issues or inconsistencies
- Conducting periodic quality reviews
- Before consolidating duplicate concepts

## Analysis Protocol

### 1. Content Inventory
```
Count and categorize:
- Total concepts in section
- Concepts with complete 4-point descriptions
- Concepts missing one or more points
- Cross-references (internal/external)
- Bilingual completeness
```

### 2. Duplicate Detection
```
Find potential duplicates:
- Exact matches across domains
- Similar concepts (>70% word overlap)
- Classify as:
  * Meaningful Diversity (different contextual roles)
  * True Redundancy (identical content)
- Analyze context to determine appropriate action
```

### 3. Structural Check
```
Verify:
- Domain-function alignment
- Even distribution across 5 functions
- Bilingual format compliance (## English | Vietnamese)
- 4-point description completeness
- Cross-reference integrity
- Heading hierarchy correctness
```

### 4. Gap Analysis
```
Identify:
- Missing function categories
- Incomplete concept descriptions
- Orphaned cross-references (pointing to non-existent concepts)
- Weak integration points
- Domains or functions with too few concepts
- Areas lacking concrete examples
```

### 5. Quality Assessment
```
Evaluate:
- Consistency of terminology
- Depth of explanations
- Clarity of examples
- Logical flow of concepts
- Balance between theoretical and practical content
```

## Output Format

```markdown
# Analysis Report: [Section Name]

## Executive Summary
- **Section**: [Domain > Function or entire domain]
- **Total Concepts**: [number]
- **Complete Descriptions**: [number] ([percentage]%)
- **Cross-References**: [number] internal, [number] external
- **Issues Found**: [number] critical, [number] minor

## Detailed Findings

### ✅ Strengths
1. [Specific strength with example]
2. [Another strength]

### ⚠️ Critical Issues
1. **[Issue Type]**: [Description]
   - **Location**: [Specific concept/section]
   - **Impact**: High/Medium/Low
   - **Recommendation**: [Specific action needed]

### 📋 Minor Issues
1. **[Issue Type]**: [Description]
   - **Impact**: Low
   - **Recommendation**: [Action when convenient]

### 🔍 Duplicate Analysis

#### Exact Duplicates
| Concept Name | Locations | Recommendation |
|--------------|-----------|----------------|
| [Name] | [List] | Keep/Consolidate |

#### Similar Concepts (70%+ similarity)
| Concept 1 | Concept 2 | Similarity | Analysis |
|-----------|-----------|------------|----------|
| [Name] | [Name] | [%] | [Keep/Review/Consolidate] |

### 📊 Distribution Analysis

#### Concepts per Function
| Function | Count | Status |
|----------|-------|--------|
| Understanding | [n] | ✅/⚠️/❌ |
| Analysis | [n] | ✅/⚠️/❌ |
| Synthesis | [n] | ✅/⚠️/❌ |
| Application | [n] | ✅/⚠️/❌ |
| Integration | [n] | ✅/⚠️/❌ |

Target: 10-20 concepts per function
- ✅ Within target range
- ⚠️ Slightly under/over (5-9 or 21-25)
- ❌ Significantly under/over (<5 or >25)

### 🔗 Cross-Reference Health

#### Reference Statistics
- Total references: [number]
- Bidirectional pairs: [number] ([percentage]%)
- Orphaned references: [number]
- Internal references: [number]
- External references: [number]

#### Broken References
1. [Concept Name]: References "[Non-existent Concept]"
2. [Another broken reference]

#### Missing Reciprocal References
1. [Concept A] → [Concept B] (but B doesn't reference A)

### 📝 Completeness Check

#### Missing Description Points
| Concept | Missing Points |
|---------|----------------|
| [Name] | Definition, Application |
| [Name] | Integration |

#### Bilingual Gaps
- Concepts with English-only content: [number]
- Concepts with Vietnamese-only content: [number]
- Format inconsistencies: [number]

### 💡 Opportunities for Improvement

1. **[Opportunity Area]**
   - Current state: [Description]
   - Potential: [What could be improved]
   - Effort: Low/Medium/High

## Recommendations (Prioritized)

### High Priority
1. **[Action]**: [Rationale and expected impact]
2. **[Action]**: [Rationale and expected impact]

### Medium Priority
1. **[Action]**: [Rationale]

### Low Priority (Future Enhancements)
1. **[Enhancement idea]**: [Potential benefit]

## Next Steps

1. [Immediate action]
2. [Secondary action]
3. [Follow-up action]
```

## Analysis Techniques

### Quantitative Analysis
```python
# Metrics to calculate
- Concept density (concepts per function)
- Completeness ratio (complete 4-point / total)
- Reference density (avg references per concept)
- Bidirectional integrity (bidirectional pairs / total references)
- Bilingual coverage (bilingual concepts / total)
```

### Qualitative Analysis
```
Assess:
- Conceptual coherence within functions
- Natural grouping of concepts
- Logical progression of ideas
- Depth vs breadth balance
- Accessibility for readers at different levels
```

### Comparative Analysis
```
Compare across:
- Different functions within same domain
- Same function across different domains
- Historical evolution (if version history available)
- Best practices from well-developed sections
```

## Common Patterns to Look For

### Good Patterns ✅
- Even distribution of concepts
- Rich cross-referencing
- Complete 4-point descriptions
- Consistent terminology
- Mix of foundational and advanced concepts
- Clear examples in Application sections

### Warning Patterns ⚠️
- Function with <5 concepts
- Concepts with <2 cross-references
- Missing description points
- Inconsistent bilingual formatting
- Redundant similar concepts
- Orphaned references

### Critical Issues ❌
- Empty functions
- Concepts with only Definition point
- Broken cross-reference chains
- Complete absence of examples
- Monolingual content
- Duplicate concepts with identical content

## Integration with Other Skills

### Before Editing (whole-editor)
1. Run whole-analyzer
2. Review analysis report
3. Plan editing approach based on findings
4. Prioritize changes
5. Begin editing with whole-editor skill

### After Editing (whole-reviewer)
1. Complete edits with whole-editor
2. Run whole-analyzer again
3. Compare before/after metrics
4. Use whole-reviewer for final validation
5. Document improvements made

## Automation Support

### Scripts Available
- `tools/duplicate-checker.py` - Automated duplicate detection
- `tools/reference-validator.py` - Cross-reference integrity check
- `tools/completeness-checker.py` - 4-point description validation
- `tools/stats-generator.py` - Generate quantitative metrics

### Usage
```bash
# Run full analysis suite
python tools/run-full-analysis.py [domain-name]

# Individual checks
python tools/duplicate-checker.py
python tools/reference-validator.py
python tools/completeness-checker.py
```

## Tips for Effective Analysis

1. **Start Broad, Then Narrow**: Begin with domain-level overview, then drill into functions
2. **Use Automation**: Run scripts first to catch obvious issues
3. **Document Context**: Note why duplicates might be meaningful vs redundant
4. **Be Systematic**: Follow the protocol consistently
5. **Stay Objective**: Report findings without bias
6. **Prioritize Impact**: Focus on issues affecting user experience most
7. **Suggest Solutions**: Don't just identify problems, propose fixes

## Example Usage

```
User: "Use whole-analyzer to analyze the Foundations domain"

Analyzer: [Runs complete analysis protocol]
         [Generates comprehensive report]
         [Highlights top 3 priorities]
         [Suggests next steps]

User: "Focus on the duplicate analysis for Dynamics > Operations"

Analyzer: [Deep dive into duplicates in that specific function]
         [Provides context for each duplicate pair]
         [Recommends keep vs consolidate with rationale]
```

## Quality Standards

An effective analysis should:
- [ ] Cover all 5 analysis areas (Inventory, Duplicates, Structure, Gaps, Quality)
- [ ] Provide specific, actionable recommendations
- [ ] Include quantitative metrics where applicable
- [ ] Prioritize findings by impact
- [ ] Suggest concrete next steps
- [ ] Be comprehensive yet concise
- [ ] Highlight both strengths and issues
