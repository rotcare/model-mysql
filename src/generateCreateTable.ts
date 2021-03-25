import { Model } from '@rotcare/codegen';

export function generateCreateTable(model: Model) {
    if (!model.tableName) {
        throw new Error(`model ${model.qualifiedName} is not a table`);
    }
    const lines = [`CREATE TABLE ${model.tableName} (`]
    for (const [i, prop] of model.properties.entries()) {
        if (!prop.decorators.column) {
            continue;
        }
        let line = `${prop.name} ${prop.decorators.column[0]}`;
        if (prop.name === 'id') {
            line += ' PRIMARY KEY';
        }
        if (i !== model.properties.length - 1) {
            line += ',';
        }
        lines.push(line);
    }
    lines.push(')');
    return lines.join('\n');
}