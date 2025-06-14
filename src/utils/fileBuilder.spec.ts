import { describe, it, expect, vi } from 'vitest';
import * as fs from 'node:fs';
import { glob } from 'glob';
import { extractNumberPrefix, sortFilesByNumericPrefix, buildClaudeFile } from './fileBuilder.js';
import type { ClaudeConfig } from '../types/config.js';

vi.mock('node:fs');
vi.mock('glob');

describe('fileBuilder', () => {
  describe('extractNumberPrefix', () => {
    it('should extract numbers correctly', () => {
      expect(extractNumberPrefix('01_test.md')).toBe(1);
      expect(extractNumberPrefix('test.md')).toBe(Number.POSITIVE_INFINITY);
    });
  });

  describe('sortFilesByNumericPrefix', () => {
    it('should sort by numeric prefix', () => {
      const files = ['03_third.md', '01_first.md', '02_second.md'];
      const result = sortFilesByNumericPrefix(files);
      
      expect(result[0]).toContain('01_first.md');
      expect(result[1]).toContain('02_second.md');
      expect(result[2]).toContain('03_third.md');
    });
  });

  describe('buildClaudeFile', () => {
    const mockFs = vi.mocked(fs);
    const mockGlob = vi.mocked(glob);

    it('should skip sections with no files', async () => {
      const config: ClaudeConfig = {
        output: 'CLAUDE.md',
        sections: [{ title: 'Test', sourceDir: 'docs/', filePattern: '*.md' }]
      };

      mockGlob.mockResolvedValue([]);
      mockFs.promises.writeFile = vi.fn().mockResolvedValue(undefined);

      await buildClaudeFile(config);

      expect(mockFs.promises.writeFile).toHaveBeenCalledWith(
        expect.stringContaining('CLAUDE.md'),
        ''
      );
    });
  });
});