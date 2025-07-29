import { EmailTemplateComponent } from '../types/emailTemplate';
import WelcomeEmailComponent from '../email-templates/welcome';

// Template categories for better organization
export const TEMPLATE_CATEGORIES = {
    AUTHENTICATION: 'Authentication & Security',
    ONBOARDING: 'Affiliate Onboarding',
    PERFORMANCE: 'Performance & Engagement',
    GENERAL: 'General Communication'
} as const;

export type TemplateCategory = typeof TEMPLATE_CATEGORIES[keyof typeof TEMPLATE_CATEGORIES];

// Enhanced template interface with category and sample data
export interface TemplateRegistryEntry {
    component: EmailTemplateComponent;
    category: TemplateCategory;
    description: string;
    sampleData: Record<string, string>;
    isActive: boolean;
}

// Sample templates for demonstration
const SampleResetPasswordTemplate: EmailTemplateComponent = {
    id: 'sample-reset-password',
    name: 'Sample Reset Password',
    template: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Reset Password</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: {{background_color}}; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: {{container_background}}; padding: 30px; border-radius: 8px; }
        .header { text-align: center; margin-bottom: 30px; }
        .button { background: {{button_color}}; color: {{button_text_color}}; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; }
        .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 4px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Reset Your Password</h1>
        </div>
        <p>Hi {{user_name}},</p>
        <p>You requested a password reset for your {{company_name}} account.</p>
        <div class="warning">
            <strong>⏰ Important:</strong> This link expires in {{expiry_time}}.
        </div>
        <p><a href="{{reset_url}}" class="button">Reset Password</a></p>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Best regards,<br>{{company_name}} Support</p>
    </div>
</body>
</html>`,
    extractVariables: () => ['background_color', 'container_background', 'button_color', 'button_text_color', 'user_name', 'company_name', 'expiry_time', 'reset_url'],
    processTemplate: (vars: Record<string, string>) => {
        let processed = SampleResetPasswordTemplate.template;
        Object.entries(vars).forEach(([key, value]) => {
            processed = processed.replace(new RegExp(`{{${key}}}`, 'g'), value || '');
        });
        return processed;
    },
    component: ({ variables = {}, onUpdate = () => { } }) => {
        return React.createElement('div', {},
            React.createElement('input', {
                type: 'text',
                placeholder: 'Company Name',
                value: variables.company_name || '',
                onChange: (e: any) => onUpdate('company_name', e.target.value)
            }),
            React.createElement('br'),
            React.createElement('input', {
                type: 'text',
                placeholder: 'User Name',
                value: variables.user_name || '',
                onChange: (e: any) => onUpdate('user_name', e.target.value)
            }),
            React.createElement('br'),
            React.createElement('input', {
                type: 'url',
                placeholder: 'Reset URL',
                value: variables.reset_url || '',
                onChange: (e: any) => onUpdate('reset_url', e.target.value)
            }),
            React.createElement('br'),
            React.createElement('input', {
                type: 'text',
                placeholder: 'Expiry Time (e.g. 24 hours)',
                value: variables.expiry_time || '',
                onChange: (e: any) => onUpdate('expiry_time', e.target.value)
            }),
            React.createElement('br'),
            React.createElement('input', {
                type: 'color',
                title: 'Background Color',
                value: variables.background_color || '#f4f5f6',
                onChange: (e: any) => onUpdate('background_color', e.target.value)
            }),
            React.createElement('input', {
                type: 'color',
                title: 'Button Color',
                value: variables.button_color || '#007ace',
                onChange: (e: any) => onUpdate('button_color', e.target.value)
            })
        );
    }
};

// Registry of all available templates with metadata
export const EMAIL_TEMPLATE_REGISTRY: TemplateRegistryEntry[] = [
    {
        component: WelcomeEmailComponent,
        category: TEMPLATE_CATEGORIES.GENERAL,
        description: 'Professional welcome email with features showcase and modern design',
        sampleData: {
            company_name: 'Acme Corp',
            user_name: 'John Doe',
            get_started_url: 'https://example.com/get-started',
            dashboard_url: 'https://example.com/dashboard',
            feature_1_title: 'Fast Setup',
            feature_1_description: 'Get up and running in minutes with our intuitive interface',
            feature_2_title: 'Smart Analytics',
            feature_2_description: 'Track your progress with detailed insights and reports',
            feature_3_title: 'Expert Support',
            feature_3_description: '24/7 customer support to help you succeed',
            cta_message: 'Your account is ready and waiting for you. Let\'s dive in!',
            help_url: 'https://example.com/help',
            support_email: 'support@acmecorp.com',
            facebook_url: 'https://facebook.com/acmecorp',
            twitter_url: 'https://twitter.com/acmecorp',
            linkedin_url: 'https://linkedin.com/company/acmecorp',
            company_address: '123 Business St, Suite 100, City, ST 12345',
            unsubscribe_url: 'https://example.com/unsubscribe',
            preferences_url: 'https://example.com/preferences',
            background_color: '#f8f9fa',
            text_color: '#333333',
            container_background_color: '#ffffff',
            primary_color: '#007ace',
            secondary_color: '#0056b3',
            button_color: '#28a745',
            button_text_color: '#ffffff',
            button_hover_color: '#218838',
            feature_background_color: '#f8f9fa',
            cta_background_color: '#e9ecef',
            footer_background_color: '#f8f9fa',
            footer_text_color: '#666666'
        },
        isActive: true
    },
    {
        component: SampleResetPasswordTemplate,
        category: TEMPLATE_CATEGORIES.AUTHENTICATION,
        description: 'Password reset email with security warnings',
        sampleData: {
            company_name: 'Acme Corp',
            user_name: 'Jane Smith',
            reset_url: 'https://example.com/reset-password?token=abc123',
            expiry_time: '24 hours',
            background_color: '#f4f5f6',
            container_background: '#ffffff',
            button_color: '#dc3545',
            button_text_color: '#ffffff'
        },
        isActive: true
    }
];

// Helper functions for working with the registry
export function getTemplatesByCategory(category: TemplateCategory): TemplateRegistryEntry[] {
    return EMAIL_TEMPLATE_REGISTRY.filter(entry =>
        entry.category === category && entry.isActive
    );
}

export function getAllActiveTemplates(): TemplateRegistryEntry[] {
    return EMAIL_TEMPLATE_REGISTRY.filter(entry => entry.isActive);
}

export function getTemplateById(id: string): TemplateRegistryEntry | undefined {
    return EMAIL_TEMPLATE_REGISTRY.find(entry => entry.component.id === id);
}

export function getTemplateCategories(): TemplateCategory[] {
    return Object.values(TEMPLATE_CATEGORIES);
}

// Get just the components for backward compatibility
export function getAllTemplateComponents(): EmailTemplateComponent[] {
    return getAllActiveTemplates().map(entry => entry.component);
}