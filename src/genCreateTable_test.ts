import { codegen, Model } from "@rotcare/codegen"
import { genCreateTable } from "./genCreateTable";
import { Product } from "./testModels/Product"
import * as mysql from 'mysql2/promise';

const createProduct = codegen((product: Model<Product>) => {
    return `return ${JSON.stringify(genCreateTable(product))}`;
})

describe('genCreateTable', () => {
    let conn: mysql.Connection;
    beforeEach(async () => {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'test',
        });
    })
    afterEach(async () => {
        conn.destroy();
    });
    it('columns', async () => {
        await conn.execute('DROP TABLE IF EXISTS Product');
        await conn.execute(createProduct);
    })
})