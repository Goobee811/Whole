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
const completedCount = progress.completed?.length || 0;
const totalCount = progress.totalFunctions || 50;
const nextSuggested = progress.nextSuggested || 1;
const progressPercent = ((completedCount / totalCount) * 100).toFixed(1);

console.log(`
╔═══════════════════════════════════════════════════════════╗
║  🎯 WHOLE REGROUP PROGRESS                                ║
╠═══════════════════════════════════════════════════════════╣
║  Completed:     ${completedCount}/${totalCount} CHỨC NĂNGs (${progressPercent}%)                   ║
║  Next:          CHỨC NĂNG ${nextSuggested}                               ║
║  Last updated:  ${progress.lastUpdated || 'N/A'}              ║
╚═══════════════════════════════════════════════════════════╝

📊 Session Stats:
   - Avg concepts/function: ${progress.stats?.averageConceptsPerFunction || 'N/A'}
   - Avg groups/function:   ${progress.stats?.averageGroupsPerFunction || 'N/A'}
   - Total time:            ${progress.stats?.totalTimeMinutes || 'N/A'} min

${progress.lastCompletedFunction ? `
✅ Last completed:
   - Domain:   ${progress.lastCompletedFunction.domain}
   - Function: CF${progress.lastCompletedFunction.functionNumber} - ${progress.lastCompletedFunction.functionName}
   - Date:     ${progress.lastCompletedFunction.completedDate}
   - Groups:   ${progress.lastCompletedFunction.groupCount} thematic groups
   - Concepts: ${progress.lastCompletedFunction.conceptCount} total
` : ''}

💡 Quick Tips:
   - Use \`/regroup\` to auto-start next function (CF${nextSuggested})
   - Use \`/regroup [domain] [number]\` for specific function
   - Progress auto-tracked after each commit

🎯 Next Milestone: ${progress.milestones?.nextMilestone || '10 functions (20%)'}
`);

// Auto-activate skill if working on Whole.md
if (process.env.PWD?.includes('Whole')) {
  console.log('🔧 whole-regrouper skill available (auto-activated on /regroup)\n');
}
