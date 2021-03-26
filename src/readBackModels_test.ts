import { ensureTableDeleted } from './ensureTableDeleted';
import { readBackModels } from './readBackModels';
import { should } from './should';
import { strict } from 'assert';

it(
    'read back columns',
    should('match', async (conn) => {
        ensureTableDeleted(conn, 'Product');
        await conn.execute(`CREATE TABLE Product (
            id varchar(255) PRIMARY KEY,
            name varchar(255),
            price int)`);
        const models = await readBackModels(conn, 'test');
        const product = models.Product!;
        strict.deepEqual(product.properties, [
            {
                name: 'id',
                readonly: false,
                decorators: {
                    column: ['varchar(255)'],
                },
            },
            {
                name: 'name',
                readonly: false,
                decorators: {
                    column: ['varchar(255)'],
                },
            },
            {
                name: 'price',
                readonly: false,
                decorators: {
                    column: ['int'],
                },
            },
        ]);
    }),
);
