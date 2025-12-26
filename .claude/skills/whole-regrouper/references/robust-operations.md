# Robust Operations - Xử Lý Vấn Đề Thường Gặp

Hướng dẫn xử lý các vấn đề kỹ thuật phát sinh khi chạy workflow regrouper.

---

## Vấn Đề 1: "File has not been read yet" Error

### Nguyên nhân gốc
- Edit tool yêu cầu file được Read **trong CÙNG context window**
- Session resume/compact làm invalidate previous reads
- Time gap hoặc output dài giữa Read và Edit

### Pattern An Toàn: Atomic File Operation

```
✅ ĐÚNG - Atomic operation (same turn):
Read(Whole.md, offset, limit) → Immediately Edit(Whole.md)

❌ SAI - Gap between operations:
Read(Whole.md) → [output dài] → Edit(Whole.md)  ← có thể fail
Read(Whole.md) → [session resume] → Edit(Whole.md)  ← CHẮC CHẮN fail
```

### Recovery Protocol

Khi gặp lỗi "File has not been read yet":

```markdown
1. Output: "Lỗi Edit - đang re-read và retry..."
2. Read(file_path, offset, limit) - NGAY LẬP TỨC
3. Edit(file_path, old_string, new_string) - CÙNG TURN với Read
4. If still fails: verify file_path và old_string chính xác
```

### Code Pattern

```markdown
## Edit Sequence (MANDATORY)

Step A: Read file
- Read /home/user/Whole/Whole.md offset=[start] limit=[lines]
- Output: "✓ Đọc Whole.md - [N] lines (lines [start]-[end])"

Step B: Apply edit IMMEDIATELY (no output between)
- Edit Whole.md với exact old_string từ Read output
- If error: goto Step A (re-read và retry)

Step C: Confirm
- Output: "✓ Đã edit Whole.md - [description]"
```

---

## Vấn Đề 2: Không Có Progress Feedback

### Nguyên nhân
- Không output status sau tool calls
- TodoWrite không được cập nhật real-time
- Long operations không có updates

### Pattern: Continuous Progress Output

**LUÔN output sau mỗi tool call:**

```markdown
| Tool | Output format |
|------|---------------|
| Grep | "✓ Grep: tìm thấy [N] matches tại line [X]" |
| Read | "✓ Read: [N] lines từ Whole.md (offset [X])" |
| Edit | "✓ Edit: đã sửa [description]" |
| Bash | "✓ Bash: [command] - [result summary]" |

Before long operation: "Đang [action]..."
After long operation: "✓ Hoàn thành [action]"
```

### TodoWrite Protocol

```markdown
## TodoWrite Updates

1. Initialize TẤT CẢ steps tại đầu workflow
2. Mark step in_progress TRƯỚC KHI bắt đầu step đó
3. Mark step completed NGAY SAU KHI hoàn thành
4. CHỈ MỘT step in_progress tại một thời điểm

## Mandatory Todos cho /regroup:
- [ ] Read CF[N] content
- [ ] Analyze and create groups
- [ ] Edit Whole.md
- [ ] Validate changes
- [ ] Commit and push
```

---

## Vấn Đề 3: Session Resume Không Tiếp Tục Task

### Nguyên nhân
- Session resume chỉ restore environment variables
- Previous tool calls (including Reads) bị invalidate
- Pending operations không được auto-resume

### Session Resume Protocol

```markdown
## Khi session resume:

1. CHECK TodoWrite state
   - Xác định task đang in_progress
   - Output: "Session resumed. Task hiện tại: [task name]"

2. RE-READ files (MANDATORY)
   - Previous reads đã invalid
   - PHẢI Read lại trước khi Edit
   - Output: "Re-reading Whole.md..."

3. CONTINUE from current step
   - Không restart từ đầu
   - Output: "Tiếp tục từ [step]..."
```

### Resume Handler

```markdown
## On Session Resume

1. Check TodoWrite for in_progress tasks
2. Output: "Session resumed. Task hiện tại: [task name]"
3. Re-read required files (previous reads invalid)
4. Continue from current step
```

---

## Vấn Đề 4: old_string Không Khớp

### Nguyên nhân
- Whitespace/indentation không exact match
- File đã thay đổi sau khi Read
- String xuất hiện nhiều lần

### Prevention

```markdown
## Copy old_string chính xác

1. Từ Read output, copy TOÀN BỘ text cần thay
2. Include surrounding context nếu cần unique
3. Preserve exact whitespace và line breaks
4. Verify không có hidden characters
```

### Recovery

```markdown
## Khi old_string not found:

1. Re-read file để xem current content
2. Copy exact string từ Read output (bao gồm whitespace)
3. If multiple matches: expand old_string với thêm context
4. Retry Edit
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│ EDIT FILE (Atomic Pattern)                              │
├─────────────────────────────────────────────────────────┤
│ Read → [immediate] → Edit → Output "✓ Done"            │
│ NO gaps, NO long output between Read and Edit           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PROGRESS FEEDBACK                                       │
├─────────────────────────────────────────────────────────┤
│ After Grep:  "✓ Grep: line [X]"                        │
│ After Read:  "✓ Read: [N] lines"                       │
│ After Edit:  "✓ Edit: [description]"                   │
│ Long task:   "Đang [action]..." → "✓ Hoàn thành"       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ SESSION RESUME                                          │
├─────────────────────────────────────────────────────────┤
│ 1. Check TodoWrite → find current task                  │
│ 2. Re-read files (previous reads INVALID)               │
│ 3. Output: "Resuming from [task]..."                   │
│ 4. Continue from current step                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ ERROR RECOVERY                                          │
├─────────────────────────────────────────────────────────┤
│ "File not read" → Re-read immediately → Retry Edit     │
│ "old_string not found" → Re-read → Copy exact → Retry  │
└─────────────────────────────────────────────────────────┘
```

---

## Checklist trước mỗi Edit Operation

```markdown
[ ] File đã được Read trong CÙNG turn này?
[ ] old_string copy chính xác từ Read output?
[ ] Không có output dài giữa Read và Edit?
[ ] TodoWrite đã mark step in_progress?
```

---

**Load this reference when:** Gặp lỗi tool hoặc session bị interrupt
