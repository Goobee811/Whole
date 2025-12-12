# Claude Code Configuration for Whole Project

This directory contains custom Agent Skills and configuration for working with the Whole knowledge architecture documentation using Claude Code.

## 📁 Structure

```
.claude/
├── CLAUDE.md                           # Project overview and context
├── settings.json                       # Claude Code settings
├── README.md                          # This file
└── skills/                            # Custom skills directory
    ├── whole-editor/                  # Main editing skill
    │   ├── SKILL.md                   # Skill definition
    │   ├── guidelines/
    │   │   ├── bilingual-rules.md     # Vietnamese-English guidelines
    │   │   ├── structure-preservation.md  # 4-point structure rules
    │   │   └── cross-reference.md     # Reference management
    │   └── tools/
    │       └── duplicate-checker.py   # Automated duplicate detection
    ├── whole-analyzer/                # Pre-editing analysis
    │   └── SKILL.md
    └── whole-reviewer/                # Post-editing validation
        └── SKILL.md
```

## 🎯 Available Skills

### 1. whole-editor
**Purpose**: Main editing skill for Whole documentation

**Use when**:
- Adding new concepts to domains
- Expanding existing descriptions
- Consolidating duplicate content
- Refining concept explanations
- Updating cross-references

**Core principles**:
- "Only add, never subtract"
- Maintain bilingual integrity
- Preserve structural 4-point descriptions
- Update cross-references bidirectionally

**Example usage**:
```
"Use whole-editor to expand the Dynamics > Operations function with concepts about feedback mechanisms"
```

### 2. whole-analyzer
**Purpose**: Pre-editing analysis and quality assessment

**Use when**:
- Starting work on a new section
- Planning major content additions
- Investigating structural issues
- Conducting quality reviews
- Finding duplicates systematically

**Provides**:
- Content inventory and statistics
- Duplicate detection and analysis
- Structural integrity checks
- Gap identification
- Distribution analysis across functions

**Example usage**:
```
"Use whole-analyzer to analyze the Foundations domain"
"Analyze Dynamics > Operations for duplicates and gaps"
```

### 3. whole-reviewer
**Purpose**: Post-editing validation and quality assurance

**Use when**:
- After completing edits
- Before committing changes
- Validating external contributions
- Periodic quality audits

**Validates**:
- Structural integrity (4-point descriptions)
- Bilingual format compliance
- Cross-reference bidirectionality
- Content quality and clarity
- Compliance with "only add" philosophy

**Example usage**:
```
"Use whole-reviewer to validate the changes made to Foundations"
"Review the new concepts added to Operations domain"
```

## 🔄 Recommended Workflow

### For Adding New Content
```
1. whole-analyzer → Analyze target section
2. whole-editor → Add/expand content based on analysis
3. whole-reviewer → Validate changes
4. Commit if approved
```

### For Consolidating Duplicates
```
1. whole-analyzer → Identify duplicates
2. whole-editor → Consolidate while preserving unique info
3. whole-reviewer → Verify consolidation quality
4. Commit if approved
```

### For Quality Improvement
```
1. whole-analyzer → Run comprehensive analysis
2. Prioritize findings
3. whole-editor → Address issues systematically
4. whole-reviewer → Verify improvements
5. Commit when quality standards met
```

## 📋 Key Project Standards

### Bilingual Format
All concepts must follow this format:
```markdown
## Concept Name | Tên Khái Niệm

**Definition | Định nghĩa**
English text | Vietnamese text

**Context | Ngữ cảnh**
English text | Vietnamese text

**Application | Ứng dụng**
English text | Vietnamese text

**Integration | Tích hợp**
English text | Vietnamese text
```

### Structural Requirements
- **10 Domains**: Foundations, Dynamics, Operations, Creation, Navigation, Integration, Validation, Amplification, Transcendence, Meta
- **5 Functions per Domain**: Understanding, Analysis, Synthesis, Application, Integration
- **4-Point Descriptions**: Every concept needs Definition, Context, Application, Integration
- **Cross-References**: Bidirectional links between related concepts

### Quality Standards
- ✅ Complete 4-point descriptions
- ✅ Bilingual content (Vietnamese primary, English secondary)
- ✅ Bidirectional cross-references
- ✅ Concrete examples in Application section
- ✅ No content deletion without approval
- ✅ 10-20 concepts per function (ideal distribution)

## 🛠️ Tools Available

### duplicate-checker.py
Automated tool to find duplicate and similar concepts across all documentation.

**Usage**:
```bash
cd .claude/skills/whole-editor/tools
python duplicate-checker.py
```

**Output**:
- List of exact duplicate concepts
- Similar concepts (>70% word overlap)
- Recommendations for consolidation

### Future Tools (Planned)
- `reference-validator.py` - Verify bidirectional cross-references
- `completeness-checker.py` - Check 4-point description completeness
- `stats-generator.py` - Generate quality metrics and reports

## 🚀 Getting Started

### First Time Setup
1. Open Claude Code in the Whole project directory
2. Claude will automatically detect `.claude/` configuration
3. Skills will be available for use

### Using Skills
```
# Activate a skill by name
"Use whole-analyzer to analyze [section]"
"Use whole-editor to expand [domain/function]"
"Use whole-reviewer to validate changes"

# Or use custom commands (defined in CLAUDE.md)
/analyze [domain]
/edit [domain] [function]
/validate
```

### Tips
- Always run **whole-analyzer** before major edits
- Use **whole-editor** for all content changes
- Always validate with **whole-reviewer** before committing
- Run `duplicate-checker.py` periodically
- Commit incrementally after each validated section

## 📖 Documentation

### For Skill Details
- Read individual `SKILL.md` files in each skill directory
- Review guidelines in `whole-editor/guidelines/`
- Check `CLAUDE.md` for project-specific context

### For Guidelines
- **Bilingual Rules**: `.claude/skills/whole-editor/guidelines/bilingual-rules.md`
- **Structure Preservation**: `.claude/skills/whole-editor/guidelines/structure-preservation.md`
- **Cross-Reference Management**: `.claude/skills/whole-editor/guidelines/cross-reference.md`

## ⚙️ Configuration

### settings.json
Current configuration:
- Model: `claude-sonnet-4-5-20250929`
- Skills enabled: Yes
- Skills path: `.claude/skills`
- Permissions: Read/Write allowed

To modify configuration, edit `.claude/settings.json`

## 🤝 Contributing

When adding new skills or tools:
1. Create skill directory under `.claude/skills/`
2. Add `SKILL.md` with proper frontmatter
3. Include guidelines if needed
4. Add tools/scripts if applicable
5. Update this README
6. Test thoroughly before committing

## 📝 Philosophy

The Whole project follows these principles:
- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual First**: Maintain Vietnamese cultural authenticity with English accessibility
- **Systematic Completeness**: Every concept gets full 4-point treatment
- **Connected Knowledge**: Rich cross-referencing across domains
- **Quality Over Speed**: Thorough analysis and validation required

## 🔗 Related Files

- Main documentation: `../Whole.md`
- Project overview: `CLAUDE.md`
- Settings: `settings.json`

---

**Questions or Issues?**
- Review the skill documentation in individual `SKILL.md` files
- Check guidelines for specific rules
- Consult `CLAUDE.md` for project context
