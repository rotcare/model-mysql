import { ensureTableDeleted } from './ensureTableDeleted';
import { should } from './should';
import { strict } from 'assert';
import { isColumnExists } from './isColumnExists';

it(
    'isColumnExists with not existing table',
    should('tell it does not exists', async (conn) => {
        strict.equal(
            await isColumnExists(conn, { schema: 'test', table: 'abc', column: 'abcd' }),
            false,
        );
    }),
);

it(
    'isColumnExists with existing table',
    should('tell it does exists', async (conn) => {
        ensureTableDeleted(conn, 'Product');
        await conn.execute(`CREATE TABLE Product (
            id varchar(255) PRIMARY KEY,
            name varchar(255),
            price int)`);
        strict.equal(
            await isColumnExists(conn, { schema: 'test', table: 'Product', column: 'id' }),
            true,
        );
        strict.equal(
            await isColumnExists(conn, { schema: 'test', table: 'Product', column: 'abcd' }),
            false,
        );
    }),
);
