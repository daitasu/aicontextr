import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import type { ConfigFile } from '../types/config.js';

export const loadConfigFromYaml = (configPath: string): ConfigFile => {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    // js-yaml load method returns any, so type assertion is required
    const config = yaml.load(fileContents) as ConfigFile;

    validateConfigFile(config);

    return config;
  } catch (error) {
    throw new Error(`Failed to load configuration file: ${error}`);
  }
};

export const resolveConfigPath = (configPath: string): string => {
  return path.resolve(process.cwd(), configPath);
};

export const validateConfigFile = (config: ConfigFile): void => {
  if (!config.mdcConfigurations || !Array.isArray(config.mdcConfigurations)) {
    throw new Error('mdcConfigurations array not found in configuration file');
  }

  if (!config.claudeConfigurations || !Array.isArray(config.claudeConfigurations)) {
    throw new Error('claudeConfigurations array not found in configuration file');
  }
};