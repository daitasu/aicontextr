import { describe, it, expect } from 'vitest';
import { formatYamlHeader } from './headerFormatter.js';
import type { MdcHeader } from '../types/config.js';

describe('headerFormatter', () => {
  describe('formatYamlHeader', () => {
    it('should format basic properties', () => {
      const header: MdcHeader = { description: 'Test' };
      const result = formatYamlHeader(header);
      
      expect(result).toContain('---');
      expect(result).toContain('description: Test');
    });

    it('should format arrays correctly', () => {
      const header: MdcHeader = { description: 'Test', globs: ['*.ts', '*.js'] };
      const result = formatYamlHeader(header);
      
      expect(result).toContain('globs: [*.ts, *.js]');
    });

    it('should skip undefined properties', () => {
      const header: MdcHeader = { description: 'Test', undefinedProp: undefined };
      const result = formatYamlHeader(header);
      
      expect(result).not.toContain('undefinedProp');
    });
  });
});