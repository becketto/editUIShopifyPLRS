import React from 'react';

export interface EmailTemplateComponentProps {
    variables?: Record<string, string>;
    onUpdate?: (key: string, value: string) => void;
}

export interface EmailTemplateComponent {
    component: React.FC<EmailTemplateComponentProps>;
    id: string;
    name: string;
    template: string;
    extractVariables: () => string[];
    processTemplate: (vars: Record<string, string>) => string;
}