import { codegen, Model } from '@rotcare/codegen';
import { genCreateTable } from './genCreateTable';
import { Product } from './testModels/Product';
import { ensureTableDeleted } from './ensureTableDeleted';
import { should } from './should';

const createProduct = codegen((product: Model<Product>) => {
    return `return ${JSON.stringify(genCreateTable(product))}`;
});

describe('genCreateTable', () => {
    it(
        'columns',
        should('be created', async (conn) => {
            ensureTableDeleted(conn, 'Product');
            await conn.execute(createProduct);
        }),
    );
});
