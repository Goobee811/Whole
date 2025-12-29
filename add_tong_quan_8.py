# -*- coding: utf-8 -*-
"""
Add Tổng Quan sections to 8 functions that don't have them
"""
import re

file_path = r"C:\Claude Desktop\Whole\Whole.md"

# Functions that need Tổng Quan sections
functions_to_add = [
    'STRATEGIC WAYFINDING',
    'MULTI-DIMENSIONAL PLANNING',
    'RESOURCE & PRIORITY MANAGEMENT',
    'REALITY TESTING',
    'ERROR DETECTION',
    'FEEDBACK PROCESSING',
    'EXPERIMENTAL PROTOCOLS',
    'QUALITY ASSURANCE',
]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

updated_count = 0

for func_name in functions_to_add:
    print(f"\nProcessing {func_name}...")

    # Find the function
    func_pattern = rf'(## CHỨC NĂNG \d+:.*{func_name}.*?\n\n)(_.+?_\n\n)(### \*\*\d+\.)'
    func_match = re.search(func_pattern, content, re.DOTALL | re.IGNORECASE)

    if not func_match:
        print(f"  Pattern didn't match, trying without italic description...")
        # Try without italic description
        func_pattern = rf'(## CHỨC NĂNG \d+:.*{func_name}.*?\n\n)(### \*\*\d+\.)'
        func_match = re.search(func_pattern, content, re.IGNORECASE)

        if not func_match:
            print(f"  Not found!")
            continue

        func_header = func_match.group(1)
        first_group = func_match.group(2)
        italic_desc = ""
    else:
        func_header = func_match.group(1)
        italic_desc = func_match.group(2)
        first_group = func_match.group(3)

    # Extract function content to get groups and concepts
    # Find full function (from header to next function)
    func_start = content.find(func_header)
    func_end_pattern = r'\n## (?:CHỨC NĂNG|\d+\.)'
    next_func_match = re.search(func_end_pattern, content[func_start + len(func_header):])

    if next_func_match:
        func_end = func_start + len(func_header) + next_func_match.start()
    else:
        func_end = len(content)

    func_text = content[func_start:func_end]

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

    # Generate overview text based on italic description or function name
    if italic_desc:
        overview_text = italic_desc.strip('_\n ')
    else:
        # Generic overview based on function name
        overview_text = f"Các khái niệm và phương pháp liên quan đến {func_name.lower()}."

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

    # Create new Tổng Quan section
    new_tong_quan = f"### **Tổng Quan**\n\n{overview_text}\n\n{listing_text}\n\n---\n\n"

    # Replace in content
    if italic_desc:
        # Replace: header + italic_desc + first_group
        # With: header + italic_desc + tong_quan + first_group
        old_text = func_header + italic_desc + first_group
        new_text = func_header + italic_desc + new_tong_quan + first_group
    else:
        # Replace: header + first_group
        # With: header + tong_quan + first_group
        old_text = func_header + first_group
        new_text = func_header + new_tong_quan + first_group

    content = content.replace(old_text, new_text, 1)

    print(f"  Added overview: {len(groups)} groups, {total_concepts} concepts")
    updated_count += 1

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"\n[COMPLETE] Added overview sections to {updated_count} functions!")
