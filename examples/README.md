# @daitasu/aicontextr Example

This directory contains a working example of how to use `@daitasu/aicontextr` to generate AI context files.

## Directory Structure

```
examples/
├── README.md                    # This file
├── scripts/
│   └── config.yaml             # Configuration file
├── docs/
│   ├── frontend/               # Frontend documentation
│   │   ├── 01_introduction.md
│   │   ├── 02_architecture.md
│   │   └── 03_guidelines.md
│   └── backend/                # Backend documentation
│       ├── 01_setup.md
│       ├── 02_configuration.md
│       └── 03_usage.md
└── package.json                # Local package configuration
```

## How to Run

1. **Navigate to the examples directory:**
   ```bash
   cd examples
   ```

2. **Install dependencies (if running locally):**
   ```bash
   npm install
   ```

3. **Generate AI context files:**
   ```bash
   npx @daitasu/aicontextr --config ./scripts/config.yaml
   # or
   npm run generate
   ```

4. **Check the generated files:**
   - `.cursor/rules/frontend.mdc` - Frontend-specific rules
   - `.cursor/rules/backend.mdc` - Backend-specific rules
   - `CLAUDE.md` - Combined documentation for Claude AI

## Expected Output

After running the command, you should see:
- Two MDC files created in `.cursor/rules/`
- One CLAUDE.md file in the root directory
- Console output showing the generation progress

## Configuration Details

The `config.yaml` file demonstrates:
- **MDC configurations**: Generate separate rule files for different contexts
- **Claude configurations**: Combine multiple documentation sources
- **File sorting**: Automatic sorting by numeric prefix (01_, 02_, etc.)
- **Header customization**: YAML front matter for MDC files

## Customization

You can modify the `scripts/config.yaml` file to:
- Change output paths
- Add more documentation sources
- Customize YAML headers
- Add subdirectory support

This example serves as a template for setting up `@daitasu/aicontextr` in your own projects.