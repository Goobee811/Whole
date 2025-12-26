#!/usr/bin/env node

/**
 * Whole Regroup Session Init Hook
 *
 * Automatically:
 * - Reads .whole-progress.json
 * - Suggests next CHỨC NĂNG to regroup
 * - Displays progress stats
 * - Auto-activates whole-regrouper skill if working on Whole.md
 */

const fs = require('fs');
const path = require('path');

// Read progress tracker
const progressPath = path.join(process.cwd(), '.whole-progress.json');

if (!fs.existsSync(progressPath)) {
  console.log(`
⚠️  No progress tracker found. Run \`/regroup\` to start tracking.
  `);
  process.exit(0);
}

let progress;
try {
  progress = JSON.parse(fs.readFileSync(progressPath, 'utf8'));
} catch (err) {
  console.error('❌ Error reading .whole-progress.json:', err.message);
  process.exit(1);
}

// Display progress
// FIX: Use completedFunctions (array) not completed
const completedArr = progress.completedFunctions || progress.completed || [];
const completedCount = Array.isArray(completedArr) ? completedArr.length : 0;
const totalCount = progress.totalFunctions || 50;
const nextSuggested = progress.nextSuggested || 1;
const progressPercent = ((completedCount / totalCount) * 100).toFixed(1);

// Token-efficient output (no ASCII box art)
console.log(`[WHOLE-REGROUP] Progress: ${completedCount}/${totalCount} (${progressPercent}%)`);
console.log(`[NEXT] CF${nextSuggested} | Last: ${progress.lastUpdated || 'N/A'}`);

if (progress.statistics) {
  console.log(`[STATS] Avg concepts: ${progress.statistics.averageConceptsPerFunction || 'N/A'} | Avg groups: ${progress.statistics.averageGroupsPerFunction || 'N/A'}`);
}

if (progress.lastCompletedFunction) {
  const last = progress.lastCompletedFunction;
  console.log(`[LAST] CF${last.functionNumber} ${last.functionName} → ${last.groupCount} groups`);
}

console.log(`[HINT] /regroup (auto-CF${nextSuggested}) | /regroup [N] (specific)`);
if (progress.milestones?.nextMilestone) {
  console.log(`[MILESTONE] Next: ${progress.milestones.nextMilestone}`);
}

// Auto-activate skill if working on Whole.md
if (process.env.PWD?.includes('Whole')) {
  console.log('🔧 whole-regrouper skill available (auto-activated on /regroup)\n');
}
