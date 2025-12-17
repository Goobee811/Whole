# Whole Knowledge Architecture - Project Overview

## What is Whole?

Whole is a comprehensive bilingual (Vietnamese-English) knowledge architecture documentation system. It organizes knowledge into a structured framework of domains, functions, and concepts.

## Structure

### 10 Domains

1. **FOUNDATIONS** - Epistemological and ontological basics
2. **DYNAMICS** - Systems thinking and emergence
3. **OPERATIONS** - Process and workflow management
4. **CREATION** - Innovation and design thinking
5. **NAVIGATION** - Decision making and pathfinding
6. **INTEGRATION** - Synthesis and connection
7. **VALIDATION** - Testing and verification
8. **AMPLIFICATION** - Scaling and growth
9. **TRANSCENDENCE** - Meta-cognition and evolution
10. **META** - Self-reference and documentation

### Functions per Domain

Each domain contains 5 functions:
- Understanding
- Analysis
- Synthesis
- Application
- Integration

**Total: 50 functions (10 domains x 5 functions)**

### Concept Structure

Each concept follows a 4-point structure:
1. **Definition** - What it is
2. **Context** - When/where it applies
3. **Application** - How to use it
4. **Integration** - How it connects to other concepts

## Bilingual Format

All content is bilingual:
- **Vietnamese**: Primary language, culturally authentic
- **English**: Secondary, conceptually precise

Header format: `#### **[num]. English Name - Ten Tieng Viet**`

## Core Principles

1. **Only Add, Never Subtract** - Content is sacred
2. **Bilingual Integrity** - Both languages always present
3. **Structural Compliance** - 4-point format required
4. **Cross-Reference Integrity** - Bidirectional links

## File Structure

```
Whole/
├── Whole.md              # Main documentation (>1MB)
├── .whole-progress.json  # Progress tracking
├── .claude/              # Claude Code integration
│   ├── skills/           # Specialized skills
│   ├── hooks/            # Automation hooks
│   ├── agents/           # Task agents
│   ├── commands/         # Slash commands
│   └── workflows/        # Process guides
└── docs/                 # Documentation
```

## Working with Whole.md

**IMPORTANT**: Whole.md is a large file (>1MB).

Always:
1. Use `grep` to find relevant sections first
2. Read with `offset/limit` parameters
3. Never load the entire file at once

## Getting Started

1. Check progress: `/status`
2. Find next task: `/next`
3. Analyze section: `/analyze [section]`
4. Edit content: `/edit [section]`
5. Regroup concepts: `/regroup [function-number]`
6. Validate changes: `/validate [section]`

## Progress Tracking

Progress is tracked in `.whole-progress.json`:
- Completed functions
- Current work in progress
- Session statistics
- Milestone achievements

Use `/report` for a comprehensive progress report.
