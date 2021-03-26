import { Model } from "@rotcare/codegen";

export function assertModelsConsistent(actualModels: Record<string, Model>, expectedModels: Record<string, Model>) {
    const errors: string[] = [];
    for (const tableName of new Set([...Object.keys(actualModels), ...Object.keys(expectedModels)])) {
        assertTableConsistent(errors, tableName, actualModels[tableName], expectedModels[tableName]);
    }
    if (errors.length > 0) {
        for (const error of errors) {
            console.error(error);
        }
        throw new Error('models inconsistent');
    }
}

function assertTableConsistent(errors: string[], tableName: string, actualModel?: Model, expectedModel?: Model) {
    if (!expectedModel) {
        errors.push(`found extra table ${tableName}`);
        return;
    }
    if (!actualModel) {
        errors.push(`missing table ${tableName}`);
        return;
    }
}