import * as mysql from 'mysql2/promise';

export async function isColumnExists(conn: mysql.Connection, schema: string, table: string, column: string) {
    const [columns] = await conn.execute(`SELECT * FROM information_schema.columns WHERE 
        table_schema = ? AND table_name = ? AND column_name = ?`, [schema, table, column])
    return (columns as any).length > 0;
}