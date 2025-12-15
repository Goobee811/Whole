---
description: Phân tích và gom nhóm lại khái niệm trong một CHỨC NĂNG
argument-hint: [domain] [function-number]
---

## Task
Phân tích và gom nhóm lại các khái niệm trong CHỨC NĂNG được chỉ định.

## Workflow
1. Activate `whole-regrouper` skill
2. Đọc toàn bộ CHỨC NĂNG hiện tại
3. Phân tích và đề xuất cấu trúc nhóm mới
4. Viết lại toàn bộ CHỨC NĂNG
5. Commit và push

## Input
<domain>$ARG1</domain>
<function>$ARG2</function>

## Output
Toàn bộ CHỨC NĂNG được viết lại với:
- ### **Tổng Quan** (giữ nguyên)
- ### **[Tên Nhóm Mới]** (dựa trên phân tích)
- Các khái niệm được đánh số lại liên tục
