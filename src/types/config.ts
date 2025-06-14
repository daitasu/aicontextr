export type MdcHeader = {
  readonly description: string;
  readonly globs?: string | string[];
  readonly alwaysApply?: boolean;
  readonly [key: string]: string | string[] | boolean | number | undefined;
};

export type MdcConfig = {
  readonly output: string;
  readonly sourceDir: string;
  readonly header: MdcHeader;
  readonly filePattern: string;
  readonly subDirectories?: string[];
};

export type ClaudeSection = {
  readonly title: string;
  readonly sourceDir: string;
  readonly filePattern: string;
  readonly description?: string;
};

export type ClaudeConfig = {
  readonly output: string;
  readonly sections: ClaudeSection[];
};

export type ConfigFile = {
  readonly mdcConfigurations: MdcConfig[];
  readonly claudeConfigurations: ClaudeConfig[];
};