import { Model } from "@rotcare/codegen";
import { genCreateTable } from "./genCreateTable";
import * as mysql from 'mysql2/promise';

export function genEnsureTableExists(model: Model): (conn: mysql.Connection, schema?: string) => Promise<void> {
    return `return async (conn, schema) => {
        const { isTableExists } = require('@rotcare/model-mysql'); 
        if (await isTableExists(conn, { schema, table: '${model.tableName}'})) {
            return;
        }
        const sql = ${JSON.stringify(genCreateTable(model))};
        await conn.execute(sql);
    }` as any;
}