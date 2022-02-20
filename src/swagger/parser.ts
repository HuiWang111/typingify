/*
 * @Autor: hui.wang
 * @Date: 2022-02-19 20:47:22
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 17:16:02
 * @emial: hui.wang@bizfocus.cn
 */
import { Definitions, PropertyScheme, Definition } from './interface'
import { last } from '../utils'

const typeMap = {
    integer: 'number',
    string: 'string',
    boolean: 'boolean'
}

/**
 * @description: 解析swagger数据结构定义，生成ts interface
 * @param {Definitions} definitions
 * @return {string}
 * TODO: 解析深度结构的类型
 */
export function typeParser(definitions: Definitions): string {
    if (!definitions) {
        throw new Error('definitions is empty')
    }
    const _hasOwn = Object.prototype.hasOwnProperty
    let code = ''
    const tabSize = 4

    const parseScheme = (
        propertyName: string,
        scheme: PropertyScheme,
        model: string[],
        optionalSign: '' | '?',
        tab = tabSize,
    ) => {
        const { type, $ref, enum: e, items } = scheme
        const propertyGenerator = createPropertyGenerator(tab, propertyName, optionalSign)

        if ($ref) {
            model.push(propertyGenerator(last($ref.split('/'))))
        } else if (type === 'string' && (e?.length && e.length > 0)) {
            model.push(propertyGenerator(e.map(i => `'${i}'`).join(' | ')))
        } else if (type === 'array') {
            if (!items) {
                throw new Error(`if type is array, items is required`)
            }

            const { $ref, type } = items

            if ($ref) {
                model.push(propertyGenerator(`${last($ref.split('/'))}[]`))
            } else if (type === 'object') {
                // model.push(`${' '.repeat(tab)}${propertyName}${optionalSign}: {\n`)
                
                // model.push(`${' '.repeat(tab)}}[];\n`)
            } else if (type) {
                model.push(propertyGenerator(`${typeMap[type]}[]`))
            }
        } else if (type) {
            model.push(propertyGenerator(typeMap[type]))
        }
    }

    const createPropertyGenerator = (
        tab: number,
        propertyName: string,
        optionalSign: '' | '?'
    ): (type: string) => string => {
        return (type: string) => `${' '.repeat(tab)}${propertyName}${optionalSign}: ${type};\n`
    }

    const parseDefination = (
        definition: Definition,
        model: string[],
        modelName?: string,
        tab?: number,
        propertyName?: string,
        optionalSign?: '' | '?',
        isArray = false
    ) => {
        const { required, properties } = definition
        const doseNotHasRequired = !required || required.length === 0
        
        if (modelName) {
            model.push(`export interface ${modelName} {\n`)
        } else if (tab && propertyName && optionalSign) {
            model.push(`${' '.repeat(tab)}${propertyName}${optionalSign}: {\n`)
        } else {
            throw new Error('one of [model, tab & propertyName & optionalSign] must be exists')
        }

        for (const propertyName in properties) {
            const optionalSign = doseNotHasRequired
                ? '?'
                : required.includes(propertyName) ? '' : '?'

            parseScheme(
                propertyName,
                properties[propertyName],
                model,
                optionalSign
            )
        }

        if (modelName) {
            model.push(`};\n`)
        } else if (tab) {
            model.push(`${' '.repeat(tab)}}${isArray ? '[]' : ''};\n`)
        }
    }

    for (const modelName in definitions) {
        const model: string[] = []

        if (_hasOwn.call(definitions, modelName)) {
            parseDefination(
                definitions[modelName],
                model,
                modelName
            )
        }

        code += model.join('')
    }
    
    return code
}