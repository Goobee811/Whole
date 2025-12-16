---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Một workflow hoàn chỉnh: Grep → Read → Analyze → Regroup → Edit → Commit & Push.
version: 2.0.0
---

# Whole Concept Regrouper - Skill Tái Cấu Trúc Khái Niệm

## Mục Đích

Phân tích sâu các khái niệm trong một CHỨC NĂNG và gom nhóm lại theo các chủ đề có ý nghĩa, thay thế các nhóm tạm thời hiện tại.

## Workflow (5 Bước - One-Shot)

### 1. 🔍 Grep - Tìm vị trí CHỨC NĂNG

```bash
# Tìm dòng bắt đầu của CHỨC NĂNG
grep "^## CHỨC NĂNG [số]:" Whole.md
```

### 2. 📖 Read - Đọc toàn bộ nội dung

```bash
# Đọc từ dòng X đến Y (dựa trên grep kết quả)
# Đọc đến trước dòng bắt đầu CHỨC NĂNG tiếp theo
```

### 3. 🧠 Analyze - Phân tích và đề xuất nhóm mới

**Phân tích:**
- Đọc kỹ tất cả khái niệm trong CHỨC NĂNG
- Nhận diện các chủ đề/pattern chung
- Gom các khái niệm có liên hệ mật thiết với nhau

**Tiêu chí gom nhóm:**
- Coherence (Mạch lạc): Các khái niệm trong cùng nhóm có liên hệ logic chặt chẽ
- Natural Thinking (Tự nhiên): Phù hợp với cách người dùng tư duy về chủ đề
- Balance (Cân bằng): Mỗi nhóm có 3-8 khái niệm (lý tưởng 5-6)
- Bilingual (Song ngữ): Tên nhóm phải có cả English và Tiếng Việt

**Output phân tích:**
```
📊 PHÂN TÍCH:
- Tổng số khái niệm: [N]
- Đề xuất số nhóm: [M]

📝 CẤU TRÚC MỚI:
1. ### **[Group 1 Name - Tên Nhóm 1]** ([X] khái niệm)
   - Concept A, B, C...

2. ### **[Group 2 Name - Tên Nhóm 2]** ([Y] khái niệm)
   - Concept D, E, F...
```

### 4. ✍️ Edit - Viết lại CHỨC NĂNG

**Cấu trúc:**

```markdown
## CHỨC NĂNG [số]: [TÊN] - [VIETNAMESE NAME]

### **Tổng Quan**

[GIỮ NGUYÊN NỘI DUNG HIỆN TẠI]

### **[Group 1 Name - Tên Nhóm 1]**

#### **1. Concept Name - Tên Khái Niệm**

[Giữ nguyên nội dung từ bản gốc]

- **Point 1**: ...
- **Point 2**: ...
- **Point 3**: ...
- **Point 4**: ...

→ **Liên kết:** ...

#### **2. Next Concept - Khái Niệm Tiếp**

...

### **[Group 2 Name - Tên Nhóm 2]**

#### **[số tiếp theo]. Another Concept - Khái Niệm Khác**

...
```

**QUY TẮC QUAN TRỌNG:**
- ✅ GIỮ NGUYÊN: Nội dung "### **Tổng Quan**" (cả tiêu đề và nội dung)
- ✅ GIỮ NGUYÊN: Nội dung mỗi khái niệm (definitions, bullet points, liên kết)
- ✅ ĐÁNH SỐ LẠI: Khái niệm theo thứ tự liên tục 1, 2, 3, 4... trong toàn CHỨC NĂNG
- ✅ TÊN MỚI: Các nhóm ### có tên mới dựa trên phân tích
- ✅ BILINGUAL: Tất cả tiêu đề phải có cả tiếng Anh và tiếng Việt

### 5. 🚀 Commit & Push

```bash
# Commit message format:
git commit -m "Regroup [DOMAIN] CHỨC NĂNG [số]: [new group structure]

- [N] concepts → [M] thematic groups
- Groups: [list group names]"

# Push to branch
git push -u origin claude/[session-id]
```

## Output Format (Minimal)

Trong quá trình thực hiện, chỉ output:

```
📍 [DOMAIN NAME] > CHỨC NĂNG [số]

🔍 Grep: Found at line [X]
📖 Read: [N] concepts
🧠 Analyze: [N] → [M] groups

📝 NHÓM MỚI:
1. [Group Name 1] ([X] concepts)
2. [Group Name 2] ([Y] concepts)
...

✍️ Writing...
✅ Done!
📦 Commit: [hash]
```

## Nguyên Tắc Nền Tảng

1. **NEVER DELETE** - Không bao giờ xóa khái niệm
2. **PRESERVE CONTENT** - Giữ nguyên 100% nội dung khái niệm
3. **REGROUP ONLY** - Chỉ thay đổi cách gom nhóm
4. **RENUMBER** - Đánh số lại liên tục 1, 2, 3...
5. **BILINGUAL** - Tất cả tiêu đề đều song ngữ

## Tips cho Việc Đặt Tên Nhóm

**Tốt:**
- "Foundational Axioms & Logic - Tiên Đề & Logic Nền Tảng"
- "Unity, Duality & Ultimate Reality - Thống Nhất, Nhị Nguyên & Thực Tại Tối Hậu"
- "Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây"

**Tránh:**
- Tên quá chung chung: "Các Khái Niệm Khác"
- Tên quá dài: "Các Nguyên Lý Cơ Bản Về Tư Duy Logic Và Toán Học Nền Tảng"
- Chỉ một ngôn ngữ: "Core Concepts" (thiếu tiếng Việt)

## Ví Dụ Thực Tế

**Input (Before):**
```
## CHỨC NĂNG 4: EASTERN & WESTERN WISDOM

### Tổng Quan
[...]

### Các Yếu Tố Nền Tảng
1. Stoicism
2. Socratic Wisdom
...
13. I and Thou

### Các Yếu Tố Bổ Sung
14. Taoism
15. Zen Buddhism
...
```

**Output (After):**
```
## CHỨC NĂNG 4: EASTERN & WESTERN WISDOM

### **Tổng Quan**
[GIỮ NGUYÊN]

### **Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
1. Stoicism
2. Socratic Wisdom
...
13. I and Thou

### **Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**
14. Taoism
15. Zen Buddhism
...
```

---

**Version History:**
- v2.0.0: Workflow đầy đủ, hướng dẫn chi tiết
- v1.2.0: One-shot minimal output
- v1.0.0: Initial version
