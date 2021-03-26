import * as mysql from 'mysql2/promise';
import { defaultSchema } from './defaultSchema';

export async function isTableExists(
    conn: mysql.Connection,
    options: { schema?: string; table: string },
) {
    const [
        tables,
    ] = await conn.execute(
        'SELECT * FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',
        [options.schema || defaultSchema.get(), options.table],
    );
    return (tables as any).length > 0;
}
