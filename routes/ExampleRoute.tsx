import React, { useState, useCallback } from "react";
import { EmailTemplatesModalContent } from "../components/EmailTemplatesModal";
import {
    getAllActiveTemplates,
    TemplateRegistryEntry
} from "../utils/templateRegistry";

export default function ExampleEmailTemplatesRoute() {
    const allTemplates = getAllActiveTemplates();
    const [selectedTemplateEntry, setSelectedTemplateEntry] = useState<TemplateRegistryEntry>(allTemplates[0]);
    const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});

    const handleVariableUpdate = useCallback((key: string, value: string) => {
        setTemplateVariables(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleTemplateChange = useCallback((entry: TemplateRegistryEntry) => {
        if (entry.component.id !== selectedTemplateEntry?.component.id) {
            setSelectedTemplateEntry(entry);
            // Reset variables when template changes
            setTemplateVariables({});
        }
    }, [selectedTemplateEntry]);

    const handleUseSampleData = useCallback(() => {
        if (selectedTemplateEntry?.sampleData) {
            setTemplateVariables(selectedTemplateEntry.sampleData);
        }
    }, [selectedTemplateEntry]);

    return (
        <>
            {/* Hide any existing navigation if needed */}
            <style>{`
        body { margin: 0; padding: 0; overflow: hidden; }
        html, body, #root { 
          height: 100vh; 
          max-height: 100vh; 
          overflow: hidden; 
        }
      `}</style>

            <div style={{
                padding: '0',
                margin: '0',
                height: '100vh',
                maxHeight: '100vh',
                overflow: 'hidden'
            }}>
                <EmailTemplatesModalContent
                    selectedTemplateEntry={selectedTemplateEntry}
                    templateVariables={templateVariables}
                    onTemplateChange={handleTemplateChange}
                    onVariableUpdate={handleVariableUpdate}
                    onUseSampleData={handleUseSampleData}
                />
            </div>
        </>
    );
}