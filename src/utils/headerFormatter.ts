import type { MdcHeader } from '../types/config.js';
import { YAML_HEADER_DELIMITER } from '../constants/index.js';

export const formatYamlHeader = (header: MdcHeader): string => {
  const lines = [YAML_HEADER_DELIMITER];

  for (const [key, value] of Object.entries(header)) {
    if (Array.isArray(value)) {
      lines.push(`${key}: [${value.join(', ')}]`);
    } else if (typeof value === 'boolean') {
      lines.push(`${key}: ${value}`);
    } else if (typeof value === 'string') {
      if (value.includes('\n')) {
        lines.push(`${key}: |`);
        for (const line of value.split('\n')) {
          lines.push(`  ${line}`);
        }
      } else {
        lines.push(`${key}: ${value}`);
      }
    } else if (value !== undefined) {
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push(YAML_HEADER_DELIMITER);
  return `${lines.join('\n')}\n`;
};