export function typeParser(data) {
    if (!data) {
        throw new Error('data is empty');
    }
    const _hasOwn = Object.prototype.hasOwnProperty;
    const tabSize = 4;
    const createPropertyGenerator = (tab, propertyName) => {
        return (type) => `${' '.repeat(tab)}${propertyName}: ${type};\n`;
    };
    const parser = (obj, code = [], tab = tabSize) => {
        for (const key in obj) {
            const propertyGenerator = createPropertyGenerator(tab, key);
            if (_hasOwn.call(obj, key)) {
                const value = obj[key];
                const type = typeof value;
                if (type === 'function') {
                    code.push(`${' '.repeat(tab)}// TODO: this is a function\n`);
                    code.push(propertyGenerator('() => void'));
                }
                else if (type === 'object') {
                    if (Array.isArray(value)) {
                        code.push(`${' '.repeat(tab)}// TODO: this is a array\n`);
                        code.push(propertyGenerator('any[]'));
                    }
                    else if (value === null) {
                        code.push(propertyGenerator('null'));
                    }
                    else {
                        code.push(`${' '.repeat(tab)}// TODO: this is a object\n`);
                        code.push(propertyGenerator('Record<string, anyt>'));
                    }
                }
                else {
                    code.push(propertyGenerator(type));
                }
            }
        }
        return code;
    };
    return 'export interface SomeType {\n' +
        parser(data).join('') +
        '}\n';
}
