import * as fs from 'node:fs';
import * as path from 'node:path';
import { glob } from 'glob';
import type { MdcConfig, ClaudeConfig } from '../types/config.js';
import { formatYamlHeader } from './headerFormatter.js';
import {
  POSITIVE_INFINITY_FOR_SORT,
  NUMERIC_PREFIX_PATTERN,
  CURSOR_RULES_DIR_NAME,
  MDC_FILE_EXTENSION
} from '../constants/index.js';

export const extractNumberPrefix = (filename: string): number => {
  const match = filename.match(NUMERIC_PREFIX_PATTERN);
  return match ? Number.parseInt(match[1], 10) : POSITIVE_INFINITY_FOR_SORT;
};

export const sortFilesByNumericPrefix = (files: string[]): string[] => {
  return [...files].sort((a: string, b: string) => {
    const numA = extractNumberPrefix(path.basename(a));
    const numB = extractNumberPrefix(path.basename(b));
    return numA - numB;
  });
};

export const createDirectoryIfNotExists = async (dirPath: string): Promise<void> => {
  try {
    await fs.promises.mkdir(dirPath, { recursive: true });
  } catch (error) {
    // ディレクトリが既に存在する場合は無視
  }
};

export const buildMdcFile = async (config: MdcConfig, outputPath: string): Promise<void> => {
  const rootDir = path.resolve(process.cwd());
  const pattern = path.join(rootDir, config.sourceDir, config.filePattern);
  const files = await glob(pattern);

  const sortedFiles = sortFilesByNumericPrefix(files);

  let content = '';
  content += formatYamlHeader(config.header);

  for (const file of sortedFiles) {
    const fileContent = await fs.promises.readFile(file, 'utf8');
    content += `${fileContent}\n\n`;
  }

  const fullOutputPath = path.join(rootDir, outputPath);
  const outputDir = path.dirname(fullOutputPath);

  await createDirectoryIfNotExists(outputDir);
  await fs.promises.writeFile(fullOutputPath, content);
  
  console.log(`Generated ${outputPath} from ${files.length} files in ${config.sourceDir}`);
};

export const buildClaudeFile = async (config: ClaudeConfig): Promise<void> => {
  const rootDir = path.resolve(process.cwd());
  let content = '';

  for (const section of config.sections) {
    const pattern = path.join(rootDir, section.sourceDir, section.filePattern);
    const files = await glob(pattern);

    if (files.length === 0) continue;

    const sortedFiles = sortFilesByNumericPrefix(files);

    for (const file of sortedFiles) {
      const fileContent = await fs.promises.readFile(file, 'utf8');
      content += `${fileContent}\n\n`;
    }
  }

  const fullOutputPath = path.join(rootDir, config.output);
  await fs.promises.writeFile(fullOutputPath, content);
  
  console.log(`Generated ${config.output} from ${config.sections.length} sections`);
};

export const clearMdcFiles = async (mdcConfigurations: MdcConfig[]): Promise<void> => {
  const rootDir = path.resolve(process.cwd());
  const rulesDir = path.join(rootDir, CURSOR_RULES_DIR_NAME);

  try {
    await fs.promises.access(rulesDir);
    const mdcFiles = await glob(path.join(rulesDir, MDC_FILE_EXTENSION));
    for (const file of mdcFiles) {
      console.log(`Clearing content of MDC file: ${file}`);
      await fs.promises.writeFile(file, '');
    }
  } catch (error) {
    // ディレクトリが存在しない場合は何もしない
  }

  for (const config of mdcConfigurations) {
    if (!config.subDirectories) continue;

    for (const subDir of config.subDirectories) {
      const subRulesDir = path.join(rootDir, subDir, CURSOR_RULES_DIR_NAME);
      try {
        await fs.promises.access(subRulesDir);
        const mdcFiles = await glob(path.join(subRulesDir, MDC_FILE_EXTENSION));
        for (const file of mdcFiles) {
          console.log(`Clearing content of MDC file in subdirectory: ${file}`);
          await fs.promises.writeFile(file, '');
        }
      } catch (error) {
        // ディレクトリが存在しない場合は何もしない
      }
    }
  }
};

export const clearClaudeFiles = async (claudeConfigurations: ClaudeConfig[]): Promise<void> => {
  const rootDir = path.resolve(process.cwd());

  for (const config of claudeConfigurations) {
    const fullOutputPath = path.join(rootDir, config.output);
    try {
      await fs.promises.access(fullOutputPath);
      console.log(`Clearing content of CLAUDE.md file: ${fullOutputPath}`);
      await fs.promises.writeFile(fullOutputPath, '');
    } catch (error) {
      // ファイルが存在しない場合は何もしない
    }
  }
};

export const buildMdcFilesWithSubDirectories = async (config: MdcConfig): Promise<void> => {
  await buildMdcFile(config, config.output);

  if (config.subDirectories) {
    for (const subDir of config.subDirectories) {
      const subDirOutput = path.join(subDir, CURSOR_RULES_DIR_NAME, path.basename(config.output));
      const subDirHeader = { ...config.header };
      
      if (typeof subDirHeader.globs === 'string' && subDirHeader.globs.startsWith(subDir)) {
        subDirHeader.globs = subDirHeader.globs.substring(subDir.length);
      }

      const subConfig = { ...config, header: subDirHeader };
      await buildMdcFile(subConfig, subDirOutput);
    }
  }
};