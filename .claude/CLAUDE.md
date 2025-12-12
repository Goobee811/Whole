# Whole Knowledge Architecture Editor

## Overview
Specialized Claude skills for editing and expanding the Whole bilingual knowledge architecture documentation.

## Core Philosophy
- **Only Add, Never Subtract**: Never delete existing content without explicit approval
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **Structural Preservation**: Maintain 10 domains, 5 functions each, 4-point descriptions

## Skills Available
- `whole-editor`: Main editing skill for content expansion
- `whole-analyzer`: Pre-editing analysis and duplicate detection
- `whole-reviewer`: Post-editing validation

## Workflows
- `.claude/workflows/editing-workflow.md`: Step-by-step editing process

## Document Structure
- **10 Domains**: Foundations, Dynamics, Operations, Creation, Navigation, Integration, Validation, Amplification, Transcendence, Meta
- **5 Functions per Domain**: Understanding, Analysis, Synthesis, Application, Integration
- **4-Point Descriptions**: Definition, Context, Application, Integration

## Content Guidelines

### Bilingual Requirements
- Vietnamese: Primary language, cultural authenticity
- English: Translation with conceptual precision
- Format: `## Concept Name | Tên Khái Niệm`

### Structural Integrity
- Each concept: 4-point description
- Cross-references: Maintain bidirectional links
- Functions per domain: 5 core functions
- NO deletion of existing content

### Duplicate Analysis
When evaluating duplicates:
1. **Meaningful Diversity** - Keep if concept serves different contextual roles
2. **True Redundancy** - Consolidate if identical across contexts
3. Decision factors: Primary function, natural user thinking patterns

## Editing Workflow
1. Read section completely
2. Analyze for improvements/duplicates
3. Propose changes with rationale
4. Apply after approval
5. Update cross-references

## Custom Commands
- `/analyze [section-path]` - Analyze section for issues
- `/edit [section-path]` - Start editing session
- `/expand [domain] [function] [topic]` - Add new concepts

## Style Preferences
- Formal yet accessible tone
- Comprehensive, complete coverage
- No partial deliverables
- Systematic, methodical approach

## Task Completion Protocol
After completing any task (commit/push done), you MUST:

1. Output summary of changes
2. Output this exact block:
```
═══════════════════════════════════════
🛑 END OF TASK - AWAITING NEW COMMAND
═══════════════════════════════════════
```
3. **STOP COMPLETELY** - No more tool calls, no analysis, no suggestions
4. **WAIT** for user's next command

**NEVER** after task completion:
- Start new tasks automatically
- Analyze additional files
- Suggest improvements
- Run any commands
