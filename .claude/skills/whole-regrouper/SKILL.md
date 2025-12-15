---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Use when: (1) Tái cấu trúc các nhóm khái niệm trong một chức năng,
  (2) Đặt tên mới cho các nhóm dựa trên phân tích nội dung,
  (3) Viết lại toàn bộ một CHỨC NĂNG với cấu trúc gom nhóm mới.
version: 1.0.0
---

# Whole Concept Regrouper

## Purpose
Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG để tạo cấu trúc logic và dễ hiểu hơn.

## Cấu trúc output

### Giữ nguyên
```
### **Tổng Quan**
[Nội dung tổng quan - KHÔNG thay đổi]
```

### Các nhóm mới (đặt tên dựa trên phân tích)
```
### **[Tên Nhóm 1 - Tên Tiếng Việt]**

#### **1. Concept A - Khái Niệm A**
[Nội dung]

#### **2. Concept B - Khái Niệm B**
[Nội dung]

### **[Tên Nhóm 2 - Tên Tiếng Việt]**

#### **3. Concept C - Khái Niệm C**
[Nội dung]
```

## Nguyên tắc gom nhóm

### Tiêu chí phân nhóm
1. **Chức năng tương tự**: Các khái niệm cùng phục vụ một mục đích
2. **Mức độ trừu tượng**: Nguyên lý cơ bản vs Ứng dụng cụ thể
3. **Nguồn gốc**: Truyền thống Đông phương vs Tây phương
4. **Phạm vi**: Cá nhân vs Tổ chức vs Xã hội

### Đặt tên nhóm
- Bilingual: English - Tiếng Việt
- Mô tả rõ nội dung chung của nhóm
- Ngắn gọn, dễ hiểu

## Workflow
1. Đọc toàn bộ CHỨC NĂNG hiện tại
2. Liệt kê tất cả khái niệm
3. Phân tích và phân loại theo tiêu chí
4. Đề xuất cấu trúc nhóm mới
5. Viết lại toàn bộ CHỨC NĂNG với cấu trúc mới
6. Đánh số lại khái niệm (1, 2, 3... liên tục)

## Lưu ý
- **Giữ nguyên nội dung**: Chỉ thay đổi cấu trúc nhóm, không thay đổi nội dung khái niệm
- **Giữ nguyên Tổng Quan**: Phần ### **Tổng Quan** không được thay đổi
- **Đánh số liên tục**: Sau khi gom nhóm, đánh số lại từ 1 đến N
