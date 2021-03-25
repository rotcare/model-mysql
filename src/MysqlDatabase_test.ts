import { Scene } from '@rotcare/io';
import { strict } from 'assert';
import { Product } from './testModels/Product';
import { should } from './should';
import { generateCreateTable } from './generateCreateTable';
import { codegen, Model } from '@rotcare/codegen';

const createProductTableSql = codegen((model: Model<Product>) => {
    return `return ${JSON.stringify(generateCreateTable(model))}`;
});

async function recreateProductTable(scene: Scene) {
    await scene.io.database.executeSql(scene, 'DROP TABLE IF EXISTS Product', {});
    await scene.io.database.executeSql(scene, createProductTableSql, {});
}

describe('MysqlDatabase', () => {
    it(
        '增删改查',
        should('work', async (scene) => {
            await recreateProductTable(scene);
            const apple = await scene.create(Product, { name: 'apple' });
            strict.ok(apple.id);
            await apple.updatePrice(scene, 100);
            strict.equal((await scene.query(Product, { price: 100 })).length, 1);
            await apple.deleteMe(scene);
            strict.equal((await scene.query(Product, {})).length, 0);
        }),
    );
    xit(
        'query cheapsProducts',
        should('return a subset of data', async (scene) => {
            await recreateProductTable(scene);
            await scene.create(Product, { name: 'apple', price: 102 });
            await scene.create(Product, { name: 'pear', price: 99 });
            const cheapProducts = await scene.query(Product.cheapProducts, {});
            strict.equal(1, cheapProducts.length);
        }),
    );
});
