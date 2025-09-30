import { useState, useEffect } from 'react';
import promptConfigEn from '@/data/prompt-config.json';
import promptConfigDe from '@/data/prompt-config-de.json';
import languageConfig from '@/data/languages.json';

interface PromptOption {
  id: string;
  label: string;
  text: string;
}

interface PromptSection {
  id: string;
  order: number;
  title: string;
  description: string;
  options: PromptOption[];
}

interface PromptConfig {
  sections: PromptSection[];
}

interface LanguageConfig {
  languages: Array<{
    code: string;
    name: string;
    flag: string;
    promptFile: string;
  }>;
  default: string;
}

export const useConfig = () => {
  const [config, setConfig] = useState<{
    languages: LanguageConfig;
    prompts: Record<string, PromptConfig>;
  }>({
    languages: languageConfig,
    prompts: {
      en: promptConfigEn as PromptConfig,
      de: promptConfigDe as PromptConfig,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCustomConfig = async () => {
      setLoading(true);
      try {
        // Try to load custom configuration files
        const languagesResponse = await fetch('/config/languages.json').catch(() => null);
        const promptEnResponse = await fetch('/config/prompt-config.json').catch(() => null);
        const promptDeResponse = await fetch('/config/prompt-config-de.json').catch(() => null);

        const customLanguages = languagesResponse?.ok ? await languagesResponse.json().catch(() => null) : null;
        const customPromptEn = promptEnResponse?.ok ? await promptEnResponse.json().catch(() => null) : null;
        const customPromptDe = promptDeResponse?.ok ? await promptDeResponse.json().catch(() => null) : null;

        const newConfig = {
          languages: customLanguages || languageConfig,
          prompts: {
            en: customPromptEn || (promptConfigEn as PromptConfig),
            de: customPromptDe || (promptConfigDe as PromptConfig),
          },
        };

        setConfig(newConfig);
      } catch (error) {
        console.log('Using built-in configuration files');
        // Keep default configuration if custom files are not available
      } finally {
        setLoading(false);
      }
    };

    loadCustomConfig();
  }, []);

  return { config, loading };
};
