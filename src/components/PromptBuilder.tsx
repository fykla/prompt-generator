import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitch } from '@/components/ui/language-switch';
import { Copy, Wand2, RefreshCw, Settings } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useConfig } from '@/hooks/use-config';

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

const PromptBuilder: React.FC = () => {
  const { config: configData, loading } = useConfig();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [taskDescription, setTaskDescription] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState(configData.languages.default);
  
  // Get current prompt configuration based on selected language
  const config = useMemo(() => {
    return configData.prompts[currentLanguage] || configData.prompts['en'];
  }, [currentLanguage, configData.prompts]);
  
  // Sort sections by order property
  const sortedSections = useMemo(() => {
    return [...config.sections].sort((a, b) => a.order - b.order);
  }, [config]);

  const handleOptionChange = (sectionKey: string, optionId: string, checked: boolean) => {
    setSelectedOptions(prev => {
      const sectionOptions = prev[sectionKey] || [];
      if (checked) {
        return {
          ...prev,
          [sectionKey]: [...sectionOptions, optionId]
        };
      } else {
        return {
          ...prev,
          [sectionKey]: sectionOptions.filter(id => id !== optionId)
        };
      }
    });
  };

  const generatedPrompt = useMemo(() => {
    const parts: string[] = [];
    
    // Process sections in order
    sortedSections.forEach((section) => {
      const selectedIds = selectedOptions[section.id] || [];
      selectedIds.forEach(optionId => {
        const option = section.options.find(opt => opt.id === optionId);
        if (option) {
          parts.push(option.text);
        }
      });
    });

    if (taskDescription.trim()) {
      const taskLabel = currentLanguage === 'de' ? 'Aufgabe' : 'Task';
      parts.push(`${taskLabel}: ${taskDescription.trim()}`);
    }

    return parts.join(' ');
  }, [selectedOptions, taskDescription, sortedSections]);

  const copyToClipboard = async () => {
    if (!generatedPrompt.trim()) {
      toast({
        title: currentLanguage === 'de' ? "Nichts zu kopieren" : "Nothing to copy",
        description: currentLanguage === 'de' ? "Bitte wählen Sie zuerst einige Optionen aus oder fügen Sie eine Aufgabenbeschreibung hinzu." : "Please select some options or add a task description first.",
        variant: "destructive"
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast({
        title: currentLanguage === 'de' ? "Kopiert!" : "Copied!",
        description: currentLanguage === 'de' ? "Prompt erfolgreich in die Zwischenablage kopiert." : "Prompt copied to clipboard successfully.",
      });
    } catch (err) {
      toast({
        title: currentLanguage === 'de' ? "Kopieren fehlgeschlagen" : "Copy failed",
        description: currentLanguage === 'de' ? "Fehler beim Kopieren des Prompts in die Zwischenablage." : "Failed to copy prompt to clipboard.",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setSelectedOptions({});
    setTaskDescription('');
    toast({
      title: currentLanguage === 'de' ? "Geleert" : "Cleared",
      description: currentLanguage === 'de' ? "Alle Auswahlen wurden geleert." : "All selections have been cleared.",
    });
  };

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode);
    // Clear selections when switching languages as the options might be different
    setSelectedOptions({});
    setTaskDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {currentLanguage === 'de' ? 'KI Prompt Builder' : 'AI Prompt Builder'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {currentLanguage === 'de' 
            ? 'Erstellen Sie perfekte Prompts durch Auswahl vorkonfigurierter Blöcke. Anpassen von Perspektive, Zielgruppe, Stil und mehr.'
            : 'Build perfect prompts by selecting from pre-configured blocks. Customize perspective, audience, style, and more.'
          }
        </p>
        
        {/* Language Switch */}
        <div className="flex justify-center mt-6">
          <LanguageSwitch 
            languages={configData.languages.languages}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Configuration Sections */}
        <div className="lg:col-span-2 space-y-6">
          {sortedSections.map((section) => (
            <Card key={section.id} className="shadow-elegant transition-smooth hover:shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  {section.title}
                </CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.options.map((option) => (
                    <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-smooth">
                      <Checkbox
                        id={`${section.id}-${option.id}`}
                        checked={(selectedOptions[section.id] || []).includes(option.id)}
                        onCheckedChange={(checked) => 
                          handleOptionChange(section.id, option.id, checked as boolean)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label 
                          htmlFor={`${section.id}-${option.id}`}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {option.label}
                        </Label>
                        <p className="text-xs text-muted-foreground mt-1">
                          {option.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Task Description */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>
                {currentLanguage === 'de' ? 'Aufgabenbeschreibung' : 'Task Description'}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'de' 
                  ? 'Beschreiben Sie die spezifische Aufgabe oder Frage, die Sie bearbeiten möchten'
                  : 'Describe the specific task or question you want to address'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={
                  currentLanguage === 'de' 
                    ? 'Geben Sie hier Ihre spezifische Aufgabe, Frage oder Anfrage ein...'
                    : 'Enter your specific task, question, or request here...'
                }
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Generated Prompt Preview */}
        <div className="space-y-6">
          <Card className="shadow-elegant sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {currentLanguage === 'de' ? 'Generierter Prompt' : 'Generated Prompt'}
              </CardTitle>
              <CardDescription>
                {currentLanguage === 'de' 
                  ? 'Ihr angepasster Prompt wird hier angezeigt'
                  : 'Your customized prompt will appear here'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                {generatedPrompt.trim() ? (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {generatedPrompt}
                  </p>
                ) : (
                  <p className="text-muted-foreground text-sm italic">
                    {currentLanguage === 'de' 
                      ? 'Wählen Sie oben Optionen aus, um Ihren Prompt zu erstellen...'
                      : 'Select options above to build your prompt...'
                    }
                  </p>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={copyToClipboard}
                  disabled={!generatedPrompt.trim()}
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  {currentLanguage === 'de' ? 'Prompt kopieren' : 'Copy Prompt'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={clearAll}
                  size="icon"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="shadow-elegant">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <p className="text-2xl font-bold text-primary">
                  {Object.values(selectedOptions).flat().length}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'de' ? 'Ausgewählte Optionen' : 'Selected Options'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {generatedPrompt.trim() 
                    ? `${generatedPrompt.length} ${currentLanguage === 'de' ? 'Zeichen' : 'characters'}`
                    : currentLanguage === 'de' ? 'Noch kein Inhalt' : 'No content yet'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Configuration Guide - Bottom */}
      <div className="flex justify-center pt-8 border-t border-border/50">
        <Link 
          to="/configuration" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors bg-card border rounded-lg px-4 py-3 shadow-elegant hover:shadow-hover"
        >
          <Settings className="w-4 h-4" />
          {currentLanguage === 'de' ? 'Konfigurationsanleitung' : 'Configuration Guide'}
        </Link>
      </div>
    </div>
  );
};

export default PromptBuilder;