# Bilingual Knowledge Base Architecture: Best Practices Report

**Date:** 2025-12-29 | **Scope:** Bilingual KB architecture, documentation patterns, progressive disclosure, cross-reference management

---

## 1. BILINGUAL KNOWLEDGE BASE ARCHITECTURE

### Language Pairing Strategy
- **Primary Language**: Vietnamese (cultural authenticity, local expertise)
- **Secondary Language**: English (accessibility, international reach)
- **Storage Model**: Integrated bilingual within single source (Vietnamese + English in same file)
  - Reduces sync overhead
  - Ensures conceptual alignment
  - Simplifies versioning
- **Naming Convention**: Domain and function names bilingual at heading level (EN - VI format)

### Content Parity Requirements
- Every concept must have equivalent depth in both languages
- Translation ≠ word-for-word; preserve semantic precision
- Vietnamese primary = authority source for cultural context
- English secondary = bridge for international audiences
- Document decision criteria when languages diverge (rare cases)

### Metadata & Language Tags
- Use language codes in cross-references (e.g., `#concept-vi`, `#concept-en`)
- Bilingual indexes for search optimization
- Language fallback chains for partial translations

---

## 2. DOCUMENTATION ORGANIZATION FOR LARGE SYSTEMS

### Domain Hierarchy Pattern
```
10 Domains (conceptual pillars)
  ↓
5 Functions per Domain (operational workflows)
  ↓
N Concepts per Function (granular knowledge)
  ↓
4+ Description Points per Concept (depth requirement)
```

**Benefits:**
- Fixed domain structure = predictable navigation
- 50-function ceiling = manageable cognitive load
- 4-point minimum ensures completeness
- Scales to 500+ concepts without chaos

### File Organization
- **Monolithic Source of Truth**: Single Whole.md file avoids fragmentation
- **Indexed Access**: Grep + Read pattern instead of full-file loads
- **Symbolic Structure**: Clear heading hierarchy enables intelligent parsing
- **Version Control**: Git-friendly with section-based diffs

### Structural Integrity Preservation
- **Rule: Only Add, Never Subtract** (prevents accidental information loss)
- Automated validation of:
  - Continuous numbering (1,2,3... no gaps)
  - Heading level consistency (Domain=H1, Function=H2, Concept=H4)
  - Bilingual naming on all structural elements
  - Minimum 4-point content per concept

---

## 3. PROGRESSIVE DISCLOSURE IN DOCUMENTATION

### Layered Information Model
**Layer 1 (Overview)**: Tổng Quan - summary of all concepts in function
- Purpose: Quick reference, search index, topic list
- Length: 1 sentence per concept
- Audience: Browsers, quick-lookers

**Layer 2 (Concept Detail)**: Full 4+ point descriptions
- Purpose: Deep understanding, application patterns
- Length: Structured bullet points with explanations
- Audience: Learners, practitioners

**Layer 3 (Cross-references)**: Inter-concept connections
- Purpose: Show relationships, enable discovery
- Format: Bidirectional links (→ Liên kết:)
- Audience: Advanced users, knowledge integration

**Layer 4 (Context)**: Cultural/practical application notes
- Purpose: Real-world relevance, localization
- Optional, added as needed
- Audience: Practitioners in specific domains

### Disclosure Strategy
- Default view = Layer 1 (lightweight, fast)
- Click/expand = Layer 2 (full context)
- Layer 3-4 = On-demand discovery
- Reduces cognitive overload for new users
- Enables deep dives for advanced users

---

## 4. CROSS-REFERENCE MANAGEMENT

### Linking Architecture
- **Format**: `→ **Liên kết:** [Domain] / [Function] / [Concept]`
- **Bidirectional**: If A→B exists, B→A should exist
- **Automated Detection**: Scripts identify orphaned references
- **Type Taxonomy**:
  - **Vertical**: Concept A within domain → Concept B within same domain
  - **Horizontal**: Concept A in Domain X → Concept B in Domain Y
  - **Hierarchical**: Function → Sub-concepts → Related concepts

### Automation Patterns
1. **Pre-commit Validation**: Check reference integrity before saving
2. **Link Extraction**: Parse markdown links, generate reference graph
3. **Orphan Detection**: Find one-way links (A→B but not B→A)
4. **Redundancy Analysis**: Identify duplicate concepts across functions
5. **Cross-domain Mapping**: Visualize concept relationships across domains

### Tools & Scripts
```
- validate-regroup.js: Pre-commit validation (numbering, bilinguals, deletions)
- Reference graph generation (networkx-style DOT format)
- Orphan finder (one-way link detection)
- Duplicate concept analyzer (semantic similarity scoring)
```

---

## 5. MAINTAINABILITY & SCALABILITY PATTERNS

### Workflow Automation
- **Reconciliation Cycle**: Tổng Quan ↔ Content sync (v4.0.0)
  - Detects mismatches between overview layer and concept detail
  - Auto-suggests fixes with human approval
  - Prevents information drift

- **Progressive Completion**: Session tracking (X/50 functions)
  - `.whole-progress.json` tracks completion state
  - Auto-suggests next function in regrouping workflow
  - Enables incremental improvements

### Version Control Strategy
- **Single-source repository**: All changes in one PR/commit
- **Section-based diffs**: Git shows affected function/domain clearly
- **Atomic commits**: Complete functions only (no mid-function saves)
- **Tagged milestones**: Mark domain-completion achievements

### Scalability Limits & Solutions
| Challenge | Current | Solution | Scale |
|-----------|---------|----------|-------|
| File size | ~1MB | Monolithic + indexed access | 10,000 concepts |
| Sync complexity | Linear | Batch reconciliation cycles | Domains/Batch |
| Reference overhead | Manual validation | Automated scripts | Unlimited |
| Navigation chaos | Prevented by 50-function cap | Domain+Function hierarchy | 10x50 capacity |

---

## 6. KEY IMPLEMENTATION RECOMMENDATIONS

### For Bilingual Integrity
- ✓ Co-locate Vietnamese + English in single source
- ✓ Validate content parity in pre-commit hooks
- ✓ Primary language review (Vietnamese expert) before secondary

### For Knowledge Organization
- ✓ Enforce domain/function/concept/point hierarchy strictly
- ✓ Use numbered references (avoid human-dependent naming)
- ✓ Maintain git-friendly structure (section-based diffs)

### For Progressive Disclosure
- ✓ Layer Tổng Quan (overview) separately from concept details
- ✓ Reconciliation workflow catches layer mismatches
- ✓ Cross-references enable discovery-driven learning

### For Cross-Reference Management
- ✓ Implement pre-commit bidirectional validation
- ✓ Automated orphan detection on pull requests
- ✓ Quarterly redundancy analysis to consolidate duplicates

### For Automation
- ✓ Reconciliation cycle (sync overview ↔ detail)
- ✓ Session progress tracking with auto-suggests
- ✓ Batch validation scripts (numbering, bilinguals, structural integrity)

---

## UNRESOLVED QUESTIONS

1. **Semantic Search**: How to index bilingual concepts for cross-language search?
2. **Translation Divergence**: When Vietnamese + English meanings significantly differ, formalization rules?
3. **Concept Lifecycle**: Policy for deprecating outdated concepts without deletion?
4. **Multi-script Support**: Tones in Vietnamese; handling special characters in Git diffs?
5. **Scale Testing**: Performance benchmarks for 1K+ concepts in single monolithic file?

---

**Report compiled:** 2025-12-29 | **Status:** Research phase complete, ready for implementation planning
