# Whole Document Editor

Claude Code skills for editing the Whole knowledge architecture documentation.

## Quick Start

1. Clone this repo
2. Open with Claude Code Desktop: `cd Whole && claude`
3. Use commands:
   - `/analyze Foundations > Understanding` - Analyze section
   - `/edit Dynamics > Analysis` - Edit section
   - `/expand Meta Integration "knowledge synthesis"` - Add concepts

## Skills

| Skill | Purpose |
|-------|---------|
| whole-editor | Main editing operations |
| whole-analyzer | Pre-edit analysis |
| whole-reviewer | Post-edit validation |

## Philosophy

- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **4-Point Structure**: Definition, Context, Application, Integration
- **Cross-Reference Integrity**: Bidirectional links always

## Document Structure

- 10 Domains × 5 Functions = 50 sections
- 4-point descriptions for each concept
- Cross-references across domains

## Project Structure

```
Whole/
├── .claude/
│   ├── skills/
│   │   ├── whole-editor/
│   │   │   ├── SKILL.md
│   │   │   └── references/
│   │   │       ├── editing-protocol.md
│   │   │       ├── duplicate-resolution.md
│   │   │       ├── bilingual-rules.md
│   │   │       └── structure-validation.md
│   │   ├── whole-analyzer/
│   │   │   └── SKILL.md
│   │   └── whole-reviewer/
│   │       └── SKILL.md
│   ├── commands/
│   │   ├── edit.md
│   │   ├── analyze.md
│   │   └── expand.md
│   ├── workflows/
│   │   └── editing-workflow.md
│   ├── CLAUDE.md
│   └── settings.json
├── docs/
├── plans/
├── Whole.md
├── README.md
└── .gitignore
```

## Workflow Example

```
User: /analyze Foundations > Understanding

Claude: [Activates whole-analyzer]
        [Generates analysis report]
        Found 45 concepts, 3 incomplete, 2 potential duplicates...

User: /edit Foundations > Understanding

Claude: [Activates whole-editor]
        Based on analysis, proposing:
        1. Complete 3 incomplete 4-point descriptions
        2. Consolidate "Basic Cognition" duplicates
        [Presents detailed proposal]

User: Approved

Claude: [Implements changes]
        [Activates whole-reviewer]
        [Validation passed]
        Summary: Added 12 points, consolidated 1 concept, updated 5 cross-refs
```
