import { Model } from "@rotcare/codegen";
import * as mysql from 'mysql2/promise';
import { genAddColumn } from "./genAddColumn";

export function genEnsureColumnExists(model: Model, columnName: string): (conn: mysql.Connection, schema?: string) => Promise<void> {
    return `return async (conn, schema) => {
        const { isColumnExists } = require('@rotcare/model-mysql');
        if (await isColumnExists(conn, { schema, table: '${model.tableName}', column: '${columnName}' })) {
            return;
        }
        const sql = ${JSON.stringify(genAddColumn(model, columnName))};
        await conn.execute(sql);
    }` as any;
}