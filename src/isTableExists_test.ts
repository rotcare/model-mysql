import { ensureTableDeleted } from './ensureTableDeleted';
import { should } from './should';
import { strict } from 'assert';
import { isTableExists } from './isTableExists';

it(
    'isTableExists with not existing table',
    should('tell it does not exists', async (conn) => {
        strict.equal(await isTableExists(conn, { schema: 'test', table: 'blah' }), false);
    }),
);

it(
    'isTableExists with existing table',
    should('tell it does exists', async (conn) => {
        ensureTableDeleted(conn, 'Product');
        await conn.execute(`CREATE TABLE Product (
            id varchar(255) PRIMARY KEY,
            name varchar(255),
            price int)`);
        strict.equal(await isTableExists(conn, { schema: 'test', table: 'Product' }), true);
    }),
);
