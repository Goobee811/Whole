# -*- coding: utf-8 -*-
"""
Add Tổng Quan sections to 3 NAVIGATION functions
"""
import re

file_path = r"C:\Claude Desktop\Whole\Whole.md"

# Functions to add Tổng Quan (line numbers for function headers)
functions_to_add = [
    ('STRATEGIC WAYFINDING', 13993),
    ('MULTI-DIMENSIONAL PLANNING', 14749),
    ('RESOURCE & PRIORITY MANAGEMENT', 15386),
]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

updated_count = 0

for func_name, start_line in functions_to_add:
    print(f"\nProcessing {func_name} at line {start_line}...")

    # Find function by line number
    lines = content.split('\n')
    func_start = start_line - 1  # 0-indexed

    # Find function end
    func_end = func_start + 1
    while func_end < len(lines):
        line = lines[func_end]
        if line.startswith('## CHỨC NĂNG') or re.match(r'^## \d+\.', line):
            break
        func_end += 1

    func_text = '\n'.join(lines[func_start:func_end])

    # Check if already has Tổng Quan
    if '### **Tổng Quan**' in func_text or '### **Tổng quan**' in func_text:
        print(f"  Already has section, skipping")
        continue

    # Extract groups and concepts
    groups = []
    group_pattern = r'### \*\*(\d+)\.\s+(.+?)\s+-\s+(.+?)\*\*'
    group_matches = list(re.finditer(group_pattern, func_text))

    for gm in group_matches:
        group_num = gm.group(1)
        group_en = gm.group(2).strip()
        group_vn = gm.group(3).strip()

        # Find concepts
        group_start_pos = gm.end()
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

    # Generate comprehensive listing
    total_concepts = sum(len(g['concepts']) for g in groups)
    listing_lines = [
        f"Bao gồm {total_concepts} khái niệm được tổ chức thành {len(groups)} nhóm chủ đề:",
        ""
    ]

    for g in groups:
        concept_list = ', '.join(g['concepts'])
        listing_lines.append(
            f"{g['num']}. **{g['en']}** ({len(g['concepts'])}): {g['vn']} - {concept_list}"
        )

    listing_text = '\n'.join(listing_lines)

    # Find italic description and first group
    # Pattern: function header + italic description + first group
    italic_pattern = r'(## CHỨC NĂNG \d+:.*\n\n)(_.+?_\n\n)(### \*\*\d+\.)'
    italic_match = re.search(italic_pattern, func_text, re.DOTALL)

    if italic_match:
        func_header = italic_match.group(1)
        italic_desc = italic_match.group(2)
        first_group = italic_match.group(3)

        # Extract overview text from italic description
        overview_text = italic_desc.strip('_\n ')

        # Create new Tổng Quan section
        new_tong_quan = f"### **Tổng Quan**\n\n{overview_text}\n\n{listing_text}\n\n---\n\n"

        # Replace in content
        old_text = func_header + italic_desc + first_group
        new_text = func_header + italic_desc + new_tong_quan + first_group

        content = content.replace(old_text, new_text, 1)

        print(f"  Added overview: {len(groups)} groups, {total_concepts} concepts")
        updated_count += 1
    else:
        print(f"  Pattern didn't match!")

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n[COMPLETE] Added overview sections to {updated_count} functions!")
