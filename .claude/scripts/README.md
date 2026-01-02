# Claude Scripts Directory

Automation scripts for Whole Knowledge Architecture project.

## Available Scripts

### 📋 check-documentation-consistency.js

**Purpose:** Automatically validates consistency across all project documentation

**What It Checks:**
1. ✅ **Version Numbers** - All skill versions consistent (v2.1.0, v2.0.0, v5.0.0, v1.0.0)
2. ✅ **Command References** - All 9 commands properly documented
3. ✅ **Project Statistics** - 50/50 functions, 2,072 concepts, 371 groups, dates
4. ✅ **File Path References** - All `.claude/` paths valid and files exist
5. ✅ **Skill Descriptions** - Consistent descriptions across all docs
6. ✅ **Cross-References** - Internal documentation links valid

**Usage:**

```bash
# Basic check
node .claude/scripts/check-documentation-consistency.js

# Verbose output (show warnings)
node .claude/scripts/check-documentation-consistency.js --verbose
node .claude/scripts/check-documentation-consistency.js -v
```

**Exit Codes:**
- `0` - All checks passed ✅
- `1` - Validation errors found ❌
- `2` - Script execution error 💥

**Example Output:**

```
══════════════════════════════════════════════════════════════════════
 Documentation Consistency Checker
══════════════════════════════════════════════════════════════════════
Project: Whole Knowledge Architecture
Date: 2026-01-02
Files to check: 11

─── Check 1: Version Numbers
  ✓ All version numbers consistent (156 checks)

─── Check 2: Command References
  ✓ All command references complete (8 checks)

─── Check 3: Project Statistics
  ✓ All project statistics consistent (247 checks)

─── Check 4: File Path References
  ✓ All required files exist (28 checks)

─── Check 5: Skill Descriptions
  ✓ Skill descriptions consistent (52 checks)

─── Check 6: Cross-References
  ✓ All cross-references valid (34 checks)

══════════════════════════════════════════════════════════════════════
 Summary
══════════════════════════════════════════════════════════════════════
Total checks run: 525
Errors found: 0
Warnings: 0

✓ ALL CHECKS PASSED
Documentation consistency: 100.0%
```

**Integration with Git Hooks:**

To run automatically before commits, add to `.git/hooks/pre-commit`:

```bash
#!/bin/sh

# Run documentation consistency check
node .claude/scripts/check-documentation-consistency.js

# Capture exit code
EXIT_CODE=$?

if [ $EXIT_CODE -ne 0 ]; then
  echo ""
  echo "❌ Documentation consistency check failed!"
  echo "Please fix the errors above before committing."
  echo ""
  exit 1
fi

exit 0
```

Make it executable:
```bash
chmod +x .git/hooks/pre-commit
```

**When to Run:**

- ✅ Before committing documentation changes
- ✅ After updating skill versions
- ✅ After adding new commands
- ✅ Weekly as part of maintenance
- ✅ Before releasing new versions
- ✅ In CI/CD pipeline

**What It Catches:**

Based on real issues found in 2026-01-02 audit:
- ❌ Version mismatches (v5.1.0 vs v5.0.0)
- ❌ Missing commands in reference tables
- ❌ Incorrect version claims
- ❌ Broken file path references
- ❌ Inconsistent statistics
- ❌ Broken cross-reference links

**Configuration:**

Edit `CONFIG` object in the script to update:
- Expected skill versions
- Command list
- Project statistics
- Required file paths

```javascript
const CONFIG = {
  versions: {
    'whole-editor': 'v2.1.0',      // Updated 2026-01-02 (agent integration)
    'whole-analyzer': 'v2.1.0',    // Updated 2026-01-02 (agent integration)
    'whole-reviewer': 'v2.1.0',    // Updated 2026-01-02 (agent integration)
    'whole-regrouper': 'v5.0.0',
    'shared': 'v1.0.0',
    'hooks': 'v2.0.0',
    'agents': 'v2.1.0'             // Added 2026-01-02 (modernization)
  },
  // ...
};
```

---

## Future Scripts

Planned automation scripts:

### generate-changelog.js (Future)
- Auto-generate CHANGELOG.md from git history
- Track version upgrades
- Document breaking changes

### validate-whole-structure.js (Future)
- Validate Whole.md structure
- Check 4-point minimum per concept
- Verify bilingual headers
- Validate cross-references in content

### archive-old-plans.js (Future)
- Move plans older than 3 months to `plans/archive/`
- Keep documentation organized
- Maintain performance

---

## Development Guidelines

### Adding New Checks

1. Create check function:
```javascript
function checkNewFeature(docFiles, verbose) {
  subheader('Check N: New Feature');

  const errors = [];
  const warnings = [];
  let checksRun = 0;

  // Your validation logic here

  return { passed: errors.length === 0, errors, warnings, checksRun };
}
```

2. Add to `main()` function:
```javascript
results.push(checkNewFeature(CONFIG.docFiles, verbose));
```

3. Update documentation

### Testing Changes

```bash
# Test on current docs (should pass)
node .claude/scripts/check-documentation-consistency.js

# Introduce an error and verify detection
# Edit a doc file, change a version, run again
```

### Best Practices

- ✅ Keep checks fast (<5 seconds total)
- ✅ Provide clear error messages with file:line references
- ✅ Use colors for readability
- ✅ Separate errors (must fix) from warnings (should review)
- ✅ Return proper exit codes for CI/CD
- ✅ Make checks configurable via CONFIG object

---

## Troubleshooting

**Script won't run:**
```bash
# Ensure Node.js installed
node --version  # Should be v14+

# Make script executable (Unix)
chmod +x .claude/scripts/check-documentation-consistency.js
```

**False positives:**
- Update CONFIG to match new expected values
- Add exceptions for known historical values
- Review validation regex patterns

**Script runs slow:**
- Reduce number of files in CONFIG.docFiles
- Optimize regex patterns
- Add caching for repeated file reads

---

## Maintenance

**Monthly Tasks:**
- ✅ Update CONFIG.stats when metrics change
- ✅ Update CONFIG.versions when skills upgraded
- ✅ Add new files to CONFIG.requiredPaths
- ✅ Review and update validation patterns

**After Major Changes:**
- ✅ Update expected values in CONFIG
- ✅ Test script against new documentation
- ✅ Update this README with new checks

---

## Related Documentation

- [Development Rules](./../workflows/development-rules.md)
- [Quality Assurance](./../workflows/quality-assurance.md)
- [Documentation Audit Report](./../../plans/reports/docs-audit-260102-2030-consistency-check.md)

---

## Version History

### v1.1.0 (2026-01-02)
- Updated documentation to reflect v2.1.0 modernization
- Added agents v2.1.0 to version references
- Updated example CONFIG with current versions

### v1.0.0 (2026-01-02)
- Initial release
- Comprehensive documentation consistency checking
- Integration with git hooks

---

**Version:** 1.1.0
**Created:** 2026-01-02
**Last Updated:** 2026-01-02
**Maintainer:** Whole Project Team
**License:** Private
