import { Entity, Scene } from '@rotcare/io';
import { mysql } from '../mysql';
import { subsetOf } from '../../../io-mysql/src/subsetOf';

@mysql
export class Product extends Entity {
    @mysql.column('varchar(255)')
    public id: string;
    @mysql.column('varchar(255)')
    public name: string;
    @mysql.column('int')
    public price: number = 0;

    public static cheapProducts = subsetOf(Product, 'price < 100', class {});

    public static queryProductsByPriceRange = subsetOf(
        Product,
        'price > :lowPrice AND price < :highPrice',
        class {
            highPrice: number;
            lowPrice: number;
        },
    );

    public static async createProduct(scene: Scene, props: Partial<Product>) {
        return await scene.io.database.insert(scene, Product, props);
    }
    public static async queryProduct(scene: Scene, props: Partial<Product>) {
        return await scene.io.database.query(scene, Product, props);
    }
    public async updatePrice(scene: Scene, newPrice: number) {
        this.price = newPrice;
        await scene.io.database.update(scene, this.table, this);
    }
    public async deleteMe(scene: Scene) {
        await scene.io.database.delete(scene, this.table, this);
    }
}
