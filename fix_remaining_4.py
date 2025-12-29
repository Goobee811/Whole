# -*- coding: utf-8 -*-
"""
Fix the remaining 4 functions with special structure
"""
import re

file_path = r"C:\Claude Desktop\Whole\Whole.md"

# Define the 4 functions by their starting line numbers (1-indexed)
functions_to_fix = {
    'CREATION CF2': 11620,
    'CREATION CF4': None,  # Will find
    'NAVIGATION CF5': None,  # Will find
    'INTEGRATION CF5': None,  # Will find
}

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()
    lines = content.split('\n')

# Find line numbers for the other 3 functions
for i, line in enumerate(lines):
    if 'CHỨC NĂNG 4:' in line and 'PATTERN BREAKING' in line:
        functions_to_fix['CREATION CF4'] = i + 1
    elif 'CHỨC NĂNG 5:' in line and 'TEMPORAL RHYTHM' in line:
        functions_to_fix['NAVIGATION CF5'] = i + 1
    elif 'CHỨC NĂNG 5:' in line and 'COMMUNICATION' in line:
        functions_to_fix['INTEGRATION CF5'] = i + 1

print("Found functions at lines:")
for name, line_no in functions_to_fix.items():
    print(f"  {name}: line {line_no}")

# Process each function
for func_name, start_line in functions_to_fix.items():
    if start_line is None:
        print(f"\nSkipping {func_name}: not found")
        continue

    print(f"\nProcessing {func_name}...")

    # Find function end
    func_start = start_line - 1  # 0-indexed
    func_end = func_start + 1
    while func_end < len(lines):
        line = lines[func_end]
        if line.startswith('## CHỨC NĂNG') or re.match(r'^## \d+\.', line):
            break
        func_end += 1

    func_text = '\n'.join(lines[func_start:func_end])

    # Check if already has comprehensive listing
    if 'Bao gồm' in func_text and 'khái niệm được tổ chức thành' in func_text:
        print(f"  Already has listing, skipping")
        continue

    # Extract groups and concepts
    groups = []
    group_pattern = r'### \*\*(\d+)\.\s+(.+?)\s+-\s+(.+?)\*\*'
    group_matches = list(re.finditer(group_pattern, func_text))

    for gm in group_matches:
        group_num = gm.group(1)
        group_en = gm.group(2).strip()
        group_vn = gm.group(3).strip()

        # Find concepts in this group
        group_start_pos = gm.end()

        # Find next group
        next_group = re.search(r'\n### \*\*\d+\.', func_text[group_start_pos:])
        if next_group:
            group_end_pos = group_start_pos + next_group.start()
        else:
            group_end_pos = len(func_text)

        group_content = func_text[group_start_pos:group_end_pos]

        # Extract concept names
        concept_pattern = r'#### \*\*\d+\.\s+(.+?)\s+-'
        concepts = re.findall(concept_pattern, group_content)

        if concepts:
            groups.append({
                'num': group_num,
                'en': group_en,
                'vn': group_vn,
                'concepts': concepts
            })

    if not groups:
        print(f"  No groups found!")
        continue

    # Generate listing
    total_concepts = sum(len(g['concepts']) for g in groups)
    listing_lines = [
        f"\n\nBao gồm {total_concepts} khái niệm được tổ chức thành {len(groups)} nhóm chủ đề:",
        ""
    ]

    for g in groups:
        concept_list = ', '.join(g['concepts'])
        listing_lines.append(
            f"{g['num']}. **{g['en']}** ({len(g['concepts'])}): {g['vn']} - {concept_list}"
        )

    listing_text = '\n'.join(listing_lines)

    # Find and update Tổng Quan section
    tong_quan_pattern = r'(### \*\*Tổng Quan\*\*\n\n)(.*?)(\n\n+### \*\*\d+\.)'
    tong_quan_match = re.search(tong_quan_pattern, func_text, re.DOTALL)

    if tong_quan_match:
        tong_quan_header = tong_quan_match.group(1)
        existing_overview = tong_quan_match.group(2).strip()
        next_section = tong_quan_match.group(3)

        # Create new Tổng Quan
        new_tong_quan = f"{tong_quan_header}{existing_overview}{listing_text}\n\n---{next_section}"
        old_tong_quan = tong_quan_header + existing_overview + next_section

        # Replace in full content
        content = content.replace(old_tong_quan, new_tong_quan, 1)

        print(f"  Updated: {len(groups)} groups, {total_concepts} concepts")
    else:
        print(f"  Tổng Quan pattern didn't match!")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("\n[COMPLETE] Updated remaining functions!")
