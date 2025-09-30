import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Settings, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Configuration = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Prompt Builder
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Configuration Guide</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to customize and configure the AI Prompt Builder system
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                JSON Configuration Files
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The system supports multiple languages and is configured via JSON files in the <code className="bg-muted px-2 py-1 rounded text-sm">src/data/</code> directory. 
                Each language has its own configuration file, allowing complete customization without code changes.
              </p>

              <div className="space-y-3">
                <Badge className="mb-2">Configuration Files</Badge>
                <div className="bg-muted p-3 rounded text-sm space-y-1">
                  <div><strong>languages.json:</strong> Defines available languages and their config files</div>
                  <div><strong>prompt-config.json:</strong> English prompt configuration</div>
                  <div><strong>prompt-config-de.json:</strong> German prompt configuration</div>
                </div>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Configuration Structure:</h4>
                <pre className="text-sm overflow-x-auto">
{`{
  "sections": [
    {
      "id": "inputPerspective",
      "order": 1,
      "title": "Input Perspective",
      "description": "Choose the perspective...",
      "options": [
        {
          "id": "first_person",
          "label": "First Person",
          "text": "Analyze this from..."
        }
      ]
    }
  ]
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Multi-Language Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The system supports multiple languages through the <code className="bg-muted px-2 py-1 rounded text-sm">languages.json</code> configuration file.
              </p>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Language Configuration:</h4>
                <pre className="text-sm overflow-x-auto">
{`{
  "languages": [
    {
      "code": "en",
      "name": "English",
      "flag": "🇺🇸",
      "promptFile": "/src/data/prompt-config.json"
    },
    {
      "code": "de", 
      "name": "Deutsch",
      "flag": "🇩🇪",
      "promptFile": "/src/data/prompt-config-de.json"
    }
  ],
  "default": "en"
}`}
                </pre>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4 rounded-lg">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">🌍 Adding New Languages</h4>
                <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <li>1. Create a new config file: <code>prompt-config-[language-code].json</code></li>
                  <li>2. Add the language entry to <code>languages.json</code></li>
                  <li>3. Use the 2-letter ISO language code (e.g., "fr", "es", "it")</li>
                  <li>4. Include an appropriate flag emoji</li>
                  <li>5. Translate all section titles, descriptions, and option labels</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Category Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Badge className="mb-2">Section Properties</Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    Each section now has these configurable properties:
                  </p>
                  <div className="bg-muted p-3 rounded text-sm space-y-1">
                    <div><strong>id:</strong> Unique identifier (camelCase recommended)</div>
                    <div><strong>order:</strong> Numeric sorting priority (1, 2, 3...)</div>
                    <div><strong>title:</strong> Display name shown to users</div>
                    <div><strong>description:</strong> Helpful explanation text</div>
                    <div><strong>options:</strong> Array of available choices</div>
                  </div>
                </div>

                <div>
                  <Badge className="mb-2">Option Properties</Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    Each option within a section has these properties:
                  </p>
                  <div className="bg-muted p-3 rounded text-sm space-y-1">
                    <div><strong>id:</strong> Unique identifier (snake_case recommended)</div>
                    <div><strong>label:</strong> User-friendly display name</div>
                    <div><strong>text:</strong> The actual prompt text that gets included</div>
                  </div>
                </div>

                <div>
                  <Badge className="mb-2">Benefits of Generic Structure</Badge>
                  <p className="text-sm text-muted-foreground mb-2">
                    The new structure provides complete flexibility:
                  </p>
                  <div className="bg-muted p-3 rounded text-sm space-y-1">
                    <div>• Add/remove sections without touching code</div>
                    <div>• Reorder sections using the order property</div>
                    <div>• Interface automatically adapts to changes</div>
                    <div>• Supports unlimited sections and options</div>
                    <div>• Easy to maintain and extend</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Adding New Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Adding new sections or options is completely flexible. Edit the appropriate JSON configuration file(s):
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-3 rounded-lg mb-4">
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>Note:</strong> When adding new sections or options, remember to update all language files to maintain consistency across languages.
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Example - Adding a new section:</h4>
                <pre className="text-sm overflow-x-auto">
{`{
  "sections": [
    // ... existing sections
    {
      "id": "responseLength",
      "order": 6,
      "title": "Response Length",
      "description": "Control the length of the response",
      "options": [
        {
          "id": "brief",
          "label": "Brief & Concise",
          "text": "Keep the response short and to the point."
        },
        {
          "id": "detailed",
          "label": "Detailed & Comprehensive", 
          "text": "Provide a thorough and detailed response."
        }
      ]
    }
  ]
}`}
                </pre>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Configuration Tips</h4>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>• Use sequential order numbers (1, 2, 3...) for predictable sorting</li>
                  <li>• Keep section IDs camelCase and descriptive</li>
                  <li>• Keep option IDs lowercase with underscores</li>
                  <li>• Make option text complete, actionable phrases</li>
                  <li>• Test changes by refreshing the application</li>
                  <li>• The system automatically handles any number of sections</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Configuration;