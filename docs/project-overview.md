# Whole Knowledge Architecture - Project Overview

## What is Whole?

Whole is a comprehensive bilingual (Vietnamese-English) knowledge architecture documentation system. It organizes knowledge into a structured framework of domains, functions, and concepts.

## Project Status: COMPLETE

**50/50 functions completed (100%)**

- All 10 domains fully regrouped
- 2,072 concepts processed
- 371 thematic groups created
- Project duration: 12 days (2025-12-16 to 2025-12-27)

## Structure

### 10 Domains

| # | Domain | Description | Status |
|---|--------|-------------|--------|
| 1 | **FOUNDATIONS** | Epistemological & ontological basics | Complete |
| 2 | **DYNAMICS** | Systems thinking & emergence | Complete |
| 3 | **OPERATIONS** | Process & workflow management | Complete |
| 4 | **CREATION** | Innovation & design thinking | Complete |
| 5 | **NAVIGATION** | Decision making & pathfinding | Complete |
| 6 | **INTEGRATION** | Synthesis & connection | Complete |
| 7 | **VALIDATION** | Testing & verification | Complete |
| 8 | **AMPLIFICATION** | Scaling & growth | Complete |
| 9 | **TRANSCENDENCE** | Meta-cognition & evolution | Complete |
| 10 | **META** | Self-reference & documentation | Complete |

### Functions per Domain

Each domain contains **5 functions** with specific names. Examples:

**FOUNDATIONS**:
1. EPISTEMOLOGICAL FOUNDATIONS
2. ONTOLOGICAL FRAMEWORKS
3. METHODOLOGICAL PARADIGMS
4. AXIOLOGICAL PRINCIPLES
5. LOGICAL STRUCTURES

**DYNAMICS**:
1. SYSTEMIC PRINCIPLES
2. EMERGENT PHENOMENA
3. SYSTEM EVOLUTION PATTERNS
4. COGNITIVE FLEXIBILITY
5. EMOTIONAL INTELLIGENCE & ENERGY MANAGEMENT

**OPERATIONS**:
1. ANALYTICAL REASONING & LOGIC
2. STRUCTURED PROBLEM-SOLVING
3. SYSTEMATIC EXECUTION & PRACTICE
4. LEARNING & MEMORY SYSTEMS
5. DECISION FRAMEWORKS (GAME THEORY, CYNEFIN)

*(Each domain has its own unique function names)*

**Total: 50 functions (10 domains × 5 functions)**

### Concept Structure

Each concept follows a minimum 4-point structure:
1. **Definition** - What it is
2. **Context** - When/where it applies
3. **Application** - How to use it
4. **Integration** - How it connects to other concepts

*Note: Concepts may have more than 4 points if needed*

## Bilingual Format

All content is bilingual:
- **Vietnamese**: Primary language, culturally authentic
- **English**: Secondary, conceptually precise

Header format: `#### **[num]. English Name - Tên Tiếng Việt**`

## Core Principles

1. **Only Add, Never Subtract** - Content is sacred
2. **Bilingual Integrity** - Both languages always present
3. **Structural Compliance** - 4-point format required (minimum)
4. **Cross-Reference Integrity** - Bidirectional links

## File Structure

```
Whole/
├── Whole.md              # Main documentation (>1MB, ~50,000 lines)
├── .whole-progress.json  # Progress tracking
├── README.md             # Project README
├── .claude/              # Claude Code integration
│   ├── CLAUDE.md         # Project instructions
│   ├── skills/           # 4 specialized skills
│   ├── hooks/            # Automation hooks
│   ├── agents/           # 3 task agents
│   ├── commands/         # 8 slash commands
│   └── workflows/        # 4 process guides
└── docs/                 # Documentation
    ├── project-overview.md   # This file
    ├── skill-reference.md    # Skill documentation
    ├── workflow-guide.md     # Step-by-step guides
    └── troubleshooting.md    # Common issues
```

## Working with Whole.md

**IMPORTANT**: Whole.md is a large file (>1MB).

Always:
1. Use `grep` to find relevant sections first
2. Read with `offset/limit` parameters
3. Never load the entire file at once

```bash
# Good: Find section first
grep -n "CHỨC NĂNG 38" Whole.md

# Good: Read specific lines
Read Whole.md with offset=15000, limit=500

# Bad: Never do this
Read Whole.md (entire file)
```

## Getting Started

1. Check progress: `/status`
2. Find next task: `/next`
3. Analyze section: `/analyze [section]`
4. Edit content: `/edit [section]`
5. Regroup concepts: `/regroup [function-number]`
6. Validate changes: `/validate [section]`
7. Generate report: `/report`

## Progress Tracking

Progress is tracked in `.whole-progress.json`:
- Completed functions list
- Current work in progress
- Session statistics
- Milestone achievements
- Domain-level status

Use `/report` for a comprehensive progress report.

## Statistics

| Metric | Value |
|--------|-------|
| Total functions | 50 |
| Completed | 50 (100%) |
| Total domains | 10 |
| Total concepts | 2,072 |
| Total groups | 371 |
| Avg concepts/function | 41.1 |
| Avg groups/function | 7.5 |
| Total sessions | 31 |
| Project duration | 12 days |
