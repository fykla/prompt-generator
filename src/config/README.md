# Color Customization Guide

This project uses a centralized color configuration system that makes it easy to customize both light and dark mode colors.

## How to Customize Colors

### Method 1: Direct CSS Variables (Recommended)
Edit the CSS custom properties directly in `src/index.css`:

```css
:root {
  --primary: 240 100% 60%;  /* Change this HSL value */
  --accent: 145 65% 50%;    /* Change this HSL value */
  /* ... other colors ... */
}

.dark {
  --primary: 270 95% 70%;   /* Change this HSL value */
  --accent: 340 75% 65%;    /* Change this HSL value */
  /* ... other colors ... */
}
```

### Method 2: Using the Color Configuration File
The colors are also available in `src/config/colors.ts` for programmatic access:

```typescript
import { colorConfig } from '@/config/colors';

// Access light mode colors
const lightPrimary = colorConfig.light.primary;

// Access dark mode colors  
const darkPrimary = colorConfig.dark.primary;
```

## Color Format
All colors must be in HSL format without the `hsl()` wrapper:
- ✅ Correct: `"240 100% 60%"`
- ❌ Wrong: `"hsl(240, 100%, 60%)"`
- ❌ Wrong: `"#3b82f6"`

## Available Color Variables

### Base Colors
- `--background` / `--foreground` - Main background and text
- `--card` / `--card-foreground` - Card backgrounds and text  
- `--popover` / `--popover-foreground` - Popover backgrounds and text

### Brand Colors
- `--primary` / `--primary-foreground` - Primary brand color
- `--secondary` / `--secondary-foreground` - Secondary color
- `--accent` / `--accent-foreground` - Accent color
- `--muted` / `--muted-foreground` - Muted/subdued colors

### Functional Colors
- `--destructive` / `--destructive-foreground` - Error/danger colors
- `--border` - Border color
- `--input` - Input field backgrounds
- `--ring` - Focus ring color

### Sidebar Colors
- `--sidebar-background` / `--sidebar-foreground`
- `--sidebar-primary` / `--sidebar-primary-foreground`
- `--sidebar-accent` / `--sidebar-accent-foreground`
- `--sidebar-border` / `--sidebar-ring`

## Gradients and Effects
- `--gradient-primary` - Primary gradient
- `--gradient-accent` - Accent gradient  
- `--shadow-elegant` - Elegant shadow
- `--shadow-hover` - Hover shadow

## Quick Color Schemes

### Blue Theme (Default)
```css
--primary: 240 100% 60%;
--accent: 145 65% 50%;
```

### Purple Theme
```css
--primary: 270 95% 70%;
--accent: 290 85% 75%;
```

### Green Theme
```css
--primary: 145 65% 50%;
--accent: 165 65% 55%;
```

### Orange Theme
```css
--primary: 25 95% 60%;
--accent: 45 95% 65%;
```

After making changes, the colors will update automatically across the entire application!