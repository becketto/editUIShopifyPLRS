# Note from Beckett

I made this because I couldn't find a single example of one of those "Edit this web page/email" Polaris components. I didn't realize Shopify App Bridge's `<ui-modal>` doesn't accept normal React components, it needs to be in an iframe first, otherwise most functions just won't work.

Here's the link to the Shopify App Bridge ui-modal: https://shopify.dev/docs/api/app-bridge-library/web-components/ui-modal

# Email Templates Modal UI for Shopify Polaris

A standalone React component for Shopify apps built with Polaris and App Bridge. Provides email template editing and live preview functionality with a beautiful Polaris-styled modal interface.

> **Shopify-First Design**: Built specifically for Shopify apps using Polaris design system and App Bridge framework.

## Features

- **Live Preview**: Real-time HTML email preview in iframe
- **Category Filtering**: Organize templates by categories  
- **Variable Editing**: Dynamic form fields for template variables
- **Sample Data**: Quick-fill with sample data for testing
- **Responsive Design**: Works on different screen sizes
- **Shopify Polaris Components**: Consistent with Shopify's design system
- **App Bridge Compatible**: Seamlessly integrates with Shopify App Bridge
- **TypeScript**: Full type safety

## Installation

This package requires Shopify Polaris and is designed for Shopify app development:

```bash
npm install email-templates-modal-ui @shopify/polaris @shopify/polaris-icons
```

## Usage

### Basic Usage in a Shopify App

```tsx
import React, { useState, useCallback } from 'react';
import { EmailTemplatesModalContent } from 'email-templates-modal-ui';
import { getAllActiveTemplates, TemplateRegistryEntry } from 'email-templates-modal-ui/utils/templateRegistry';
// Import your Shopify Polaris providers as needed
import { AppProvider } from '@shopify/polaris';

function MyShopifyEmailEditor() {
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
    <AppProvider i18n={{}}>
      <EmailTemplatesModalContent
        selectedTemplateEntry={selectedTemplate}
        templateVariables={variables}
        onTemplateChange={handleTemplateChange}
        onVariableUpdate={handleVariableUpdate}
        onUseSampleData={handleUseSampleData}
      />
    </AppProvider>
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

Main modal component designed with Shopify Polaris styling, featuring three panels:
- **Left**: Theme customization (placeholder)
- **Middle**: Template selection and settings using Polaris form components
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

**Shopify App Development:**
- React 18+
- @shopify/polaris 12+
- @shopify/polaris-icons 7+
- Shopify App Bridge (for full Shopify app integration)

**Note:** This component is specifically designed for Shopify apps and requires the Shopify Polaris design system.

## License

MIT