import { Model } from "@rotcare/codegen";

export function genAddColumn(model: Model, columnName: string) {
    for (const prop of model.properties) {
        if (prop.name === columnName) {
            const dataType = prop.decorators.column;
            if (!dataType) {
                throw new Error(`missing @mysql.column on property ${model.tableName}.${columnName}`);
            }
            return `ALTER TABLE ${model.tableName} ADD ${columnName} ${prop.decorators.column}`;
        }
    }
    throw new Error(`${columnName} not found in ${model.tableName}`);
}