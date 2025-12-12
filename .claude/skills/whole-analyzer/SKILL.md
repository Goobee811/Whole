---
name: whole-analyzer
description: |
  Pre-editing analysis for Whole documentation. Use when: (1) Starting new editing session,
  (2) Checking for duplicates across domains, (3) Analyzing section completeness,
  (4) Validating structure before bulk edits, (5) Generating analysis reports.
version: 1.0.0
---

# Whole Content Analyzer

## Purpose
Run comprehensive analysis on Whole documentation sections before editing begins.

## Analysis Types

### 1. Content Inventory
- Count concepts per section
- Identify incomplete 4-point descriptions
- Count cross-references

### 2. Duplicate Detection
- Exact matches across domains
- Similar concepts (>70% overlap)
- Classify: meaningful diversity vs redundancy

### 3. Structural Check
- Domain-function alignment
- Distribution across 5 functions
- Bilingual format compliance
- Cross-reference integrity

### 4. Gap Analysis
- Missing function categories
- Incomplete descriptions
- Weak integration points

## Output Format

```markdown
# Analysis Report: [Section]

## Summary
- Total Concepts: [N]
- Complete: [N] ([%])
- Cross-Refs: [N]
- Issues: [N]

## Findings

### Strengths
[List]

### Issues
[List with severity]

### Potential Duplicates
[Table: name, locations, similarity, classification]

## Recommendations
[Prioritized actions]
```
