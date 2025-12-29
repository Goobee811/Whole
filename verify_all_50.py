# -*- coding: utf-8 -*-
"""
Verify all 50 functions have comprehensive overviews
"""
import re

file_path = r"C:\Claude Desktop\Whole\Whole.md"
output_file = r"C:\Claude Desktop\Whole\verification_report.txt"

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all CHỨC NĂNG sections
func_pattern = r'## CHỨC NĂNG \d+:.*'
func_matches = list(re.finditer(func_pattern, content))

output = []
output.append(f"Found {len(func_matches)} function sections\n")

# Check each function for comprehensive overview
functions_with_listing = 0
functions_without_listing = []

for i, match in enumerate(func_matches):
    func_header = match.group(0)
    func_start = match.start()

    # Find function end (next CHỨC NĂNG or end of file)
    if i < len(func_matches) - 1:
        func_end = func_matches[i + 1].start()
    else:
        func_end = len(content)

    func_text = content[func_start:func_end]

    # Check for comprehensive listing
    has_listing = 'Bao gồm' in func_text and 'khái niệm được tổ chức thành' in func_text and 'nhóm chủ đề:' in func_text

    if has_listing:
        # Extract numbers
        listing_match = re.search(r'Bao gồm (\d+) khái niệm được tổ chức thành (\d+) nhóm chủ đề:', func_text)
        if listing_match:
            concepts = listing_match.group(1)
            groups = listing_match.group(2)
            output.append(f"[OK] {func_header} ({groups} groups, {concepts} concepts)")
            functions_with_listing += 1
    else:
        output.append(f"[MISSING] {func_header}")
        functions_without_listing.append(func_header)

output.append(f"\n{'='*60}")
output.append(f"SUMMARY:")
output.append(f"  Functions with comprehensive overviews: {functions_with_listing}/{len(func_matches)}")
output.append(f"  Functions missing comprehensive overviews: {len(func_matches) - functions_with_listing}")

if functions_without_listing:
    output.append(f"\nFunctions missing comprehensive overviews:")
    for func in functions_without_listing:
        output.append(f"  - {func}")
else:
    output.append(f"\nSUCCESS: ALL {len(func_matches)} FUNCTIONS HAVE COMPREHENSIVE OVERVIEWS!")

# Write to file
with open(output_file, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print(f"Verification report written to: {output_file}")
print(f"Summary: {functions_with_listing}/{len(func_matches)} functions have comprehensive overviews")
