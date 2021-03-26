import { codegen, Model } from '@rotcare/codegen';
import { genEnsureTableExists } from './genEnsureTableExists';
import { genEnsureTablesConsistent } from './genEnsureTablesConsistent';
import { should } from './should';
import { Product } from './testModels/Product';

const ensureProductExists = codegen((product: Model<Product>) => {
    return genEnsureTableExists(product);
})

const ensureTablesConsistent = codegen((...models: Model[]) => {
    return genEnsureTablesConsistent(models);
}) 

it(
    'genEnsureTablesConsistent',
    should('not throw exception', async (conn) => {
        await ensureProductExists(conn);
        await ensureTablesConsistent(conn);
    }),
);
