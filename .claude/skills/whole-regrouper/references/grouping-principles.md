# Grouping Principles - Nguyên Tắc Gom Nhóm

## Core Criteria - Tiêu Chí Cốt Lõi

### 1. Coherence (Mạch lạc)
Các khái niệm trong cùng nhóm có liên hệ logic chặt chẽ, chia sẻ:
- Cùng chủ đề hoặc domain con
- Cùng mục đích hoặc use case
- Quan hệ nhân quả hoặc tiền đề-kết luận

**Ví dụ:**
```
✅ TỐT: Gom "Stoicism", "Socratic Wisdom", "Existentialism"
        → "Western Philosophical Foundations"

❌ TRÁNH: Gom "Stoicism", "Taoism", "Design Thinking"
          → Không có sự liên hệ rõ ràng
```

### 2. Natural Thinking (Tự nhiên)
Phù hợp với cách người dùng tư duy về chủ đề:
- Người dùng mong đợi tìm những khái niệm này cùng nhau
- Nhóm phản ánh cấu trúc mental model tự nhiên
- Tên nhóm gợi nhớ ngay nội dung bên trong

**Ví dụ:**
```
✅ TỐT: "Unity, Duality & Ultimate Reality"
        → User tự nhiên nghĩ về những khái niệm này cùng nhau

❌ TRÁNH: "Miscellaneous Philosophical Concepts"
          → Tên không gợi nhớ gì cụ thể
```

### 3. Balance (Cân bằng)
Mỗi nhóm có số lượng khái niệm hợp lý:
- **Minimum**: 3 khái niệm (nếu ít hơn, nên gộp với nhóm khác)
- **Maximum**: 8 khái niệm (nếu nhiều hơn, nên tách thành 2 nhóm)
- **Ideal**: 5-6 khái niệm

**Hướng dẫn:**
```
Nếu một CHỨC NĂNG có 20 khái niệm:
- ✅ TỐT: 4 nhóm × 5 concepts = balanced
- ⚠️ OK: 3 nhóm (7, 7, 6 concepts) = acceptable
- ❌ TRÁNH: 2 nhóm (10, 10) = quá lớn
- ❌ TRÁNH: 10 nhóm (2 each) = quá nhỏ
```

### 4. Bilingual (Song ngữ)
Tất cả tên nhóm phải có cả English và Tiếng Việt:
- English trước, Vietnamese sau
- Ngăn cách bởi " - "
- Cả hai đều chính xác về mặt ngữ nghĩa

**Format:**
```markdown
### **[số]. [English Name] - [Tên Tiếng Việt]**
```

**Lưu ý:** Số nhóm (1, 2, 3...) chỉ áp dụng trong phạm vi mỗi CHỨC NĂNG (reset về 1 cho mỗi chức năng mới).

**Ví dụ:**
```
✅ TỐT: ### **1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
✅ TỐT: ### **2. Unity, Duality & Ultimate Reality - Thống Nhất, Nhị Nguyên & Thực Tại Tối Hậu**

❌ TRÁNH: ### **Western Philosophy - Triết Học Phương Tây** (thiếu số)
❌ TRÁNH: ### **1. Western Philosophy** (thiếu Vietnamese)
❌ TRÁNH: ### **1. Nền Tảng Triết Học** (thiếu English)
❌ TRÁNH: ### 1. Western Philosophical Foundations (thiếu ** và format)
```

## Additional Considerations - Các Yếu Tố Bổ Sung

### Thematic Unity - Thống Nhất Chủ Đề
- Nhóm nên có một "câu chuyện" hoặc thread xuyên suốt
- Khi giải thích nhóm, bạn có thể nói: "Những khái niệm này đều về..."

### Progressive Complexity - Độ Phức Tạp Tăng Dần
- Trong mỗi nhóm, sắp xếp từ cơ bản → nâng cao (nếu có thể)
- Khái niệm foundation trước, applications sau

### Cross-Reference Awareness - Nhận Thức Liên Kết Chéo
- Khái niệm có nhiều → **Liên kết:** nên ở vị trí chiến lược
- Cân nhắc đặt ở cuối nhóm để dễ tham chiếu

## Decision Framework - Khung Quyết Định

Khi phân vân giữa 2 cách gom nhóm:

1. **Hỏi:** Người dùng nào sẽ thấy grouping này hữu ích nhất?
   - Người mới bắt đầu → Ưu tiên clarity
   - Chuyên gia → Ưu tiên thematic depth

2. **Hỏi:** Grouping nào giúp người dùng tìm kiếm nhanh hơn?
   - Chọn cách gom theo user's mental model

3. **Hỏi:** Tên nhóm có mô tả chính xác nội dung không?
   - Nếu không → Cân nhắc regroup hoặc rename

## Examples - Ví Dụ Thực Tế

### Example 1: From Generic to Thematic

**Before (Generic):**
```
### Các Yếu Tố Nền Tảng
1. Stoicism
2. Socratic Wisdom
3. Taoism
4. Zen Buddhism
5. Existentialism
...
```

**After (Thematic):**
```
### **1. Western Philosophical Foundations - Nền Tảng Triết Học Phương Tây**
1. Stoicism
2. Socratic Wisdom
3. Existentialism

### **2. Eastern Contemplative Traditions - Truyền Thống Thiền Định Phương Đông**
4. Taoism
5. Zen Buddhism
```

### Example 2: Balancing Group Sizes

**Before (Imbalanced - 15 concepts in 2 groups):**
```
### Group A (10 concepts)
### Group B (5 concepts)
```

**After (Balanced - 15 concepts in 3 groups):**
```
### **1. Group A** (5 concepts)
### **2. Group B** (5 concepts)
### **3. Group C** (5 concepts)
```

---

**Load this reference when:** Analyzing concepts and deciding how to group them
