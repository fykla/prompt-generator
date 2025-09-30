# Custom Configuration Directory

This directory contains sample configuration files that can be used to customize the AI Prompt Builder when running in Docker.

## Files

- `prompt-config.json` - English prompt configuration
- `prompt-config-de.json` - German prompt configuration  
- `languages.json` - Available languages and their settings

## Usage

1. **Copy these files to your host system**
2. **Modify them according to your needs**
3. **Mount them as Docker volumes** when running the container

## Docker Volume Mounting

### Using Docker Run
```bash
docker run -p 8080:80 \
  -v $(pwd)/config/prompt-config.json:/usr/share/nginx/html/config/prompt-config.json:ro \
  -v $(pwd)/config/prompt-config-de.json:/usr/share/nginx/html/config/prompt-config-de.json:ro \
  -v $(pwd)/config/languages.json:/usr/share/nginx/html/config/languages.json:ro \
  prompt-builder
```

### Using Docker Compose
Update the `docker-compose.yml` file to uncomment and customize the volume mounts:

```yaml
volumes:
  - ./config/prompt-config.json:/usr/share/nginx/html/config/prompt-config.json:ro
  - ./config/prompt-config-de.json:/usr/share/nginx/html/config/prompt-config-de.json:ro  
  - ./config/languages.json:/usr/share/nginx/html/config/languages.json:ro
```

## Configuration Format

See the individual files for examples of the expected JSON structure. The application will automatically fall back to built-in defaults if custom files are not provided or contain errors.