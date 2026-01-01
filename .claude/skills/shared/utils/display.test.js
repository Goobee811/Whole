/**
 * Unit tests for display utilities
 *
 * Tests terminal output formatting functions.
 * Run with: node --test display.test.js
 */

const assert = require('assert');
const { describe, it } = require('node:test');
const { COLORS, colorize, truncate } = require('./display');

describe('Display Utilities', () => {
  describe('COLORS', () => {
    it('should have all required color codes', () => {
      assert.ok(COLORS.reset);
      assert.ok(COLORS.bold);
      assert.ok(COLORS.bright);
      assert.ok(COLORS.red);
      assert.ok(COLORS.green);
      assert.ok(COLORS.yellow);
      assert.ok(COLORS.blue);
      assert.ok(COLORS.cyan);
    });

    it('should have ANSI escape codes', () => {
      assert.strictEqual(COLORS.reset, '\x1b[0m');
      assert.strictEqual(COLORS.red, '\x1b[31m');
      assert.strictEqual(COLORS.green, '\x1b[32m');
    });
  });

  describe('colorize', () => {
    it('should colorize text with valid color', () => {
      const result = colorize('test', 'red');
      assert.strictEqual(result, `${COLORS.red}test${COLORS.reset}`);
    });

    it('should handle multiple colors', () => {
      assert.strictEqual(
        colorize('text', 'green'),
        `${COLORS.green}text${COLORS.reset}`
      );
      assert.strictEqual(
        colorize('text', 'blue'),
        `${COLORS.blue}text${COLORS.reset}`
      );
    });

    it('should handle invalid color name', () => {
      const result = colorize('test', 'invalid');
      assert.strictEqual(result, `test${COLORS.reset}`);
    });

    it('should handle null text', () => {
      assert.strictEqual(colorize(null, 'red'), '');
      assert.strictEqual(colorize(undefined, 'red'), '');
    });

    it('should handle empty string', () => {
      const result = colorize('', 'red');
      assert.strictEqual(result, `${COLORS.red}${COLORS.reset}`);
    });
  });

  describe('truncate', () => {
    it('should not truncate short strings', () => {
      assert.strictEqual(truncate('hello'), 'hello');
      assert.strictEqual(truncate('test', 10), 'test');
    });

    it('should truncate long strings to default 50 chars', () => {
      const longText = 'a'.repeat(100);
      const result = truncate(longText);
      assert.strictEqual(result.length, 53); // 50 + '...'
      assert.ok(result.endsWith('...'));
    });

    it('should truncate to custom length', () => {
      const text = 'hello world this is a test';
      const result = truncate(text, 10);
      assert.strictEqual(result, 'hello worl...');
    });

    it('should handle exact length match', () => {
      const text = 'hello';
      assert.strictEqual(truncate(text, 5), 'hello');
    });

    it('should handle null/undefined', () => {
      assert.strictEqual(truncate(null), '');
      assert.strictEqual(truncate(undefined), '');
    });

    it('should handle empty string', () => {
      assert.strictEqual(truncate(''), '');
    });

    it('should preserve text that is exactly maxLen', () => {
      const text = 'a'.repeat(50);
      const result = truncate(text, 50);
      assert.strictEqual(result, text);
      assert.ok(!result.endsWith('...'));
    });

    it('should truncate text that exceeds maxLen by 1', () => {
      const text = 'a'.repeat(51);
      const result = truncate(text, 50);
      assert.strictEqual(result.length, 53);
      assert.ok(result.endsWith('...'));
    });
  });
});
