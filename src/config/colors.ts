// Color configuration for easy customization
// All colors are in HSL format for consistency with the design system

export const colorConfig = {
  light: {
    // Base colors
    background: "250 50% 98%",
    foreground: "230 25% 15%",
    
    // Card colors
    card: "0 0% 100%",
    cardForeground: "230 25% 15%",
    
    // Popover colors
    popover: "0 0% 100%",
    popoverForeground: "230 25% 15%",
    
    // Primary colors
    primary: "240 100% 60%",
    primaryForeground: "0 0% 100%",
    
    // Secondary colors
    secondary: "240 15% 95%",
    secondaryForeground: "230 25% 25%",
    
    // Muted colors
    muted: "240 15% 97%",
    mutedForeground: "230 15% 45%",
    
    // Accent colors
    accent: "145 65% 50%",
    accentForeground: "0 0% 100%",
    
    // Destructive colors
    destructive: "0 84.2% 60.2%",
    destructiveForeground: "210 40% 98%",
    
    // Border and input colors
    border: "240 20% 90%",
    input: "240 20% 96%",
    ring: "240 100% 60%",
    
    // Sidebar colors
    sidebarBackground: "0 0% 98%",
    sidebarForeground: "240 5.3% 26.1%",
    sidebarPrimary: "240 5.9% 10%",
    sidebarPrimaryForeground: "0 0% 98%",
    sidebarAccent: "240 4.8% 95.9%",
    sidebarAccentForeground: "240 5.9% 10%",
    sidebarBorder: "220 13% 91%",
    sidebarRing: "217.2 91.2% 59.8%",
  },
  
  dark: {
    // Base colors
    background: "240 10% 3.9%",
    foreground: "0 0% 98%",
    
    // Card colors
    card: "240 10% 3.9%",
    cardForeground: "0 0% 98%",
    
    // Popover colors
    popover: "240 10% 3.9%",
    popoverForeground: "0 0% 98%",
    
    // Primary colors
    primary: "270 95% 70%",
    primaryForeground: "240 10% 3.9%",
    
    // Secondary colors
    secondary: "240 3.7% 15.9%",
    secondaryForeground: "0 0% 98%",
    
    // Muted colors
    muted: "240 3.7% 15.9%",
    mutedForeground: "240 5% 64.9%",
    
    // Accent colors
    accent: "340 75% 65%",
    accentForeground: "240 10% 3.9%",
    
    // Destructive colors
    destructive: "0 72% 55%",
    destructiveForeground: "0 0% 98%",
    
    // Border and input colors
    border: "240 3.7% 15.9%",
    input: "240 3.7% 15.9%",
    ring: "270 95% 70%",
    
    // Sidebar colors
    sidebarBackground: "240 5.9% 10%",
    sidebarForeground: "240 4.8% 95.9%",
    sidebarPrimary: "270 95% 70%",
    sidebarPrimaryForeground: "240 10% 3.9%",
    sidebarAccent: "240 3.7% 15.9%",
    sidebarAccentForeground: "240 4.8% 95.9%",
    sidebarBorder: "240 3.7% 15.9%",
    sidebarRing: "270 95% 70%",
  },
  
  // Gradients and effects
  gradients: {
    light: {
      primary: "linear-gradient(135deg, hsl(240 100% 60%), hsl(260 100% 65%))",
      accent: "linear-gradient(135deg, hsl(145 65% 50%), hsl(165 65% 55%))",
    },
    dark: {
      primary: "linear-gradient(135deg, hsl(270 95% 70%), hsl(290 85% 75%))",
      accent: "linear-gradient(135deg, hsl(340 75% 65%), hsl(320 70% 70%))",
    }
  },
  
  shadows: {
    light: {
      elegant: "0 10px 30px -10px hsl(240 50% 15% / 0.1)",
      hover: "0 20px 40px -10px hsl(240 50% 15% / 0.15)",
    },
    dark: {
      elegant: "0 10px 30px -10px hsl(240 95% 5% / 0.5)",
      hover: "0 20px 40px -10px hsl(240 95% 5% / 0.7)",
    }
  }
};

// Helper function to generate CSS custom properties
export const generateCSSVariables = () => {
  const { light, dark, gradients, shadows } = colorConfig;
  
  const lightVars = Object.entries(light).map(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `--${cssVar}: ${value};`;
  }).join('\n    ');
  
  const darkVars = Object.entries(dark).map(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `--${cssVar}: ${value};`;
  }).join('\n    ');
  
  return {
    light: lightVars,
    dark: darkVars,
    gradients,
    shadows
  };
};