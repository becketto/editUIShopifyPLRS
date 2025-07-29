import React, { useState, useCallback } from 'react';
import { Box, BlockStack, Text, Button, InlineStack, Icon, InlineGrid, Select, Badge, Card, ButtonGroup } from '@shopify/polaris';
import { PaintBrushFlatIcon, ViewIcon } from '@shopify/polaris-icons';
import { EmailTemplateComponent } from '../types/emailTemplate';
import {
    getAllActiveTemplates,
    getTemplatesByCategory,
    getTemplateCategories,
    TemplateRegistryEntry,
    TEMPLATE_CATEGORIES
} from '../utils/templateRegistry';

interface EmailTemplatesModalContentProps {
    selectedTemplateEntry?: TemplateRegistryEntry;
    templateVariables: Record<string, string>;
    onTemplateChange: (entry: TemplateRegistryEntry) => void;
    onVariableUpdate: (key: string, value: string) => void;
    onUseSampleData: () => void;
}

export const EmailTemplatesModalContent: React.FC<EmailTemplatesModalContentProps> = ({
    selectedTemplateEntry,
    templateVariables,
    onTemplateChange,
    onVariableUpdate,
    onUseSampleData
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const allTemplates = getAllActiveTemplates();
    const categories = getTemplateCategories();

    // Default to first template if none selected
    const currentTemplate = selectedTemplateEntry || allTemplates[0];

    // Get filtered templates based on selected category
    const filteredTemplates = selectedCategory === 'all'
        ? allTemplates
        : getTemplatesByCategory(selectedCategory as any);

    const processedContent = currentTemplate?.component.processTemplate(templateVariables) || '';

    // Category options for the filter
    const categoryOptions = [
        { label: 'All Templates', value: 'all' },
        ...categories.map(cat => ({ label: cat, value: cat }))
    ];

    // Template options for the dropdown - USE FILTERED templates based on category
    const templateOptions = filteredTemplates.map(entry => ({
        label: entry.component.name,
        value: entry.component.id
    }));

    const handleTemplateSelect = useCallback((templateId: string) => {
        const templateEntry = allTemplates.find(entry => entry.component.id === templateId);

        if (templateEntry && templateEntry.component.id !== currentTemplate?.component.id) {
            onTemplateChange(templateEntry);
        }
    }, [allTemplates, onTemplateChange, currentTemplate?.component.id]);

    const handleCategoryChange = useCallback((category: string) => {
        setSelectedCategory(category);

        // If current template is not in the new category, select first template from new category
        const newFilteredTemplates = category === 'all'
            ? allTemplates
            : getTemplatesByCategory(category as any);

        const currentTemplateInCategory = newFilteredTemplates.find(t => t.component.id === currentTemplate?.component.id);

        if (!currentTemplateInCategory && newFilteredTemplates.length > 0) {
            onTemplateChange(newFilteredTemplates[0]);
        }
    }, [allTemplates, currentTemplate?.component.id, onTemplateChange]);

    // Check if current template is in the filtered list
    const isCurrentTemplateInCategory = filteredTemplates.some(t => t.component.id === currentTemplate?.component.id);
    const displayValue = isCurrentTemplateInCategory ? currentTemplate?.component.id || '' : '';

    return (
        <Box
            position="absolute"
            insetBlockStart="0"
            insetInlineStart="0"
            width="100%"
            minHeight="100vh"
        >
            <InlineGrid columns="49px auto 1fr" gap="0">
                {/* Left sidebar - Theme button (DISABLED) */}
                <Box
                    borderColor="border"
                    borderStyle="solid"
                    borderInlineStartWidth="025"
                    borderInlineEndWidth="025"
                    borderBlockEndWidth="025"
                    borderBlockStartWidth="0"
                    minHeight="100vh"
                    padding="200"
                    background="bg-surface"
                >
                    <InlineStack align="center">
                        <Button
                            variant="tertiary"
                            accessibilityLabel="Theme customization (coming soon)"
                        >
                            <Icon source={PaintBrushFlatIcon} />
                            {/* Theme customization placeholder */}
                        </Button>
                    </InlineStack>
                </Box>

                {/* Template selection and settings panel */}
                <div style={{
                    maxWidth: '420px',
                    minWidth: '350px',
                    borderRight: '1px solid var(--p-color-border)',
                    minHeight: '100vh',
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    backgroundColor: 'var(--p-color-bg-surface)'
                }}>
                    <div style={{ padding: '1rem' }}>
                        <BlockStack gap="400">
                            {/* Category Filter */}
                            <Select
                                label="Category"
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                value={selectedCategory}
                            />

                            {/* Template Selection */}
                            <Select
                                label="Template"
                                options={templateOptions}
                                onChange={handleTemplateSelect}
                                value={displayValue}
                                placeholder={!isCurrentTemplateInCategory ? "Select a template from this category" : undefined}
                            />

                            {/* Template Info Card */}
                            {currentTemplate && (
                                <Card>
                                    <BlockStack gap="200">
                                        <InlineStack align="space-between">
                                            <Text as="h3" variant="headingMd">{currentTemplate.component.name}</Text>
                                            <Badge tone="info">{currentTemplate.category}</Badge>
                                        </InlineStack>
                                        <Text as="p" variant="bodyMd" tone="subdued">
                                            {currentTemplate.description}
                                        </Text>
                                        <ButtonGroup>
                                            <Button
                                                size="slim"
                                                icon={ViewIcon}
                                                onClick={onUseSampleData}
                                            >
                                                Use Sample Data
                                            </Button>
                                        </ButtonGroup>
                                    </BlockStack>
                                </Card>
                            )}

                            {/* Template Settings */}
                            <div key={currentTemplate?.component.id}>
                                <BlockStack gap="300">
                                    <Text as="h2" variant="headingMd">Template Settings</Text>
                                    {currentTemplate && React.createElement(currentTemplate.component.component, {
                                        variables: templateVariables,
                                        onUpdate: onVariableUpdate
                                    })}
                                </BlockStack>
                            </div>
                        </BlockStack>
                    </div>
                </div>

                {/* Preview area */}
                <Box
                    borderColor="border"
                    borderStyle="solid"
                    borderInlineStartWidth="0"
                    borderInlineEndWidth="0"
                    borderBlockEndWidth="0"
                    borderBlockStartWidth="0"
                    minHeight="100vh"
                    padding="0"
                >
                    <BlockStack gap="0">
                        <div style={{
                            position: 'sticky',
                            top: 0,
                            backgroundColor: 'white',
                            zIndex: 10,
                            borderBottom: '1px solid var(--p-color-border)',
                            padding: '1rem'
                        }}>
                            <InlineStack align="space-between">
                                <Text as="h2" variant="headingMd">Preview</Text>
                                {currentTemplate && (
                                    <Badge tone="success">
                                        {currentTemplate.component.name}
                                    </Badge>
                                )}
                            </InlineStack>
                        </div>
                        <div style={{
                            flex: '1 1 auto',
                            display: 'flex',
                            flexDirection: 'column',
                            minHeight: 'calc(100vh - 80px)'
                        }}>
                            <iframe
                                key={`${currentTemplate?.component.id}-${JSON.stringify(templateVariables)}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    border: 'none',
                                    flex: '1 1 auto',
                                    minHeight: '600px'
                                }}
                                srcDoc={processedContent}
                            />
                        </div>
                    </BlockStack>
                </Box>
            </InlineGrid>
        </Box>
    );
};