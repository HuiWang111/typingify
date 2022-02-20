export interface XML {
    name?: string;
    wrapped?: boolean;
}
export interface PropertyScheme {
    type?: 'integer' | 'string' | 'boolean' | 'array' | 'object';
    format?: 'int32' | 'int64' | 'date-time';
    $ref?: string;
    example?: any;
    xml?: XML;
    enum?: string[];
    description?: string;
    items?: PropertyScheme;
}
export interface Definition {
    type: 'object';
    properties: Record<string, PropertyScheme>;
    xml?: XML;
    required?: string[];
}
export declare type Definitions = Record<string, Definition>;
