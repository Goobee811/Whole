#!/usr/bin/env python3
"""
Duplicate Concept Checker for Whole Documentation
Analyzes markdown files to find potential duplicates across domains
"""

import re
from pathlib import Path
from typing import Dict, List, Set
from collections import defaultdict

def extract_concepts(markdown_file: Path) -> List[Dict[str, str]]:
    """Extract concept names and their domains/functions from markdown"""
    concepts = []
    content = markdown_file.read_text(encoding='utf-8')

    # Pattern: ## Concept Name | Tên Khái Niệm
    pattern = r'^##\s+(.+?)\s+\|\s+(.+?)$'

    for match in re.finditer(pattern, content, re.MULTILINE):
        english_name = match.group(1).strip()
        vietnamese_name = match.group(2).strip()

        concepts.append({
            'english': english_name,
            'vietnamese': vietnamese_name,
            'file': markdown_file.name
        })

    return concepts

def find_duplicates(docs_path: Path) -> Dict[str, List[Dict]]:
    """Find potential duplicate concepts across all markdown files"""

    all_concepts = defaultdict(list)

    # Scan all markdown files
    for md_file in docs_path.rglob('*.md'):
        concepts = extract_concepts(md_file)
        for concept in concepts:
            # Group by English name (case-insensitive)
            key = concept['english'].lower()
            all_concepts[key].append(concept)

    # Filter to only duplicates
    duplicates = {
        name: instances
        for name, instances in all_concepts.items()
        if len(instances) > 1
    }

    return duplicates

def analyze_similarity(concept1: str, concept2: str) -> float:
    """Calculate similarity score between two concept names"""
    # Simple word overlap similarity
    words1 = set(concept1.lower().split())
    words2 = set(concept2.lower().split())

    if not words1 or not words2:
        return 0.0

    intersection = words1.intersection(words2)
    union = words1.union(words2)

    return len(intersection) / len(union)

def find_similar_concepts(all_concepts: Dict[str, List[Dict]], threshold: float = 0.7) -> List[tuple]:
    """Find concepts with similar names (not exact duplicates)"""
    similar_pairs = []
    concept_names = list(all_concepts.keys())

    for i, name1 in enumerate(concept_names):
        for name2 in concept_names[i+1:]:
            similarity = analyze_similarity(name1, name2)
            if similarity >= threshold:
                similar_pairs.append((name1, name2, similarity))

    return sorted(similar_pairs, key=lambda x: x[2], reverse=True)

def main():
    # Try multiple possible paths for documentation
    possible_paths = [
        Path(__file__).parent.parent.parent.parent / 'docs' / 'Whole',
        Path(__file__).parent.parent.parent.parent / 'Whole',
        Path(__file__).parent.parent.parent.parent,
    ]

    docs_path = None
    for path in possible_paths:
        if path.exists():
            docs_path = path
            break

    if not docs_path:
        print(f"❌ Documentation path not found. Searched:")
        for path in possible_paths:
            print(f"   - {path}")
        return

    print(f"🔍 Scanning for duplicate concepts in: {docs_path}\n")

    duplicates = find_duplicates(docs_path)

    if not duplicates:
        print("✅ No exact duplicates found!")
    else:
        print(f"📊 Found {len(duplicates)} potential exact duplicates:\n")

        for name, instances in sorted(duplicates.items()):
            print(f"## {instances[0]['english']}")
            print(f"   Vietnamese: {instances[0]['vietnamese']}")
            print(f"   Appears in {len(instances)} files:")
            for instance in instances:
                print(f"   - {instance['file']}")
            print()

    # Also check for similar concepts
    print("\n🔍 Checking for similar (but not identical) concept names...\n")

    all_concepts = defaultdict(list)
    for md_file in docs_path.rglob('*.md'):
        concepts = extract_concepts(md_file)
        for concept in concepts:
            key = concept['english'].lower()
            all_concepts[key].append(concept)

    similar = find_similar_concepts(all_concepts, threshold=0.7)

    if similar:
        print(f"📊 Found {len(similar)} pairs of similar concepts:\n")
        for name1, name2, score in similar[:10]:  # Show top 10
            print(f"Similarity: {score:.2%}")
            print(f"  - {all_concepts[name1][0]['english']}")
            print(f"  - {all_concepts[name2][0]['english']}")
            print()
    else:
        print("✅ No similar concepts found!")

if __name__ == '__main__':
    main()
