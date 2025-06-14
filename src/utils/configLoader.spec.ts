import { describe, it, expect, vi } from 'vitest';
import * as fs from 'node:fs';
import { loadConfigFromYaml, validateConfigFile } from './configLoader.js';
import type { ConfigFile } from '../types/config.js';

vi.mock('node:fs');

describe('configLoader', () => {
  const mockFs = vi.mocked(fs);

  describe('validateConfigFile', () => {
    it('should pass with valid config', () => {
      const validConfig: ConfigFile = {
        mdcConfigurations: [],
        claudeConfigurations: []
      };
      expect(() => validateConfigFile(validConfig)).not.toThrow();
    });

    it('should throw when mdcConfigurations is missing', () => {
      const invalidConfig = { claudeConfigurations: [] } as ConfigFile;
      expect(() => validateConfigFile(invalidConfig)).toThrow('mdcConfigurations array not found');
    });
  });

  describe('loadConfigFromYaml', () => {
    it('should throw when file read fails', () => {
      mockFs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });
      expect(() => loadConfigFromYaml('/test/config.yaml')).toThrow('Failed to load configuration file');
    });
  });
});