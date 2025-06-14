import * as fs from 'node:fs';
import * as path from 'node:path';
import * as yaml from 'js-yaml';
import type { ConfigFile } from '../types/config.js';

export const loadConfigFromYaml = (configPath: string): ConfigFile => {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    // js-yamlのloadメソッドはanyを返すため、型アサーションが必要
    const config = yaml.load(fileContents) as ConfigFile;

    validateConfigFile(config);

    return config;
  } catch (error) {
    throw new Error(`設定ファイルの読み込みに失敗しました: ${error}`);
  }
};

export const resolveConfigPath = (configPath: string): string => {
  return path.resolve(process.cwd(), configPath);
};

export const validateConfigFile = (config: ConfigFile): void => {
  if (!config.mdcConfigurations || !Array.isArray(config.mdcConfigurations)) {
    throw new Error('設定ファイルにmdcConfigurations配列が見つかりません');
  }

  if (!config.claudeConfigurations || !Array.isArray(config.claudeConfigurations)) {
    throw new Error('設定ファイルにclaudeConfigurations配列が見つかりません');
  }
};