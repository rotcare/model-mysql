import * as mysql from 'mysql2/promise';

export async function isTableExists(conn: mysql.Connection, schema: string, table: string) {
    const [tables] = await conn.execute('SELECT * FROM information_schema.tables WHERE table_schema = ? AND table_name = ?', [schema, table])
    return (tables as any).length > 0;
}