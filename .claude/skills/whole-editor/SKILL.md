---
name: whole-editor
description: |
  Specialized editor for Whole knowledge architecture - Vietnamese-English bilingual documentation.
  Use when: (1) Editing content in Whole docs, (2) Expanding domain/function concepts,
  (3) Adding new concepts with 4-point descriptions, (4) Updating cross-references,
  (5) Resolving duplicate concepts, (6) Maintaining bilingual format integrity.
version: 2.0.0
license: MIT
allowed-tools:
  - Edit
  - Grep
  - Read
metadata:
  author: "Whole Project"
  category: "documentation"
  updated: "2025-12-17"
---

# Whole Knowledge Architecture Editor

## Critical Rules

### 🚨 MANDATORY: Read Before Edit
**ALWAYS use Read tool on Whole.md BEFORE any Edit operation.**
Claude Code requires this. If you get "File has not been read yet" error:
1. Immediately run: `Read /home/user/Whole/Whole.md offset=X limit=Y`
2. Retry the Edit with exact old_string from Read output

## Core Principles
1. **Only Add, Never Subtract** - Never delete without explicit approval
2. **Bilingual Format** - Always use `## English | Tiếng Việt`
3. **4-Point Structure** - Definition, Context, Application, Integration
4. **Cross-Reference Integrity** - Bidirectional links required

## Quick Reference

### Format Requirements
- Headings: `## Concept Name | Tên Khái Niệm`
- 4 sections per concept (all required)
- Cross-refs: `Domain > Function > Concept`

### Editing Protocol
Load: `references/editing-protocol.md`

### Duplicate Resolution
Load: `references/duplicate-resolution.md`

### Bilingual Guidelines
Load: `references/bilingual-rules.md`

### Structure Validation
Load: `references/structure-validation.md`

## Workflow
1. **Read**: Load target section completely
2. **Analyze**: Check for gaps, duplicates, incomplete descriptions
3. **Propose**: Present changes with rationale
4. **Apply**: After approval, implement with cross-ref updates
5. **Verify**: Confirm all changes maintain structure integrity

## Never Do
- Delete content without approval
- Break cross-references
- Skip 4-point structure
- Translate literally without context
- Change structure without impact analysis
- Edit without Reading first
