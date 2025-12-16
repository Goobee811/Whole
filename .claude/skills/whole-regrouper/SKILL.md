---
name: whole-regrouper
description: |
  Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG của Whole.md.
  Use when: (1) Tái cấu trúc các nhóm khái niệm trong một chức năng,
  (2) Đặt tên mới cho các nhóm dựa trên phân tích nội dung,
  (3) Viết lại toàn bộ một CHỨC NĂNG với cấu trúc gom nhóm mới.
version: 1.1.0
---

# Whole Concept Regrouper

## Purpose
Phân tích và gom nhóm lại các khái niệm trong từng CHỨC NĂNG để tạo cấu trúc logic và dễ hiểu hơn.

## Workflow với Checkpoint (BẮT BUỘC)

### BƯỚC 1: TÌM VỊ TRÍ
```
📍 CHECKPOINT 1: TÌM VỊ TRÍ
- Grep để tìm CHỨC NĂNG trong Whole.md
- Output: Dòng bắt đầu và kết thúc của CHỨC NĂNG
```

### BƯỚC 2: ĐỌC NỘI DUNG
```
📍 CHECKPOINT 2: ĐỌC NỘI DUNG
- Đọc toàn bộ CHỨC NĂNG
- Output: Danh sách tất cả khái niệm hiện có (tên + số thứ tự)
```

### BƯỚC 3: ĐỀ XUẤT GOM NHÓM
```
📍 CHECKPOINT 3: ĐỀ XUẤT GOM NHÓM
- Phân tích và đề xuất cách gom nhóm
- Output: Bảng phân nhóm mới
  | Nhóm | Khái niệm thuộc nhóm |
  |------|---------------------|
  | [Tên Nhóm 1] | Concept A, Concept B |
  | [Tên Nhóm 2] | Concept C, Concept D |

⏸️ CHỜ USER XÁC NHẬN trước khi tiếp tục
```

### BƯỚC 4: VIẾT LẠI
```
📍 CHECKPOINT 4: VIẾT LẠI
- Sau khi user xác nhận, viết lại toàn bộ CHỨC NĂNG
- Output: Số lượng edit đã thực hiện
```

### BƯỚC 5: COMMIT & PUSH
```
📍 CHECKPOINT 5: COMMIT & PUSH
- Commit với message mô tả
- Push lên branch
- Output: Commit hash
```

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

## Lưu ý
- **Giữ nguyên nội dung**: Chỉ thay đổi cấu trúc nhóm, không thay đổi nội dung khái niệm
- **Giữ nguyên Tổng Quan**: Phần ### **Tổng Quan** không được thay đổi
- **Đánh số liên tục**: Sau khi gom nhóm, đánh số lại từ 1 đến N
- **CHỜ XÁC NHẬN**: Luôn chờ user xác nhận tại Checkpoint 3 trước khi viết lại
