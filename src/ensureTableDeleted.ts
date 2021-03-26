import * as mysql from 'mysql2/promise';

export async function ensureTableDeleted(conn: mysql.Connection, tableName: string) {
    await conn.execute(`DROP TABLE IF EXISTS ${tableName}`);
}