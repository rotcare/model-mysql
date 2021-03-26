import { codegen, Model } from '@rotcare/codegen';
import { should } from './should';
import { Product } from './testModels/Product';
import { strict } from 'assert';
import { ensureTableDeleted } from './ensureTableDeleted';
import { genEnsureColumnExists } from './genEnsureColumnExists';
import { isColumnExists } from './isColumnExists';

const ensureProductPriceExists = codegen((product: Model<Product>) => {
    return genEnsureColumnExists(product, 'price');
});

it(
    'genEnsureColumnExists',
    should('add the column', async (conn) => {
        await ensureTableDeleted(conn, 'Product');
        await conn.execute(`CREATE TABLE Product (
            id varchar(255) PRIMARY KEY,
            name varchar(255))`);
        await ensureProductPriceExists(conn);
        strict.equal(await isColumnExists(conn, { table: 'Product', column: 'price' }), true);
    }),
);
