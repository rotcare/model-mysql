import { codegen, Model } from '@rotcare/codegen';
import { genEnsureTableExists } from './genEnsureTableExists';
import { should } from './should';
import { Product } from './testModels/Product';
import { strict } from 'assert';
import { isTableExists } from './isTableExists';
import { ensureTableDeleted } from './ensureTableDeleted';

const ensureProductExists = codegen((product: Model<Product>) => {
    return genEnsureTableExists(product);
});

it(
    'genEnsureTableExists',
    should('create the table', async (conn) => {
        await ensureTableDeleted(conn, 'Product');
        await ensureProductExists(conn);
        strict.equal(await isTableExists(conn, { table: 'Product' }), true);
    }),
);
