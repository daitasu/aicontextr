#!/usr/bin/env node

import * as fs from 'node:fs';
import { Command } from 'commander';
import { loadConfigFromYaml, resolveConfigPath } from './utils/configLoader.js';
import { 
  buildMdcFilesWithSubDirectories, 
  buildClaudeFile, 
  clearMdcFiles, 
  clearClaudeFiles 
} from './utils/fileBuilder.js';
import { DEFAULT_CONFIG_PATH } from './constants/index.js';

const cmd = new Command();

cmd
  .name('aicontextr')
  .description('AI context file generator for MDC and CLAUDE.md files')
  .version('0.0.2')
  .option(
    '-c, --config <path>',
    'Path to config file',
    DEFAULT_CONFIG_PATH
  );

const executeGeneration = async (configPath: string): Promise<void> => {
  try {
    const resolvedConfigPath = resolveConfigPath(configPath);

    if (!fs.existsSync(resolvedConfigPath)) {
      console.error(`Configuration file not found: ${resolvedConfigPath}`);
      process.exit(1);
    }

    const config = loadConfigFromYaml(resolvedConfigPath);
    const { mdcConfigurations, claudeConfigurations } = config;

    await clearMdcFiles(mdcConfigurations);
    await clearClaudeFiles(claudeConfigurations);

    for (const mdcConfig of mdcConfigurations) {
      await buildMdcFilesWithSubDirectories(mdcConfig);
    }

    for (const claudeConfig of claudeConfigurations) {
      await buildClaudeFile(claudeConfig);
    }

    console.log('All mdc files and CLAUDE.md have been successfully generated!');
  } catch (error) {
    console.error('Error generating mdc files:', error);
    process.exit(1);
  }
};

cmd.action(async (options) => {
  await executeGeneration(options.config);
});

cmd.parse(process.argv);