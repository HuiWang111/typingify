/*
 * @Autor: hui.wang
 * @Date: 2022-02-19 20:24:48
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 16:25:42
 * @emial: hui.wang@bizfocus.cn
 */
export interface XML {
    name?: string;
    wrapped?: boolean;
}

export interface PropertyScheme {
    type?: 'integer'
        | 'string'
        | 'boolean'
        | 'array'
        | 'object';
    format?: 'int32' | 'int64' | 'date-time';
    $ref?: string; // example: #/definitions/Category
    example?: any;
    xml?: XML;
    enum?: string[];
    description?: string;
    items?: PropertyScheme; // if type is 'array'
}

export interface Definition {
    type: 'object';
    properties: Record<string, PropertyScheme>;
    xml?: XML;
    required?: string[];
}

export type Definitions = Record<string, Definition>;
