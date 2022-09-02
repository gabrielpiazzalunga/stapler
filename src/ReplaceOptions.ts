enum DocumentFormat{
    PDF,
    DOCX
}

export class ReplaceOptions {
    ruleGroup: string;
    outputFormat: DocumentFormat;
    documentAddress: string;
    documentBase64: string;
    replaceVariables: Map<string,string>;
}