/**
 * Unit tests for security utilities
 *
 * Tests input validation and sanitization functions.
 * Run with: node --test security.test.js
 */

const assert = require('assert');
const { describe, it } = require('node:test');
const {
  sanitizeSessionId,
  validateFunctionNumber,
  escapeRegex,
  handleError
} = require('./security');

describe('Security Utilities', () => {
  describe('sanitizeSessionId', () => {
    it('should sanitize valid session ID', () => {
      const result = sanitizeSessionId('abc123_-DEF');
      assert.strictEqual(result, 'abc123_-DEF');
    });

    it('should remove invalid characters', () => {
      const result = sanitizeSessionId('abc@123#def$');
      assert.strictEqual(result, 'abc123def');
    });

    it('should limit length to 64 characters', () => {
      const longId = 'a'.repeat(100);
      const result = sanitizeSessionId(longId);
      assert.strictEqual(result.length, 64);
    });

    it('should return ppid or default for null/undefined', () => {
      const result = sanitizeSessionId(null);
      assert.ok(result === 'default' || /^\d+$/.test(result)); // ppid or 'default'
      const result2 = sanitizeSessionId(undefined);
      assert.ok(result2 === 'default' || /^\d+$/.test(result2));
    });

    it('should return ppid or default for non-string', () => {
      const result = sanitizeSessionId(123);
      assert.ok(result === 'default' || /^\d+$/.test(result)); // ppid or 'default'
      const result2 = sanitizeSessionId({});
      assert.ok(result2 === 'default' || /^\d+$/.test(result2));
    });

    it('should return default for empty string after sanitization', () => {
      const result = sanitizeSessionId('!@#$%^&*()');
      assert.strictEqual(result, 'default');
    });
  });

  describe('validateFunctionNumber', () => {
    it('should validate valid function numbers', () => {
      assert.strictEqual(validateFunctionNumber('1', 1, 50), 1);
      assert.strictEqual(validateFunctionNumber('25', 1, 50), 25);
      assert.strictEqual(validateFunctionNumber('50', 1, 50), 50);
    });

    it('should reject numbers outside range', () => {
      assert.strictEqual(validateFunctionNumber('0', 1, 50), null);
      assert.strictEqual(validateFunctionNumber('51', 1, 50), null);
      assert.strictEqual(validateFunctionNumber('-1', 1, 50), null);
    });

    it('should reject non-numeric strings', () => {
      assert.strictEqual(validateFunctionNumber('abc', 1, 50), null);
      assert.strictEqual(validateFunctionNumber('1.5', 1, 50), null);
      assert.strictEqual(validateFunctionNumber('1e10', 1, 50), null);
    });

    it('should reject null/undefined', () => {
      assert.strictEqual(validateFunctionNumber(null, 1, 50), null);
      assert.strictEqual(validateFunctionNumber(undefined, 1, 50), null);
    });

    it('should use default min/max values', () => {
      assert.strictEqual(validateFunctionNumber('25'), 25);
      assert.strictEqual(validateFunctionNumber('0'), null);
      assert.strictEqual(validateFunctionNumber('51'), null);
    });

    it('should handle boundary values correctly', () => {
      assert.strictEqual(validateFunctionNumber('1', 1, 50), 1);
      assert.strictEqual(validateFunctionNumber('50', 1, 50), 50);
    });
  });

  describe('escapeRegex', () => {
    it('should escape special regex characters', () => {
      assert.strictEqual(escapeRegex('.'), '\\.');
      assert.strictEqual(escapeRegex('*'), '\\*');
      assert.strictEqual(escapeRegex('+'), '\\+');
      assert.strictEqual(escapeRegex('?'), '\\?');
      assert.strictEqual(escapeRegex('^'), '\\^');
      assert.strictEqual(escapeRegex('$'), '\\$');
      assert.strictEqual(escapeRegex('{'), '\\{');
      assert.strictEqual(escapeRegex('}'), '\\}');
      assert.strictEqual(escapeRegex('('), '\\(');
      assert.strictEqual(escapeRegex(')'), '\\)');
      assert.strictEqual(escapeRegex('['), '\\[');
      assert.strictEqual(escapeRegex(']'), '\\]');
      assert.strictEqual(escapeRegex('\\'), '\\\\');
      assert.strictEqual(escapeRegex('|'), '\\|');
    });

    it('should escape multiple special characters', () => {
      assert.strictEqual(escapeRegex('.*+?'), '\\.\\*\\+\\?');
      assert.strictEqual(escapeRegex('(test)'), '\\(test\\)');
    });

    it('should return empty string for null/undefined', () => {
      assert.strictEqual(escapeRegex(null), '');
      assert.strictEqual(escapeRegex(undefined), '');
    });

    it('should not modify regular text', () => {
      assert.strictEqual(escapeRegex('hello'), 'hello');
      assert.strictEqual(escapeRegex('abc123'), 'abc123');
    });
  });

  describe('handleError', () => {
    it('should not throw when called', () => {
      const error = new Error('Test error');
      assert.doesNotThrow(() => {
        handleError('test-context', error, false);
      });
    });

    // Note: Testing exit behavior and stderr output would require
    // more complex test setup with process mocking
  });
});
