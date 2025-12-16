---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Use when: (1) Tái cấu trúc các nhóm khái niệm trong một chức năng,
  (2) Đặt tên mới cho các nhóm dựa trên phân tích nội dung,
  (3) Viết lại toàn bộ một CHỨC NĂNG với cấu trúc gom nhóm mới.
version: 1.2.0
---

# Whole Concept Regrouper

## Workflow (One-Shot)

1. Grep → Tìm vị trí CHỨC NĂNG
2. Read → Đọc toàn bộ nội dung
3. Analyze → Phân tích và gom nhóm
4. Edit → Viết lại với cấu trúc mới
5. Commit & Push

## Output Format (Ngắn gọn)

Chỉ output:
```
📍 [Domain] > CHỨC NĂNG [số]
📊 Khái niệm: [N] → [M] nhóm
📝 Đang viết lại...
✅ Done: [commit hash]
```

## Cấu trúc gom nhóm

### Giữ nguyên
```
### **Tổng Quan**
[KHÔNG thay đổi]
```

### Các nhóm mới
```
### **[Tên Nhóm - Tên Tiếng Việt]**

#### **1. Concept - Khái Niệm**
[Nội dung giữ nguyên]
```

## Nguyên tắc
- Giữ nguyên nội dung khái niệm
- Giữ nguyên Tổng Quan
- Đánh số liên tục 1, 2, 3...
- Tên nhóm bilingual
