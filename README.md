# @daitasu/aicontextr

AI context file generator for MDC and CLAUDE.md files

## Installation

```bash
npm install -g @daitasu/aicontextr
```

## Usage

### Basic Usage

```bash
aicontextr --config ./scripts/config.yaml
```

### Using with npx

```bash
npx @daitasu/aicontextr --config ./scripts/config.yaml
```

### Try it out

To see the tool in action, check out the working example in the `examples/` directory:

```bash
cd examples
npx @daitasu/aicontextr --config ./scripts/config.yaml
```

This will generate sample *.mdc and CLAUDE.md files so you can see exactly how the tool works.

### Options

- `-c, --config <path>`: Path to config file (default: `scripts/config.yaml`)
- `-h, --help`: Display help information
- `-V, --version`: Display version number

## Configuration

Create a YAML configuration file with the following structure:

```yaml
mdcConfigurations:
  - output: ".cursor/rules/frontend.mdc"
    sourceDir: "docs/frontend/"
    header:
      description: "Frontend development rules and architecture guidelines"
      globs: "src/**/*.ts,src/**/*.tsx,components/**/*.js"
      alwaysApply: false
    filePattern: "*.md"
    subDirectories:
      - "apps/frontend/"

claudeConfigurations:
  - output: "CLAUDE.md"
    sections:
      - title: "Project-wide Common Rules"
        sourceDir: "docs/common/"
        filePattern: "*.md"
      - title: "Database Design"
        sourceDir: "docs/data/"
        filePattern: "*.md"
```

### Configuration Fields

#### mdcConfigurations

- `output`: Output path for the MDC file
- `sourceDir`: Source directory containing markdown files
- `header`: YAML front matter for the MDC file
  - `description`: Description of the rules
  - `globs`: File patterns to apply rules to
  - `alwaysApply`: Whether to always apply the rules
- `filePattern`: Pattern to match source files (e.g., "*.md")
- `subDirectories`: Optional list of subdirectories to copy the MDC file to

#### claudeConfigurations

- `output`: Output path for the CLAUDE.md file
- `sections`: Array of sections to include
  - `title`: Section title
  - `sourceDir`: Source directory for this section
  - `filePattern`: Pattern to match files in this section
  - `description`: Optional description for the section

## Features

- **Modular Configuration**: Separate configurations for MDC and CLAUDE files
- **Automatic File Sorting**: Files are sorted by numeric prefix (e.g., `01_`, `02_`)
- **Sub-directory Support**: Automatically copy MDC files to specified subdirectories
- **YAML Front Matter**: Automatic generation of YAML headers for MDC files
- **File Cleaning**: Clears existing files before regeneration

## File Structure

The tool expects your project to have a structure like:

```
your-project/
├── scripts/
│   └── config.yaml
├── docs/
│   ├── frontend/
│   │   ├── 01_architecture.md
│   │   └── 02_components.md
│   └── backend/
│       ├── 01_api.md
│       └── 02_database.md
└── .cursor/
    └── rules/
        ├── frontend.mdc
        └── backend.mdc
```

## Requirements

- Node.js >= 18.0.0
- TypeScript support (for development)

## License

MIT