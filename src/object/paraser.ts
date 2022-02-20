/*
 * @Autor: hui.wang
 * @Date: 2022-02-20 17:14:35
 * @LastEditors: hui.wang
 * @LastEditTime: 2022-02-20 17:46:27
 * @emial: hui.wang@bizfocus.cn
 */

/**
 * @description: 解析普通的js对象，根据属性具体的类型来生成ts interface
 * @param {Record} data
 * @return {string}
 */
export function typeParser(data: Record<string | symbol, any>): string {
    if (!data) {
        throw new Error('data is empty')
    }
    const _hasOwn = Object.prototype.hasOwnProperty
    const tabSize = 4

    const createPropertyGenerator = (
        tab: number,
        propertyName: string
    ): (type: string) => string => {
        return (type: string) => `${' '.repeat(tab)}${propertyName}: ${type};\n`
    }

    const parser = (obj: Record<string | symbol, any>, code: string[] = [], tab = tabSize): string[] => {
        for (const key in obj) {
            const propertyGenerator = createPropertyGenerator(tab, key)

            if (_hasOwn.call(obj, key)) {
                const value = obj[key]
                const type = typeof value

                if (type === 'function') {
                    code.push(`${' '.repeat(tab)}// TODO: this is a function\n`)
                    code.push(propertyGenerator('() => void'))
                } else if (type === 'object') {
                    if (Array.isArray(value)) {
                        code.push(`${' '.repeat(tab)}// TODO: this is a array\n`)
                        code.push(propertyGenerator('any[]'))
                    } else if (value === null) {
                        code.push(propertyGenerator('null'))
                    } else {
                        code.push(`${' '.repeat(tab)}// TODO: this is a object\n`)
                        code.push(propertyGenerator('Record<string, anyt>'))
                    }
                } else {
                    code.push(propertyGenerator(type))
                }
            }
        }

        return code
    }

    return 'export interface SomeType {\n' + 
        parser(data).join('') + 
        '}\n'
}