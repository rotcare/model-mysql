import * as mysql from 'mysql2/promise';
import { defaultSchema } from './defaultSchema';

export function should(behavior: string, cb: (conn: mysql.Connection) => Promise<void>) {
    return async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test',
        });
        try {
            await defaultSchema.with('test', cb.bind(undefined, conn));
        } finally {
            conn.destroy();
        }
    }
}
