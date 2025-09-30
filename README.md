# AI Prompt Builder

## Project info

A tool for building AI prompts with customizable configurations.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

# Docker Deployment Guide

This guide explains how to deploy the AI Prompt Builder using Docker with optional custom configuration files.

## Quick Start

### Basic Deployment
```bash
# Build the image
docker build -t prompt-builder .

# Run with default configuration
docker run -p 8080:80 prompt-builder
```

### Using Docker Compose
```bash
# Run with default configuration
docker-compose up prompt-builder
```

## Custom Configuration

You can override the default prompt configuration files by mounting custom files as Docker volumes.

### 1. Create Custom Configuration Directory
```bash
mkdir -p ./config
```

### 2. Copy Default Configuration Files
Copy the default configuration files from `public/config/` to your custom config directory:
```bash
cp public/config/* ./config/
```

### 3. Customize Configuration Files
Edit the files in your `./config/` directory:
- `prompt-config.json` - English prompts
- `prompt-config-de.json` - German prompts
- `languages.json` - Language configuration

### 4. Deploy with Custom Configuration

#### Option A: Docker Run
```bash
docker run -p 8080:80 \
  -v $(pwd)/config/prompt-config.json:/usr/share/nginx/html/config/prompt-config.json:ro \
  -v $(pwd)/config/prompt-config-de.json:/usr/share/nginx/html/config/prompt-config-de.json:ro \
  -v $(pwd)/config/languages.json:/usr/share/nginx/html/config/languages.json:ro \
  prompt-builder
```

#### Option B: Docker Compose
1. Uncomment the volume mounts in `docker-compose.yml`
2. Update the paths to point to your config directory
3. Run: `docker-compose up prompt-builder`

#### Option C: Use Custom Profile
```bash
# Ensure your config files are in ./config/
docker-compose --profile custom up prompt-builder-custom
```

## Configuration File Format

### languages.json
```json
{
  "languages": [
    {
      "code": "en",
      "name": "English", 
      "flag": "🇺🇸",
      "promptFile": "/src/data/prompt-config.json"
    }
  ],
  "default": "en"
}
```

### prompt-config.json
```json
{
  "sections": [
    {
      "id": "section1",
      "order": 1,
      "title": "Section Title",
      "description": "Section description",
      "options": [
        {
          "id": "option1",
          "label": "Option Label",
          "text": "Prompt text to include"
        }
      ]
    }
  ]
}
```

## Environment Variables

- `USE_CUSTOM_CONFIG`: Set to `true` to enable custom config file loading (optional, defaults to auto-detection)

## Ports

- Default port: `80` (container)
- Mapped port: `8080` (host) - configurable in docker-compose.yml

## Troubleshooting

### Configuration Not Loading
1. Ensure config files are valid JSON
2. Check file permissions (should be readable)
3. Verify volume mount paths are correct
4. Check browser console for errors

### Custom Files Not Found
The application will automatically fall back to built-in configuration if custom files are not found or invalid.


#########################

## Customizing Prompt Configurations

The AI Prompt Builder uses JSON configuration files to define the available prompt options. You can customize these to fit your specific use case.

### Configuration Files

- `src/data/prompt-config.json` - English prompts (default)
- `src/data/prompt-config-de.json` - German prompts
- `src/data/languages.json` - Language definitions and file mappings

### JSON Structure

Each configuration file follows this structure:

```json
{
  "sections": [
    {
      "id": "uniqueSectionId",
      "order": 1,
      "title": "Section Display Name",
      "description": "Help text explaining this section",
      "options": [
        {
          "id": "optionId",
          "label": "Option Display Name", 
          "text": "Text that gets added to the prompt"
        }
      ]
    }
  ]
}
```

### Field Descriptions

**Section Properties:**
- `id`: Unique identifier for the section (used internally)
- `order`: Display order (lower numbers appear first)
- `title`: The heading shown to users
- `description`: Help text displayed below the title
- `options`: Array of selectable options within this section

**Option Properties:**
- `id`: Unique identifier within the section
- `label`: Text shown next to the checkbox
- `text`: The actual text that gets inserted into the generated prompt

### Adding New Sections

To add a new section, append it to the `sections` array:

```json
{
  "id": "newSection",
  "order": 6,
  "title": "My Custom Section",
  "description": "Choose options for my custom requirements",
  "options": [
    {
      "id": "option1",
      "label": "First Option",
      "text": "Add this text when selected."
    },
    {
      "id": "option2", 
      "label": "Second Option",
      "text": "Add different text when selected."
    }
  ]
}
```

### Adding New Languages

1. Create a new configuration file (e.g., `src/data/prompt-config-fr.json`)
2. Add the language to `src/data/languages.json`:

```json
{
  "code": "fr",
  "name": "Français", 
  "flag": "🇫🇷",
  "promptFile": "/src/data/prompt-config-fr.json"
}
```

### Tips for Configuration

- Keep `id` values lowercase with underscores (e.g., `my_option_id`)
- Use clear, descriptive `label` text for users
- Write `text` values that flow naturally in generated prompts
- Test your changes by building prompts with different combinations
- The `order` field determines display sequence (1 = first, 2 = second, etc.)

## How can I deploy this project?

This project can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

Build the project with `npm run build` and deploy the `dist` folder.
