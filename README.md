# Email Templates Modal UI

A standalone React component for editing and previewing HTML email templates with live preview functionality.

## Features

- **Live Preview**: Real-time HTML email preview in iframe
- **Category Filtering**: Organize templates by categories  
- **Variable Editing**: Dynamic form fields for template variables
- **Sample Data**: Quick-fill with sample data for testing
- **Responsive Design**: Works on different screen sizes
- **Shopify Polaris**: Beautiful UI components
- **TypeScript**: Full type safety

## Installation

```bash
npm install email-templates-modal-ui @shopify/polaris @shopify/polaris-icons
```

## Usage

### Basic Usage

```tsx
import React, { useState, useCallback } from 'react';
import { EmailTemplatesModalContent } from 'email-templates-modal-ui';
import { getAllActiveTemplates, TemplateRegistryEntry } from 'email-templates-modal-ui/utils/templateRegistry';

function MyEmailEditor() {
  const allTemplates = getAllActiveTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState(allTemplates[0]);
  const [variables, setVariables] = useState({});

  const handleVariableUpdate = useCallback((key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleTemplateChange = useCallback((entry: TemplateRegistryEntry) => {
    setSelectedTemplate(entry);
    setVariables({});
  }, []);

  const handleUseSampleData = useCallback(() => {
    setVariables(selectedTemplate.sampleData);
  }, [selectedTemplate]);

  return (
    <EmailTemplatesModalContent
      selectedTemplateEntry={selectedTemplate}
      templateVariables={variables}
      onTemplateChange={handleTemplateChange}
      onVariableUpdate={handleVariableUpdate}
      onUseSampleData={handleUseSampleData}
    />
  );
}
```

### Adding Custom Templates

```tsx
import { EmailTemplateComponent, TemplateRegistryEntry } from 'email-templates-modal-ui';

const MyCustomTemplate: EmailTemplateComponent = {
  id: 'my-custom-template',
  name: 'My Custom Template',
  template: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello {{name}}!</h1>
  <p>Welcome to {{company}}.</p>
</body>
</html>`,
  extractVariables: () => ['name', 'company'],
  processTemplate: (vars) => {
    let html = MyCustomTemplate.template;
    Object.entries(vars).forEach(([key, value]) => {
      html = html.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
    });
    return html;
  },
  component: ({ variables = {}, onUpdate = () => {} }) => (
    <div>
      <input 
        placeholder="Name"
        value={variables.name || ''}
        onChange={(e) => onUpdate('name', e.target.value)}
      />
      <input 
        placeholder="Company"
        value={variables.company || ''}
        onChange={(e) => onUpdate('company', e.target.value)}
      />
    </div>
  )
};

// Add to registry
const customEntry: TemplateRegistryEntry = {
  component: MyCustomTemplate,
  category: 'General Communication',
  description: 'A simple custom template',
  sampleData: { name: 'John', company: 'Acme Corp' },
  isActive: true
};
```

## Components

### EmailTemplatesModalContent

Main modal component with three panels:
- **Left**: Theme customization (placeholder)
- **Middle**: Template selection and settings
- **Right**: Live preview

**Props:**
- `selectedTemplateEntry`: Current template
- `templateVariables`: Current variable values
- `onTemplateChange`: Template selection handler
- `onVariableUpdate`: Variable update handler  
- `onUseSampleData`: Sample data load handler

## Template Structure

Templates must implement the `EmailTemplateComponent` interface:

```tsx
interface EmailTemplateComponent {
  id: string;                    // Unique identifier
  name: string;                  // Display name
  template: string;              // HTML template with {{variables}}
  extractVariables: () => string[];  // Return list of variables
  processTemplate: (vars: Record<string, string>) => string;  // Process template with variables
  component: React.FC<EmailTemplateComponentProps>;  // Settings form component
}
```

## Categories

Built-in categories:
- `Authentication & Security`
- `Affiliate Onboarding` 
- `Performance & Engagement`
- `General Communication`

## Requirements

- React 18+
- @shopify/polaris 12+
- @shopify/polaris-icons 7+

## License

MIT