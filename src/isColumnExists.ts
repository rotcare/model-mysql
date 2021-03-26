import * as mysql from 'mysql2/promise';
import { defaultSchema } from './defaultSchema';

export async function isColumnExists(
    conn: mysql.Connection,
    options: { schema?: string; table: string; column: string },
) {
    const [columns] = await conn.execute(
        `SELECT * FROM information_schema.columns WHERE 
        table_schema = ? AND table_name = ? AND column_name = ?`,
        [options.schema || defaultSchema.get(), options.table, options.column],
    );
    return (columns as any).length > 0;
}
