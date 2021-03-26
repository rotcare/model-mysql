import * as mysql from 'mysql2/promise';

export function should(behavior: string, cb: (conn: mysql.Connection) => Promise<void>) {
    return async() => {
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test',
        });
        try {
            await cb(conn);
        } finally {
            conn.destroy();
        }
    }
}
