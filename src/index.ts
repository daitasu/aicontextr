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

const program = new Command();

program
  .name('aicontextr')
  .description('AI context file generator for MDC and CLAUDE.md files')
  .version('1.0.0')
  .option(
    '-c, --config <path>',
    'Path to config file',
    DEFAULT_CONFIG_PATH
  )
  .option(
    '-v, --verbose',
    'Enable verbose logging',
    false
  );

const executeGeneration = async (configPath: string, verbose: boolean): Promise<void> => {
  try {
    const resolvedConfigPath = resolveConfigPath(configPath);

    if (!fs.existsSync(resolvedConfigPath)) {
      console.error(`Configuration file not found: ${resolvedConfigPath}`);
      process.exit(1);
    }

    if (verbose) {
      console.log(`Loading configuration file: ${resolvedConfigPath}`);
    }

    const config = loadConfigFromYaml(resolvedConfigPath);
    const { mdcConfigurations, claudeConfigurations } = config;

    if (verbose) {
      console.log('Clearing existing MDC and CLAUDE files...');
    }

    await clearMdcFiles(mdcConfigurations);
    await clearClaudeFiles(claudeConfigurations);

    if (verbose) {
      console.log('Generating MDC files...');
    }

    for (const mdcConfig of mdcConfigurations) {
      await buildMdcFilesWithSubDirectories(mdcConfig);
    }

    if (verbose) {
      console.log('Generating CLAUDE files...');
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

program.action(async (options) => {
  await executeGeneration(options.config, options.verbose);
});

program.parse(process.argv);