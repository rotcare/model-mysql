import { Model } from "@rotcare/codegen";
import { SqlExecutor } from "./SqlExecutor";

export function genEnsureTablesConsistent(models: Model[]): (conn: SqlExecutor, schema?: string) => Promise<void> {
    const groupedModels: Record<string, Model> = {};
    for (const model of models) {
        groupedModels[model.tableName] = model;
    }
    return `return async (conn, schema) => {
        const { readBackModels, assertModelsConsistent } = require('@rotcare/model-mysql');
        const actualModels = await readBackModels(conn, schema);
        const expectedModels = ${JSON.stringify(groupedModels)};
        assertModelsConsistent(actualModels, expectedModels);
    }` as any
}