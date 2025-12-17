# Naming Guidelines - Hướng Dẫn Đặt Tên Nhóm

## Core Principles - Nguyên Tắc Cốt Lõi

Good group names should be:
1. **Descriptive** - Clearly indicate what's inside
2. **Concise** - Not too long (ideally 3-6 words per language)
3. **Thematic** - Reflect the unifying theme
4. **Bilingual** - Always include both English and Vietnamese
5. **Memorable** - Easy to recall and recognize

---

## Format Requirements - Yêu Cầu Định Dạng

### Standard Format
```markdown
### **[số]. [English Name] - [Tên Tiếng Việt]**
```

### Requirements
- ✅ Use `###` (3 hashes) for group headings
- ✅ Number groups sequentially within each CHỨC NĂNG (1, 2, 3...)
- ✅ Wrap entire name (including number) in `**bold**`
- ✅ English first, Vietnamese second
- ✅ Separate with ` - ` (space-dash-space)
- ✅ Capitalize appropriately in both languages

### Examples

**✅ CORRECT:**
```markdown
### **1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
### **2. Unity, Duality & Ultimate Reality - Thống Nhất, Nhị Nguyên & Thực Tại Tối Hậu**
### **3. Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**
```

**❌ INCORRECT:**
```markdown
### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
    (Missing group number)

### 1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây
    (Missing ** bold **)

### **1. Western Philosophical Foundations**
    (Missing Vietnamese)

### **1. Nền Tảng Triết Học Phương Tây**
    (Missing English)

## **1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
    (Wrong heading level - should be ### not ##)

### **1.Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
    (Missing space after number)

### **1. Western Philosophical Foundations-Nền Tảng Triết Học Phương Tây**
    (Missing spaces around dash)
```

---

## Naming Strategies - Chiến Lược Đặt Tên

### Strategy 1: Domain-Based Names
Name groups after the domain or field they represent.

**Best for:** Concepts from distinct disciplines or traditions

**Examples:**
- `### **1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**`
- `### **2. Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**`
- `### **3. Mathematical Foundations - Nền Tảng Toán Học**`
- `### **4. Scientific Methodologies - Phương Pháp Luận Khoa Học**`

### Strategy 2: Function-Based Names
Name groups after what the concepts DO or their purpose.

**Best for:** Concepts that serve similar functions

**Examples:**
- `### **1. Analytical Methods - Phương Pháp Phân Tích**`
- `### **2. Synthesis Techniques - Kỹ Thuật Tổng Hợp**`
- `### **3. Validation Frameworks - Khung Kiểm Chứng**`
- `### **4. Integration Patterns - Mẫu Hình Tích Hợp**`

### Strategy 3: Concept-Based Names
Name groups after the core concepts or themes they explore.

**Best for:** Concepts exploring related ideas

**Examples:**
- `### **1. Unity, Duality & Ultimate Reality - Thống Nhất, Nhị Nguyên & Thực Tại Tối Hậu**`
- `### **2. Change, Emergence & Complexity - Biến Đổi, Hiện Sinh & Phức Tạp**`
- `### **3. Truth, Knowledge & Belief - Chân Lý, Tri Thức & Niềm Tin**`
- `### **4. Being, Becoming & Existence - Hữu, Sinh Thành & Tồn Tại**`

### Strategy 4: Hybrid Names
Combine domain + function or concept + domain.

**Best for:** Nuanced groupings

**Examples:**
- `### **1. Foundational Axioms & Logic - Tiên Đề & Logic Nền Tảng**`
  (Concept + Domain)
- `### **2. Integrative Wisdom Practices - Thực Hành Tri Tuệ Tích Hợp**`
  (Function + Domain)
- `### **3. Dynamic Systems Analysis - Phân Tích Hệ Thống Động**`
  (Domain + Function)

---

## Good vs Bad Names - Tên Tốt vs Tên Tránh

### Category: Too Generic

**❌ BAD:**
```markdown
### **1. Core Concepts - Khái Niệm Cốt Lõi**
### **2. Other Elements - Các Yếu Tố Khác**
### **3. Miscellaneous - Linh Tinh**
### **4. Additional Topics - Chủ Đề Bổ Sung**
```

**✅ GOOD (specific and thematic):**
```markdown
### **1. Foundational Axioms & Logic - Tiên Đề & Logic Nền Tảng**
### **2. Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**
### **3. Dynamic Systems Analysis - Phân Tích Hệ Thống Động**
### **4. Integrative Synthesis Methods - Phương Pháp Tổng Hợp Tích Hợp**
```

**Why good wins:** User immediately knows what concepts to expect

---

### Category: Too Long

**❌ BAD:**
```markdown
### **Các Nguyên Lý Cơ Bản Về Tư Duy Logic Và Toán Học Nền Tảng Trong Khoa Học**
(24 words Vietnamese - way too long!)

### **The Fundamental Principles of Logical and Mathematical Reasoning in Scientific Contexts**
(12 words English - also too long!)
```

**✅ GOOD (concise but clear):**
```markdown
### **Foundational Logic & Mathematics - Logic & Toán Học Nền Tảng**
(4 words per language - perfect!)

### **Scientific Reasoning Principles - Nguyên Lý Lý Luận Khoa Học**
(3-4 words per language - ideal!)
```

**Why good wins:** Easy to scan, remember, and mentally process

---

### Category: Missing Bilingual

**❌ BAD:**
```markdown
### **Western Philosophy**
(Only English)

### **Triết Học Phương Tây**
(Only Vietnamese)

### **Western Philosophy (Triết Học Phương Tây)**
(Wrong format - should be dash not parentheses)
```

**✅ GOOD:**
```markdown
### **Western Philosophy - Triết Học Phương Tây**
```

**Why good wins:** Serves both English and Vietnamese readers equally

---

### Category: Inconsistent Style

**❌ BAD (mixing styles within same CHỨC NĂNG):**
```markdown
### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
(Long, descriptive)

### **Eastern Traditions - Phương Đông**
(Short, generic)

### **Modern Synthesis**
(Missing Vietnamese)
```

**✅ GOOD (consistent style):**
```markdown
### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
### **Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**
### **Integrative Wisdom Practices - Thực Hành Tri Tuệ Tích Hợp**
```

**Why good wins:** Consistent level of detail and formality

---

## Special Cases - Trường Hợp Đặc Biệt

### Case 1: "Tổng Quan" Group
**Rule:** ALWAYS preserve exactly as is
```markdown
### **Tổng Quan**
```
- ✅ No English translation needed
- ✅ No modification allowed
- ✅ Always first group after CHỨC NĂNG heading

### Case 2: Proper Nouns
When group names include proper nouns (e.g., philosophical schools, traditions):

**Keep original language names when appropriate:**
```markdown
✅ ### **Stoicism & Pragmatism - Chủ Nghĩa Khắc Kỷ & Thực Dụng**
    (Proper nouns Stoicism/Pragmatism kept in English)

✅ ### **Taoism & Zen Buddhism - Đạo Giáo & Thiền Tông**
    (Proper nouns kept, Vietnamese translations provided)
```

### Case 3: Ampersands (&) vs "and"/"và"
**Both acceptable, but be consistent within a CHỨC NĂNG:**

```markdown
✅ Option A (using &):
### **Unity & Duality - Thống Nhất & Nhị Nguyên**
### **Truth & Knowledge - Chân Lý & Tri Thức**

✅ Option B (using words):
### **Unity and Duality - Thống Nhất và Nhị Nguyên**
### **Truth and Knowledge - Chân Lý và Tri Thức**

❌ AVOID mixing:
### **Unity & Duality - Thống Nhất & Nhị Nguyên**
### **Truth and Knowledge - Chân Lý và Tri Thức**
(Inconsistent style)
```

---

## Translation Quality - Chất Lượng Dịch Thuật

### Principle: Conceptual Equivalence
Vietnamese translation should convey the SAME meaning, not just literal words.

**✅ GOOD (conceptual equivalence):**
```markdown
### **Contemplative Traditions - Truyền Thống Thiền Định**
("Contemplative" → "Thiền Định" captures the meditative essence)

### **Integrative Practices - Thực Hành Tích Hợp**
("Integrative" → "Tích Hợp" - correct conceptual match)
```

**❌ AVOID (literal but awkward):**
```markdown
### **Contemplative Traditions - Truyền Thống Suy Ngẫm**
("Contemplative" → "Suy Ngẫm" is too generic)

### **Integrative Practices - Thực Hành Tích Phân**
("Integrative" → "Tích Phân" is calculus term!)
```

### Principle: Cultural Appropriateness
Use Vietnamese terms that resonate with Vietnamese-speaking users.

**✅ GOOD:**
```markdown
### **Wisdom Traditions - Truyền Thống Tri Tuệ**
(Natural phrasing in Vietnamese)

### **Foundational Axioms - Tiên Đề Nền Tảng**
(Established Vietnamese philosophical term)
```

**⚠️ OK but not ideal:**
```markdown
### **Wisdom Traditions - Các Truyền Thống Về Trí Tuệ**
(Grammatically correct but wordy)
```

---

## Testing Your Names - Kiểm Tra Tên Nhóm

Before finalizing, ask yourself:

### 1. Descriptive Test
**Question:** If I only see the group name, can I predict what concepts are inside?
- ✅ YES → Good name
- ❌ NO → Too generic, needs to be more specific

### 2. Conciseness Test
**Question:** Can I read and understand the name in 2-3 seconds?
- ✅ YES → Good length
- ❌ NO → Too long, needs simplification

### 3. Consistency Test
**Question:** Do all group names in this CHỨC NĂNG follow the same style?
- ✅ YES → Consistent
- ❌ NO → Standardize style across all groups

### 4. Bilingual Quality Test
**Question:** Are both English and Vietnamese versions equally clear and natural?
- ✅ YES → Good translation
- ❌ NO → Improve weaker translation

### 5. Thematic Unity Test
**Question:** Does the name reflect a unifying theme that ties all concepts together?
- ✅ YES → Strong thematic name
- ❌ NO → Reconsider grouping or naming

---

## Quick Reference Checklist - Danh Sách Kiểm Tra Nhanh

When naming a new group:

- [ ] Format: `### **[số]. [English] - [Vietnamese]**`
- [ ] Groups numbered sequentially (1, 2, 3...)
- [ ] Length: 3-6 words per language (ideally)
- [ ] Both languages present and correct
- [ ] Descriptive, not generic
- [ ] Thematically represents all concepts in group
- [ ] Consistent style with other groups in CHỨC NĂNG
- [ ] Easy to remember and recognize
- [ ] Translation is conceptually equivalent, not just literal

---

**Load this reference when:** Creating new group names or evaluating existing names
