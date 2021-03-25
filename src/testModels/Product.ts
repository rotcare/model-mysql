import { mysql } from '../mysql';

@mysql
export class Product {
    @mysql.column('varchar(255)')
    public id: string;
    @mysql.column('varchar(255)')
    public name: string;
    @mysql.column('int')
    public price: number = 0;
}
