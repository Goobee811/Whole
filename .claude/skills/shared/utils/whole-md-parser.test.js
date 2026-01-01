/**
 * Unit tests for Whole.md parser utilities
 *
 * Tests parsing and extraction functions.
 * Run with: node --test whole-md-parser.test.js
 */

const assert = require('assert');
const { describe, it } = require('node:test');
const {
  findFunctionSection,
  extractConcepts,
  validateBilingualFormat,
  extractHeaders
} = require('./whole-md-parser');

describe('Whole.md Parser Utilities', () => {
  describe('validateBilingualFormat', () => {
    it('should accept dash separator', () => {
      assert.strictEqual(validateBilingualFormat('English - Vietnamese'), true);
      assert.strictEqual(validateBilingualFormat('Test - Thử nghiệm'), true);
    });

    it('should accept pipe separator', () => {
      assert.strictEqual(validateBilingualFormat('English | Vietnamese'), true);
      assert.strictEqual(validateBilingualFormat('Test | Thử nghiệm'), true);
    });

    it('should reject text without separator', () => {
      assert.strictEqual(validateBilingualFormat('English Vietnamese'), false);
      assert.strictEqual(validateBilingualFormat('NoSeparator'), false);
    });

    it('should reject dash without spaces', () => {
      assert.strictEqual(validateBilingualFormat('English-Vietnamese'), false);
    });

    it('should reject pipe without spaces', () => {
      assert.strictEqual(validateBilingualFormat('English|Vietnamese'), false);
    });

    it('should handle empty string', () => {
      assert.strictEqual(validateBilingualFormat(''), false);
    });
  });

  describe('findFunctionSection', () => {
    const sampleContent = `
# 1. FOUNDATIONS

## CHỨC NĂNG 1: Understanding - Hiểu Biết

Some content here

#### **1. Concept One - Khái niệm Một**

Content of concept one

#### **2. Concept Two - Khái niệm Hai**

Content of concept two

## CHỨC NĂNG 2: Analysis - Phân Tích

Different content
`;

    it('should find function section', () => {
      const result = findFunctionSection(sampleContent, 1);
      assert.ok(result);
      assert.ok(result.content.includes('Concept One'));
      assert.ok(typeof result.startLine === 'number');
      assert.ok(typeof result.endLine === 'number');
    });

    it('should return null for non-existent function', () => {
      const result = findFunctionSection(sampleContent, 99);
      assert.strictEqual(result, null);
    });

    it('should extract correct boundaries', () => {
      const result = findFunctionSection(sampleContent, 1);
      assert.ok(result);
      assert.ok(result.content.includes('CHỨC NĂNG 1'));
      assert.ok(!result.content.includes('CHỨC NĂNG 2'));
    });
  });

  describe('extractConcepts', () => {
    const sampleContent = `
#### **1. First Concept - Khái niệm Đầu**
#### **2. Second Concept - Khái niệm Hai**
#### **3. Third Concept - Khái niệm Ba**
`;

    it('should extract all concepts', () => {
      const result = extractConcepts(sampleContent);
      assert.strictEqual(result.length, 3);
    });

    it('should extract concept numbers', () => {
      const result = extractConcepts(sampleContent);
      assert.strictEqual(result[0].number, 1);
      assert.strictEqual(result[1].number, 2);
      assert.strictEqual(result[2].number, 3);
    });

    it('should extract concept names', () => {
      const result = extractConcepts(sampleContent);
      assert.ok(result[0].name.includes('First Concept'));
      assert.ok(result[1].name.includes('Second Concept'));
      assert.ok(result[2].name.includes('Third Concept'));
    });

    it('should return empty array for no concepts', () => {
      const result = extractConcepts('No concepts here');
      assert.strictEqual(result.length, 0);
    });
  });

  describe('extractHeaders', () => {
    const sampleContent = `
#### **1. Header One - Tiêu đề Một**
#### **2. Header Two - Tiêu đề Hai**
Some text
#### **3. Header Three - Tiêu đề Ba**
`;

    it('should extract all headers', () => {
      const result = extractHeaders(sampleContent);
      assert.strictEqual(result.length, 3);
    });

    it('should extract header numbers', () => {
      const result = extractHeaders(sampleContent);
      assert.strictEqual(result[0].number, 1);
      assert.strictEqual(result[1].number, 2);
      assert.strictEqual(result[2].number, 3);
    });

    it('should extract header text', () => {
      const result = extractHeaders(sampleContent);
      assert.ok(result[0].text.includes('Header One'));
      assert.ok(result[1].text.includes('Header Two'));
      assert.ok(result[2].text.includes('Header Three'));
    });

    it('should return empty array for no headers', () => {
      const result = extractHeaders('No headers here');
      assert.strictEqual(result.length, 0);
    });

    it('should include position information', () => {
      const result = extractHeaders(sampleContent);
      assert.ok(typeof result[0].position === 'number');
      assert.ok(result[1].position > result[0].position);
    });
  });
});
