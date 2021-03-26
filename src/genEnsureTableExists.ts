import { Model } from "@rotcare/codegen";
import { genCreateTable } from "./genCreateTable";
import { SqlExecutor } from "./SqlExecutor";

export function genEnsureTableExists(model: Model): (conn: SqlExecutor, schema?: string) => Promise<void> {
    return `return async (conn, schema) => {
        const { isTableExists } = require('@rotcare/model-mysql'); 
        if (await isTableExists(conn, { schema, table: '${model.tableName}'})) {
            return;
        }
        const sql = ${JSON.stringify(genCreateTable(model))};
        await conn.execute(sql);
    }` as any;
}