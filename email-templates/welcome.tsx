import React from 'react';
import { EmailTemplateComponent, EmailTemplateComponentProps } from '../types/emailTemplate';

// HTML template content for welcome email
const welcomeTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to {{company_name}}!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: {{background_color}};
            margin: 0;
            padding: 0;
            color: {{text_color}};
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: {{container_background_color}};
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, {{primary_color}}, {{secondary_color}});
            text-align: center;
            padding: 40px 20px;
            color: white;
        }

        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }

        .header p {
            margin: 10px 0 0 0;
            font-size: 16px;
            opacity: 0.9;
        }

        .content {
            padding: 40px 30px;
            line-height: 1.6;
        }

        .welcome-message {
            text-align: center;
            margin-bottom: 30px;
        }

        .welcome-message h2 {
            color: {{primary_color}};
            font-size: 24px;
            margin-bottom: 10px;
        }

        .button {
            display: inline-block;
            background-color: {{button_color}};
            color: {{button_text_color}};
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
            text-align: center;
        }

        .button:hover {
            background-color: {{button_hover_color}};
        }

        .features {
            margin: 30px 0;
        }

        .feature {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px;
            background-color: {{feature_background_color}};
            border-radius: 5px;
        }

        .feature-icon {
            width: 40px;
            height: 40px;
            background-color: {{primary_color}};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            margin-right: 15px;
            font-size: 18px;
        }

        .feature-content h3 {
            margin: 0 0 5px 0;
            color: {{primary_color}};
            font-size: 16px;
        }

        .feature-content p {
            margin: 0;
            color: {{text_color}};
            font-size: 14px;
        }

        .cta-section {
            text-align: center;
            background-color: {{cta_background_color}};
            padding: 30px;
            border-radius: 5px;
            margin: 30px 0;
        }

        .footer {
            background-color: {{footer_background_color}};
            padding: 30px;
            text-align: center;
            color: {{footer_text_color}};
            font-size: 14px;
        }

        .footer a {
            color: {{primary_color}};
            text-decoration: none;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-links a {
            display: inline-block;
            margin: 0 10px;
            padding: 8px;
            background-color: {{primary_color}};
            color: white;
            border-radius: 50%;
            text-decoration: none;
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 20px;
        }

        @media (max-width: 600px) {
            .container {
                margin: 10px;
            }
            
            .content {
                padding: 20px 15px;
            }
            
            .feature {
                flex-direction: column;
                text-align: center;
            }
            
            .feature-icon {
                margin-right: 0;
                margin-bottom: 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>Welcome to {{company_name}}!</h1>
            <p>We're thrilled to have you join our community</p>
        </div>

        <!-- Main Content -->
        <div class="content">
            <div class="welcome-message">
                <h2>Hello {{user_name}}! 👋</h2>
                <p>Thank you for signing up. You're now part of something amazing!</p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center;">
                <a href="{{get_started_url}}" class="button">Get Started Now</a>
            </div>

            <!-- Features -->
            <div class="features">
                <div class="feature">
                    <div class="feature-icon">🚀</div>
                    <div class="feature-content">
                        <h3>{{feature_1_title}}</h3>
                        <p>{{feature_1_description}}</p>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">💡</div>
                    <div class="feature-content">
                        <h3>{{feature_2_title}}</h3>
                        <p>{{feature_2_description}}</p>
                    </div>
                </div>
                
                <div class="feature">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-content">
                        <h3>{{feature_3_title}}</h3>
                        <p>{{feature_3_description}}</p>
                    </div>
                </div>
            </div>

            <!-- Call to Action Section -->
            <div class="cta-section">
                <h3>Ready to get started?</h3>
                <p>{{cta_message}}</p>
                <a href="{{dashboard_url}}" class="button">Visit Your Dashboard</a>
            </div>

            <!-- Help Section -->
            <div style="text-align: center; margin: 30px 0;">
                <p>Need help getting started? We're here for you!</p>
                <p>
                    <a href="{{help_url}}" style="color: {{primary_color}};">Visit Help Center</a> | 
                    <a href="mailto:{{support_email}}" style="color: {{primary_color}};">Contact Support</a>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="social-links">
                <a href="{{facebook_url}}">f</a>
                <a href="{{twitter_url}}">t</a>
                <a href="{{linkedin_url}}">in</a>
            </div>
            
            <p><strong>{{company_name}}</strong></p>
            <p>{{company_address}}</p>
            
            <p style="margin-top: 20px;">
                You received this email because you signed up for {{company_name}}.<br>
                <a href="{{unsubscribe_url}}">Unsubscribe</a> | 
                <a href="{{preferences_url}}">Email Preferences</a>
            </p>
        </div>
    </div>
</body>
</html>`;

// React component for template settings
const WelcomeEmailSettings: React.FC<EmailTemplateComponentProps> = ({
    variables = {},
    onUpdate = () => { }
}) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Company Info */}
            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Company Name
                </label>
                <input
                    type="text"
                    placeholder="Your Company"
                    value={variables.company_name || ''}
                    onChange={(e) => onUpdate('company_name', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    User Name
                </label>
                <input
                    type="text"
                    placeholder="John Doe"
                    value={variables.user_name || ''}
                    onChange={(e) => onUpdate('user_name', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {/* URLs */}
            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Get Started URL
                </label>
                <input
                    type="url"
                    placeholder="https://example.com/get-started"
                    value={variables.get_started_url || ''}
                    onChange={(e) => onUpdate('get_started_url', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Dashboard URL
                </label>
                <input
                    type="url"
                    placeholder="https://example.com/dashboard"
                    value={variables.dashboard_url || ''}
                    onChange={(e) => onUpdate('dashboard_url', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {/* Features */}
            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Feature 1 Title
                </label>
                <input
                    type="text"
                    placeholder="Fast Setup"
                    value={variables.feature_1_title || ''}
                    onChange={(e) => onUpdate('feature_1_title', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Feature 1 Description
                </label>
                <input
                    type="text"
                    placeholder="Get up and running in minutes"
                    value={variables.feature_1_description || ''}
                    onChange={(e) => onUpdate('feature_1_description', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {/* Colors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                        Primary Color
                    </label>
                    <input
                        type="color"
                        value={variables.primary_color || '#007ace'}
                        onChange={(e) => onUpdate('primary_color', e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                        Button Color
                    </label>
                    <input
                        type="color"
                        value={variables.button_color || '#28a745'}
                        onChange={(e) => onUpdate('button_color', e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '4px' }}
                    />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>
                    Support Email
                </label>
                <input
                    type="email"
                    placeholder="support@company.com"
                    value={variables.support_email || ''}
                    onChange={(e) => onUpdate('support_email', e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            </div>
        </div>
    );
};

// Extract variables from template
function extractVariables(): string[] {
    const matches = welcomeTemplate.match(/\{\{([^}]+)\}\}/g);
    if (!matches) return [];

    return [...new Set(matches.map(match => match.slice(2, -2)))];
}

// Process template with variables
function processTemplate(vars: Record<string, string>): string {
    let processed = welcomeTemplate;

    Object.entries(vars).forEach(([key, value]) => {
        const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
        processed = processed.replace(regex, value || '');
    });

    return processed;
}

// Export the complete template component
const WelcomeEmailComponent: EmailTemplateComponent = {
    id: 'welcome-email',
    name: 'Welcome Email',
    template: welcomeTemplate,
    extractVariables,
    processTemplate,
    component: WelcomeEmailSettings
};

export default WelcomeEmailComponent;