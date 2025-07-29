# Note from Beckett

I made this because I couldn't find a single example of one of those "Edit this web page/email" Polaris components. I didn't realize Shopify App Bridge's `<ui-modal>` doesn't accept normal React components, it needs to be in an iframe first, otherwise most functions just won't work.

Here's the link to the Shopify App Bridge ui-modal: https://shopify.dev/docs/api/app-bridge-library/web-components/ui-modal

# Email Templates Modal UI for Shopify Polaris

React component for editing email templates in Shopify apps. Works inside App Bridge iframes.

## Installation

```bash
npm install email-templates-modal-ui @shopify/polaris @shopify/polaris-icons
```

## Usage

```tsx
import React, { useState, useCallback } from 'react';
import { EmailTemplatesModalContent } from 'email-templates-modal-ui';
import { getAllActiveTemplates, TemplateRegistryEntry } from 'email-templates-modal-ui/utils/templateRegistry';
import { AppProvider } from '@shopify/polaris';

function EmailEditor() {
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

## Adding Custom Templates

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

## Props

### EmailTemplatesModalContent

- `selectedTemplateEntry`: Current template
- `templateVariables`: Current variable values
- `onTemplateChange`: Called when template changes
- `onVariableUpdate`: Called when variables change
- `onUseSampleData`: Called when sample data button is clicked

## Template Interface

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

## Requirements

- React 18+
- @shopify/polaris 12+
- @shopify/polaris-icons 7+

## License

MIT