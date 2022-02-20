import { last } from '../utils';
const typeMap = {
    integer: 'number',
    string: 'string',
    boolean: 'boolean'
};
export function typeParser(definitions) {
    if (!definitions) {
        throw new Error('definitions is empty');
    }
    const _hasOwn = Object.prototype.hasOwnProperty;
    let code = '';
    const tabSize = 4;
    const parseScheme = (propertyName, scheme, model, optionalSign, tab = tabSize) => {
        const { type, $ref, enum: e, items } = scheme;
        const propertyGenerator = createPropertyGenerator(tab, propertyName, optionalSign);
        if ($ref) {
            model.push(propertyGenerator(last($ref.split('/'))));
        }
        else if (type === 'string' && ((e === null || e === void 0 ? void 0 : e.length) && e.length > 0)) {
            model.push(propertyGenerator(e.map(i => `'${i}'`).join(' | ')));
        }
        else if (type === 'array') {
            if (!items) {
                throw new Error(`if type is array, items is required`);
            }
            const { $ref, type } = items;
            if ($ref) {
                model.push(propertyGenerator(`${last($ref.split('/'))}[]`));
            }
            else if (type === 'object') {
            }
            else if (type) {
                model.push(propertyGenerator(`${typeMap[type]}[]`));
            }
        }
        else if (type) {
            model.push(propertyGenerator(typeMap[type]));
        }
    };
    const createPropertyGenerator = (tab, propertyName, optionalSign) => {
        return (type) => `${' '.repeat(tab)}${propertyName}${optionalSign}: ${type};\n`;
    };
    const parseDefination = (definition, model, modelName, tab, propertyName, optionalSign, isArray = false) => {
        const { required, properties } = definition;
        const doseNotHasRequired = !required || required.length === 0;
        if (modelName) {
            model.push(`export interface ${modelName} {\n`);
        }
        else if (tab && propertyName && optionalSign) {
            model.push(`${' '.repeat(tab)}${propertyName}${optionalSign}: {\n`);
        }
        else {
            throw new Error('one of [model, tab & propertyName & optionalSign] must be exists');
        }
        for (const propertyName in properties) {
            const optionalSign = doseNotHasRequired
                ? '?'
                : required.includes(propertyName) ? '' : '?';
            parseScheme(propertyName, properties[propertyName], model, optionalSign);
        }
        if (modelName) {
            model.push(`};\n`);
        }
        else if (tab) {
            model.push(`${' '.repeat(tab)}}${isArray ? '[]' : ''};\n`);
        }
    };
    for (const modelName in definitions) {
        const model = [];
        if (_hasOwn.call(definitions, modelName)) {
            parseDefination(definitions[modelName], model, modelName);
        }
        code += model.join('');
    }
    return code;
}
