# Git Hooks Templates

Pre-configured git hooks for Whole Knowledge Architecture project.

**⚠️ Important:** Git hooks in `.git/hooks/` are NOT version controlled. This directory provides templates that must be copied to `.git/hooks/` to activate.

---

## Quick Setup

### Windows (Git Bash / PowerShell)

```bash
# Copy pre-commit hook
cp .claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit

# Make executable (Git Bash)
chmod +x .git/hooks/pre-commit
```

### macOS / Linux

```bash
# Copy pre-commit hook
cp .claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit

# Make executable
chmod +x .git/hooks/pre-commit
```

### Verify Installation

```bash
# Check if hook exists and is executable
ls -l .git/hooks/pre-commit

# Test hook manually
.git/hooks/pre-commit
```

---

## Available Hooks

### pre-commit ✅

**Purpose:** Validates documentation consistency before commits

**What It Checks:**
- Version numbers (v2.0.0, v5.0.0, v1.0.0)
- Command references (all 9 commands)
- Project statistics (50/50, 2,072 concepts, 371 groups)
- File paths (all .claude/ files exist)
- Skill descriptions consistency
- Cross-reference validity

**Triggers:** Only when markdown files (.md, .markdown) are staged

**Performance:** ~5 seconds for 119 checks

**Bypass:** `git commit --no-verify` (not recommended)

---

## Installation Methods

### Method 1: Manual Copy (Recommended)

**Pros:** Simple, straightforward
**Cons:** Must repeat on each clone

```bash
cp .claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### Method 2: Symbolic Link

**Pros:** Auto-updates when template changes
**Cons:** Can break if .claude/ moved

```bash
# Windows (Git Bash)
ln -s ../../.claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit

# macOS / Linux
ln -s ../../.claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit
```

### Method 3: Git Config (Global Hooks Directory)

**Pros:** Applies to all repos
**Cons:** Affects ALL repositories (use carefully!)

```bash
# Set hooks directory for this repo only
git config core.hooksPath .claude/hooks/git-hooks

# To revert
git config --unset core.hooksPath
```

---

## Testing the Hook

### Test Without Committing

```bash
# Run hook directly
.git/hooks/pre-commit

# Should show:
# ✓ No documentation files changed, skipping consistency check
# (since no files are staged)
```

### Test With Staged Changes

```bash
# Make a small change to a doc file
echo "# Test" >> README.md

# Stage it
git add README.md

# Run hook
.git/hooks/pre-commit

# Should run full consistency check
```

### Test Commit

```bash
# Try a real commit
git commit -m "test: verify pre-commit hook"

# Should block if validation fails
# Or proceed if validation passes
```

---

## Hook Behavior

### Success Scenario

```
════════════════════════════════════════════════════════════════
 Running Pre-Commit Checks
════════════════════════════════════════════════════════════════

Documentation files changed:
  - README.md

Running documentation consistency checker...

══════════════════════════════════════════════════════════════════════
 Documentation Consistency Checker
══════════════════════════════════════════════════════════════════════
...
✓ ALL CHECKS PASSED
Documentation consistency: 100.0%

✓ Documentation consistency check PASSED
✓ Proceeding with commit...
```

**Result:** Commit proceeds normally

### Failure Scenario

```
════════════════════════════════════════════════════════════════
 Running Pre-Commit Checks
════════════════════════════════════════════════════════════════

Documentation files changed:
  - docs/skill-reference.md

Running documentation consistency checker...

══════════════════════════════════════════════════════════════════════
 Documentation Consistency Checker
══════════════════════════════════════════════════════════════════════
...
✗ Found 3 version inconsistencies:
  ...

════════════════════════════════════════════════════════════════
 ✗ COMMIT REJECTED
════════════════════════════════════════════════════════════════

Documentation consistency check FAILED!

Please fix the errors above before committing.
```

**Result:** Commit is blocked

### No Docs Changed

```
════════════════════════════════════════════════════════════════
 Running Pre-Commit Checks
════════════════════════════════════════════════════════════════

✓ No documentation files changed, skipping consistency check
```

**Result:** Commit proceeds immediately (fast path)

---

## Bypassing the Hook

**Emergency bypass:**
```bash
git commit --no-verify -m "Emergency: bypass validation"
git commit -n -m "Emergency: bypass validation"  # shorthand
```

**When to bypass:**
- ⚠️ Critical hotfix needed immediately
- ⚠️ Validation script itself has a bug
- ⚠️ Intentionally committing work-in-progress
- ⚠️ Expected values need updating (commit first, fix CONFIG second)

**⚠️ Warning:** Bypassing should be rare. Most "emergencies" can wait 5 seconds for validation.

---

## Troubleshooting

### Hook Not Running

**Problem:** Commits go through without running hook

**Solutions:**

1. **Check if file exists:**
   ```bash
   ls -la .git/hooks/pre-commit
   ```

2. **Check if executable:**
   ```bash
   # Should show -rwxr-xr-x (x = executable)
   ls -l .git/hooks/pre-commit

   # Make executable
   chmod +x .git/hooks/pre-commit
   ```

3. **Check file content:**
   ```bash
   head .git/hooks/pre-commit
   # Should show #!/bin/sh
   ```

### Hook Failing Incorrectly

**Problem:** Hook blocks valid commits

**Solutions:**

1. **Run manually to debug:**
   ```bash
   .git/hooks/pre-commit
   # Review error messages
   ```

2. **Check validator config:**
   ```bash
   # Edit expected values if needed
   node .claude/scripts/check-documentation-consistency.js --verbose
   ```

3. **Update CONFIG in script:**
   ```javascript
   // .claude/scripts/check-documentation-consistency.js
   const CONFIG = {
     versions: {
       'whole-regrouper': 'v6.0.0'  // Update here
     }
   };
   ```

### Node.js Not Found

**Problem:** Hook fails with "node: command not found"

**Solutions:**

1. **Check Node.js installation:**
   ```bash
   node --version  # Should show v14+
   which node      # Shows path
   ```

2. **Update PATH in hook:**
   ```bash
   # Add to top of .git/hooks/pre-commit
   export PATH="/usr/local/bin:$PATH"
   ```

3. **Use absolute path:**
   ```bash
   # Replace in hook:
   /usr/local/bin/node .claude/scripts/check-documentation-consistency.js
   ```

### Hook Running on Non-Doc Commits

**Problem:** Hook runs even when not changing docs (slows down commits)

**This is actually correct behavior!** The hook checks for staged markdown files first and skips quickly if none found. This is intentional.

**To disable completely:**
```bash
rm .git/hooks/pre-commit
```

---

## Updating Hooks

When hook templates are updated:

### Option 1: Manual Update

```bash
# Re-copy the updated template
cp .claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

### Option 2: If Using Symlink

```bash
# No action needed - symlink auto-updates
```

### Option 3: Check for Updates

```bash
# Compare versions
diff .git/hooks/pre-commit .claude/hooks/git-hooks/pre-commit
```

---

## Team Setup

**For new team members:**

1. **Clone repository:**
   ```bash
   git clone <repo-url>
   cd Whole
   ```

2. **Install hooks:**
   ```bash
   cp .claude/hooks/git-hooks/pre-commit .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```

3. **Verify setup:**
   ```bash
   .git/hooks/pre-commit
   # Should show "No documentation files changed"
   ```

**Add to onboarding documentation:**
- Include hook installation in setup guide
- Document bypass procedures
- Explain what hooks do and why

---

## Performance

**Current Metrics:**
- Hook execution (no docs): <1s (fast path)
- Hook execution (with docs): ~5s (validation)
- Validation checks: 119 total
- Success rate: >99%

**Optimization Tips:**
- Hook already optimized (skips when no docs changed)
- Validation script uses efficient regex patterns
- Only 11 files checked (not entire repo)

---

## Related Documentation

- **Consistency Checker:** `.claude/scripts/README.md`
- **Hook Documentation:** `.git/hooks/README.md`
- **Quality Assurance:** `.claude/workflows/quality-assurance.md`
- **Audit Report:** `plans/reports/docs-audit-260102-2030-consistency-check.md`

---

## Future Hooks

Planned additional hooks:

### commit-msg
- Validate commit message format
- Enforce conventional commits
- Check message length

### pre-push
- Run comprehensive test suite
- Validate build succeeds
- Check for sensitive data

### post-merge
- Update dependencies
- Rebuild indexes
- Run quick validation

---

**Last Updated:** 2026-01-02
**Version:** 1.0.0
**Maintainer:** Whole Project Team
