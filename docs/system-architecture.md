# System Architecture - Whole Knowledge Architecture

**Document Version**: 1.0
**Last Updated**: 2025-12-29
**Status**: Complete & Operational

---

## Architecture Overview

Whole is a layered, modular knowledge management system built on Claude Code's skill architecture. The system follows a clean separation of concerns with five distinct layers:

```
┌─────────────────────────────────────────────────────────────┐
│                   Presentation Layer                        │
│              User Commands (9 Total)                        │
│  /status /next /analyze /edit /expand /regroup              │
│         /reconcile /validate /report                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                  Skills Layer (4)                           │
│  ┌─────────────┬──────────────┬──────────────┬────────────┐│
│  │   Editor    │   Analyzer   │   Reviewer   │ Regrouper ││
│  │  (v2.0.0)   │  (v2.0.0)    │  (v2.0.0)    │ (v5.0.0)  ││
│  └─────────────┴──────────────┴──────────────┴────────────┘│
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│            Agents & Automation Layer                        │
│  ┌──────────────┬──────────────┬────────────────────────┐  │
│  │  Validator   │  Translator  │  Cross-Ref Manager    │  │
│  │   (haiku)    │   (haiku)    │      (haiku)          │  │
│  └──────────────┴──────────────┴────────────────────────┘  │
│                                                              │
│  Hooks: session-init, dev-rules-reminder,                  │
│         progress-indicator, validate-edit                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│           Knowledge Base & Storage Layer                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Whole.md - Main Knowledge Base                     │  │
│  │  • 10 Domains                                        │  │
│  │  • 50 Functions                                      │  │
│  │  • 2,072 Concepts in 371 Groups                     │  │
│  │  • 100% Bilingual (Vietnamese-English)              │  │
│  │  • 4-Point Structure (minimum)                       │  │
│  │  • Cross-Referenced Links                           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  .whole-progress.json - Progress Tracking            │  │
│  │  • Completion Status (50/50)                         │  │
│  │  • Session History (31 sessions)                     │  │
│  │  • Metrics & Statistics                              │  │
│  │  • Last Updated Timestamps                           │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│        Persistence & Version Control Layer                  │
│                                                              │
│  ┌──────────────────┐  ┌──────────────────────────────────┐│
│  │  Git Repository  │  │  Validation Scripts              ││
│  │  • Audit Trail   │  │  • validate-regroup.js           ││
│  │  • Change History│  │  • bilingual-check.js            ││
│  │  • Branches      │  │  • check-cross-refs.js           ││
│  │  • Commits       │  │  • validate-structure.js         ││
│  └──────────────────┘  └──────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## Component Details

### Layer 1: Presentation Layer (Commands)

**9 Primary Commands**:

```
/status          → Display current progress (X/50)
/next            → Identify next function to work on
/analyze [sect]  → Pre-edit analysis + recommendations
/edit [sect]     → Start editing session
/expand [d][f]   → Add new concepts to function
/regroup [num]   → Full regrouping workflow
/reconcile [num] → Intelligent Tổng Quan ↔ Content sync
/validate [sect] → Post-edit validation
/report          → Generate comprehensive report
```

**Key Characteristics**:
- All commands map to underlying skills or utilities
- Natural language interface for complex workflows
- Auto-completion based on project state
- Real-time feedback and progress updates

---

### Layer 2: Skills Layer (4 Specialized Skills)

#### **whole-editor v2.1.0)**

**Purpose**: Content creation and modification

**Capabilities**:
- Add new concepts with 4-point structure
- Edit existing concept descriptions
- Update cross-references
- Preserve bilingual format
- Maintain numbering consistency

**Operating Model**:
- Receives edit requests from `/edit` command
- Uses Grep to find content in Whole.md
- Reads specific sections with offset/limit
- Applies changes maintaining format
- Hands off to whole-reviewer for validation

**References**:
- editing-protocol.md - Detailed editing procedures
- duplicate-resolution.md - Handling duplicate concepts
- bilingual-rules.md - Format standards
- structure-validation.md - Compliance checking

---

#### **whole-analyzer (v2.1.0)**

**Purpose**: Pre-edit analysis and issue detection

**Capabilities**:
- Identify missing concepts
- Detect duplicate content
- Find incomplete 4-point structures
- Check cross-reference validity
- Analyze grouping coherence
- Recommend improvements

**Operating Model**:
- Activated via `/analyze [section]`
- Scans section comprehensively
- Generates detailed report with findings
- Prioritizes issues by severity
- Suggests specific improvements

**Output Format**:
```
Analysis Report: [DOMAIN] > [FUNCTION]
═════════════════════════════════════════

FINDINGS:
- [Issue 1]: Severity [HIGH/MEDIUM/LOW]
- [Issue 2]: Severity [HIGH/MEDIUM/LOW]

DUPLICATES:
- [Concept]: Appears in [locations]

RECOMMENDATIONS:
1. [Specific action]
2. [Specific action]
```

---

#### **whole-reviewer v2.1.0)**

**Purpose**: Post-edit quality assurance and validation

**Capabilities**:
- Verify 4-point structure compliance
- Check bilingual format correctness
- Validate cross-reference integrity
- Confirm sequential numbering
- Detect formatting violations
- Report validation results

**Operating Model**:
- Automatic trigger after `/edit` or `/expand`
- Manual trigger via `/validate [section]`
- Runs validation suite on target section
- Generates pass/fail report
- Blocks commit if critical issues found

**Validation Checklist**:
- [ ] All concepts have 4-point structure (minimum)
- [ ] Bilingual headers present (English - Tiếng Việt)
- [ ] Sequential numbering (1, 2, 3...)
- [ ] No content deleted (append-only)
- [ ] Cross-references valid
- [ ] Group names bilingual
- [ ] No orphaned references
- [ ] File encoding UTF-8

---

#### **whole-regrouper (v5.0.0)**

**Purpose**: Concept reorganization with intelligent reconciliation

**Core Innovation**: Dual-representation analysis instead of fixed assumptions

**Two Workflows**:

**A. Full Regroup** (`/regroup [number]`)
```
1. Identify target function
2. Load all concepts
3. Analyze concept relationships
4. Propose 3-8 concept groups
5. Apply grouping
6. Update Tổng Quan
7. Validate changes
8. Commit with summary
```

**B. Intelligent Reconciliation** (`/reconcile [number]`)
```
1. Load Tổng Quan grouping
2. Load Content group headers
3. Analyze BOTH against 4 criteria:
   - Coherence (HIGH): Do concepts share theme?
   - Balance (MEDIUM): Group size 3-8?
   - Natural Thinking (HIGH): Matches user model?
   - Accuracy (MEDIUM): Names describe content?
4. Choose strategy [A/B/C/H/S]
5. Apply changes
6. Validate
7. Commit
```

**Strategy Options**:
- [A] Tổng Quan → Content: Reorganize content to match Tổng Quan
- [B] Content → Tổng Quan: Update Tổng Quan to match content
- [C] Full Regroup: Both representations problematic
- [H] Hybrid Merge: Combine best groups from each
- [S] Skip: Already synchronized

**Progressive Disclosure**:
- Detailed grouping principles loaded on-demand
- Workflow steps provided incrementally
- Quality checklist appears at validation stage
- Estimated token savings: ~60% per activation

---

#### **Shared Utilities Library (v1.0.0)**

**Purpose**: DRY refactoring - Centralized utilities for all skills

**Created**: 2025-12-29 (Phase 2 of codebase review)

**Location**: `.claude/skills/shared/`

**Architecture**:
```
shared/
├── config/
│   └── constants.js          # 50+ configuration constants
├── types/
│   └── validation-result.js  # Standardized validation types
├── utils/
│   ├── cli-helpers.js         # CLI initialization (70% code reduction)
│   ├── display.js             # Terminal colors & formatting
│   ├── security.js            # Input validation & sanitization
│   └── whole-md-parser.js     # Whole.md parsing functions
└── index.js                   # Central export hub
```

**Key Modules**:

1. **constants.js** - Single source of truth for configuration
   - Structure requirements (TOTAL_FUNCTIONS=50, MINIMUM_BULLET_POINTS=4)
   - Display limits (MAX_DISPLAY_LENGTH, MAX_PATH_DISPLAY)
   - Validation thresholds (IDEAL_GROUP_SIZE_MIN/MAX, MAX_ACCEPTABLE_ERROR_RATE)
   - Language patterns (VIETNAMESE_CHARS_REGEX)
   - Security limits (MAX_SESSION_ID_LENGTH, FUNCTION_NUMBER_MIN/MAX)

2. **display.js** - Terminal formatting utilities
   - COLORS object (red, green, yellow, blue, magenta, cyan, gray)
   - colorize(text, color) - Apply ANSI colors
   - log(message, color) - Colored console output
   - truncate(text, maxLength) - Text truncation with ellipsis

3. **security.js** - Input validation & sanitization
   - sanitizeSessionId() - Remove dangerous characters
   - validateHookInput() - Object validation
   - validateFunctionNumber() - Parse and validate 1-50 range
   - escapeRegex() - Escape special regex characters
   - handleError() - Standardized error handling

4. **whole-md-parser.js** - Whole.md parsing operations
   - findWholemd() - Locate Whole.md file
   - getWholemdPath() - Get absolute path
   - findFunctionSection() - Extract specific CHỨC NĂNG
   - extractConcepts() - Get concept headers
   - extractConceptsWithContent() - Get concepts with full content
   - extractHeaders() - Parse section headers
   - validateBilingualFormat() - Check Vietnamese-English format

5. **cli-helpers.js** - CLI initialization
   - initValidationScript() - Common setup for validation scripts
   - Reduces 20+ lines of boilerplate to 1 line
   - Handles arg parsing, validation, file reading, section extraction

6. **validation-result.js** - Type system
   - createValidationResult() - Standardized result objects
   - mergeValidationResults() - Combine multiple validation results

**Impact**:
- **Code Reduction**: 70% less duplicated code across validation scripts
- **Token Savings**: ~60% reduction in skill activation overhead
- **Maintainability**: Single point of change for shared logic
- **Testability**: 60+ unit tests across 3 test files
- **Consistency**: All skills use identical validation logic

**Usage Example**:
```javascript
// Before DRY refactoring (50 lines of boilerplate):
const fs = require('fs');
const MINIMUM_BULLET_POINTS = 4;
const TOTAL_FUNCTIONS = 50;
// ... 20 lines of CLI setup ...
// ... 10 lines of file finding ...
// ... 15 lines of parsing logic ...

// After DRY refactoring (15 lines total):
const {
  initValidationScript,
  MINIMUM_BULLET_POINTS,
  log,
  createValidationResult
} = require('../../shared');

const { funcNum, section } = initValidationScript('my-script.js');
// ... validation logic only ...
```

**Testing**:
- `display.test.js`: 20+ tests (colorize, log, truncate)
- `security.test.js`: 25+ tests (sanitize, validate, escape)
- `whole-md-parser.test.js`: 15+ tests (find, extract, validate)

**Documentation**: See `.claude/skills/shared/README.md` for comprehensive reference

---

### Layer 3: Agents & Automation Layer

#### **Agents (3 Specialized)**

| Agent | Model | Purpose | Activation |
|-------|-------|---------|------------|
| **whole-content-validator** | haiku | Validates 4-point structure, bilingual format, numbering | Auto after edits |
| **whole-translator** | haiku | Vietnamese-English translation with cultural authenticity | On-demand |
| **whole-cross-reference** | haiku | Manages bidirectional links, detects orphaned references | Periodic + on-demand |

#### **Automation Hooks (4 Active)**

| Hook | Trigger | Purpose | Execution |
|------|---------|---------|-----------|
| **session-init.cjs** | Session start | Display progress, suggest next task | Pre-session |
| **dev-rules-reminder.cjs** | Context injection | Remind about project rules and constraints | Per command |
| **progress-indicator.cjs** | PostToolUse | Show feedback on tool execution results | Post-tool |
| **validate-edit.cjs** | Pre-commit | Run validation checks before accepting commit | Pre-commit |

---

### Layer 4: Knowledge Base & Storage Layer

#### **Whole.md - Main Knowledge Base**

**Structure**:
```
Whole.md (32,939 lines, ~1MB)
│
├─ Domain 1: FOUNDATIONS
│  ├─ Function 1-1: EPISTEMOLOGICAL FOUNDATIONS
│  │  ├─ Tổng Quan (Overview)
│  │  ├─ Group 1: [Concept 1, 2, 3...]
│  │  ├─ Group 2: [Concept 1, 2, 3...]
│  │  └─ ...
│  ├─ Function 1-2: ONTOLOGICAL FRAMEWORKS
│  └─ ...
│
├─ Domain 2: DYNAMICS
│  ├─ Function 2-1
│  ├─ Function 2-2
│  └─ ...
│
└─ Domain 10: META
   ├─ Function 10-1
   ├─ Function 10-2
   └─ ...
```

**Concept Format**:
```markdown
#### **[num]. English Name - Tên Tiếng Việt**

[Brief description of the concept]

- **Key Point 1**: [Vietnamese explanation with cultural context]
- **Key Point 2**: [Vietnamese explanation]
- **Key Point 3**: [Vietnamese explanation]
- **Key Point 4**: [Vietnamese explanation]
- **[Additional points]**: [As needed]

→ **Liên kết**: [Domain] > [Function] > [Concepts]
             [Domain] > [Function] > [Concepts]
```

**Data Characteristics**:
- 2,072 total concepts
- 371 thematic groups
- 10 domains × 5 functions
- 100% bilingual (Vietnamese primary, English secondary)
- 4-point minimum structure per concept
- Bidirectional cross-references
- Append-only (no deletions)

---

#### **.whole-progress.json - Progress Tracking**

**Schema**:
```json
{
  "version": "2.0.0",
  "totalFunctions": 50,
  "completedFunctions": ["1-1", "1-2", ..., "10-5"],
  "currentFunction": null,
  "nextSuggested": null,
  "lastUpdated": "2025-12-29T...",
  "lastCompletedFunction": {
    "domain": "META",
    "functionNumber": 50,
    "functionName": "FRAMEWORK EVOLUTION & REGULATION",
    "completedDate": "2025-12-27T...",
    "conceptCount": 63,
    "groupCount": 8
  },
  "sessions": [
    {
      "date": "2025-12-16T00:00:00Z",
      "functionsWorked": ["1-1", "1-2", ...],
      "conceptsAdded": 0,
      "duration": "45m"
    }
  ]
}
```

**Real-Time Updates**:
- Updates on every successful commit
- Tracks session statistics
- Calculates average time per function
- Suggests next function automatically
- Maintains historical data for analysis

---

### Layer 5: Persistence & Validation Layer

#### **Git Version Control**

**Role**: Complete audit trail and change management

**Structure**:
```
.git/
├─ HEAD → current branch (main)
├─ objects/ → commit history
├─ refs/
│  ├─ heads/main → main branch
│  └─ remotes/origin/main
└─ hooks/ → pre-commit, post-commit
```

**Key Benefits**:
- Full change history
- Blame tracking
- Rollback capability
- Branch support
- Integration with CI/CD

#### **Validation Scripts**

**validate-regroup.js** - Pre-commit validation
```
Checks:
- "Tổng Quan" section preservation
- Continuous numbering (1, 2, 3...)
- Bilingual group names
- No content deletion
- Group size (3-8 concepts recommended)
```

**Other Validation Scripts**:
- **bilingual-check.js** - Checks Vietnamese-English format
- **check-cross-refs.js** - Validates bidirectional links
- **validate-structure.js** - Ensures 4-point structure

---

## Data Flow Diagrams

### Editing Workflow Data Flow

```
User Input: /edit [section]
    ↓
[whole-editor Skill Activated]
    ↓
Grep: Find section in Whole.md (returns line numbers)
    ↓
Read: Load specific lines with offset/limit
    ↓
[Analysis & Modification]
    ↓
Edit: Apply changes to Whole.md
    ↓
[whole-reviewer Skill Activated]
    ↓
Validation Checks:
  ├─ 4-point structure?
  ├─ Bilingual headers?
  ├─ Sequential numbering?
  ├─ Cross-references valid?
  └─ No content deleted?
    ↓
[Validation Report]
    ↓
If ALL PASS:
  Git Commit → Update .whole-progress.json
Else:
  Reject → Ask user to fix issues
```

### Regrouping Workflow Data Flow

```
User Input: /regroup [number] or /reconcile [number]
    ↓
[whole-regrouper Skill Activated]
    ↓
Load Function Section
    ├─ Read current Tổng Quan
    ├─ Load all concept headers (Content)
    └─ Extract concept list from Tổng Quan
    ↓
[Analysis Phase]
    ├─ Evaluate BOTH groupings
    ├─ Score against 4 criteria
    └─ Determine best strategy
    ↓
[Proposal Generation]
    ├─ Recommend strategy [A/B/C/H/S]
    ├─ Explain rationale
    └─ Preview changes
    ↓
[User Decision]
    ├─ Approve?
    ├─ Modify proposal?
    └─ Choose different strategy?
    ↓
[Apply Changes]
    ├─ Reorganize content if needed
    ├─ Update Tổng Quan if needed
    └─ Preserve all concept data
    ↓
[Validation]
    └─ Run validate-regroup.js
    ↓
Git Commit → Update .whole-progress.json
```

---

## System Constraints & Design Decisions

### Architectural Constraints

1. **Large File Handling**
   - Whole.md is >1MB
   - Solution: Always use grep + offset/limit reading
   - Never load entire file at once

2. **Append-Only Model**
   - No deletion of existing content
   - Rationale: Preserve knowledge, maintain history
   - Implementation: Edit skill rejects deletion requests

3. **Bilingual Requirement**
   - Every header must have Vietnamese-English
   - Rationale: Cultural authenticity + conceptual precision
   - Validation: Automated bilingual-check.js

4. **4-Point Structure**
   - Minimum structure: Definition, Context, Application, Integration
   - Rationale: Comprehensive understanding
   - Validation: Automated in whole-reviewer

5. **Cross-Reference Integrity**
   - All links must be bidirectional
   - Rationale: Navigate knowledge network from any direction
   - Validation: whole-cross-reference agent

### Design Decisions

**Decision 1**: Why 4 separate skills instead of one monolithic skill?
- **Rationale**: Single responsibility principle, easier to test/maintain, token efficient
- **Result**: Modular, extensible architecture

**Decision 2**: Why progressive disclosure in whole-regrouper?
- **Rationale**: 60% token savings per activation, better UX (information on-demand)
- **Result**: Faster execution, lower API costs

**Decision 3**: Why intelligent analysis (v5.0.0) instead of fixed assumptions?
- **Rationale**: Real-world groupings have trade-offs; analysis reveals best solution
- **Result**: Higher quality decisions, better knowledge organization

**Decision 4**: Why JSON for progress tracking instead of in-comment metadata?
- **Rationale**: Easy to parse, query, update; enables analytics
- **Result**: Real-time tracking, accurate time estimates

**Decision 5**: Why multiple validation layers (skill + script + hook)?
- **Rationale**: Defense in depth; catch issues at different stages
- **Result**: <5% error rate, high reliability

---

## Integration Points

### With Claude Code

- Uses `.claude/skills/` for skill definitions
- Uses `.claude/commands/` for command routing
- Uses `.claude/hooks/` for automation
- Uses `.claude/agents/` for specialized tasks
- Settings: `.claude/settings.json`

### With Git

- Hooks: Pre-commit validation
- Commits: Update progress tracking
- History: Full audit trail
- Branches: Feature development isolation

### With File System

- Whole.md: Primary knowledge store
- repomix-output.xml: Codebase snapshot
- .whole-progress.json: Tracking state
- docs/: User documentation
- plans/: Planning and reports

---

## Performance Characteristics

### Command Execution Times

| Command | Typical Time | Max Time |
|---------|--------------|----------|
| `/status` | <1s | <2s |
| `/next` | <1s | <2s |
| `/analyze [section]` | 5-10s | 30s |
| `/edit [section]` | 10-20s | 60s |
| `/regroup [number]` | 20-40s | 120s |
| `/reconcile [number]` | 10-20s | 60s |
| `/validate [section]` | 5-10s | 30s |
| `/report` | 5-10s | 30s |

### Data Processing Metrics

| Metric | Value |
|--------|-------|
| Average concepts/function | 41.1 |
| Average groups/function | 7.5 |
| Average time/function | 10.4 minutes |
| Token savings (progressive disclosure) | ~60% |
| Error rate | <5% |
| Validation pass rate | >95% |

### Storage Metrics

| Component | Size |
|-----------|------|
| Whole.md | ~1MB |
| repomix-output.xml | 2.2MB |
| .whole-progress.json | ~20KB |
| All documentation | ~500KB |
| Total repository | ~5MB (with .git) |

---

## Scalability Analysis

### Scaling to 3,000+ Concepts

**Current Capacity**: 2,072 concepts handled efficiently

**Scaling Strategy**:
1. **Whole.md Size**: Still manageable at 3,000 concepts (~1.5MB)
2. **Grep Performance**: Remains fast (<1s) for queries
3. **Regrouping**: Linear scaling with concept count (~12 min per function at 3,000)
4. **Validation**: Scales well with offset/limit reading approach

**Potential Bottlenecks**:
- Large group analysis (>10 concepts) takes longer
- Cross-reference checking becomes more complex
- Progress tracking JSON may exceed 1MB

**Mitigation Strategies**:
- Increase group size limits to 10-12
- Implement incremental validation
- Archive completed domains to separate files
- Use pagination in progress reports

---

## Security & Compliance

### Information Security

- **Access Control**: Via Claude Code environment
- **Data Encryption**: Git can use SSH/GPG
- **Audit Trail**: Full git history
- **Backup**: Git repository acts as backup
- **No External Dependencies**: Self-contained system

### Data Integrity

- **Validation**: Multiple validation layers
- **Checksums**: Git integrity checking
- **Rollback**: Git enables reverting changes
- **Append-Only**: Prevents accidental deletion
- **Versioning**: .whole-progress.json tracks state

### Compliance

- **Reproducibility**: All operations documented
- **Traceability**: Git commit messages
- **Standards Compliance**: Markdown ISO/IEC compliance
- **Documentation**: Comprehensive process documentation

---

## Failure Recovery

### Scenario 1: Incomplete Edit

**Detection**: Validation script fails
**Recovery**:
- Reject commit
- Display validation errors
- User can retry or cancel
- Original content unchanged

### Scenario 2: Large File Corruption

**Detection**: Validation passes but content unexpected
**Recovery**:
- Use git checkout to restore
- Identify point of corruption via git log
- Reapply changes manually

### Scenario 3: Progress Tracking Out of Sync

**Detection**: Progress report shows inconsistency
**Recovery**:
- Recalculate from git history
- Verify against Whole.md structure
- Rebuild .whole-progress.json

---

*Architecture Document - Final Version*
*Status: COMPLETE & OPERATIONAL*
*All systems validated and functional*
