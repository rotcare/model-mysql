import { Model } from '@rotcare/codegen';
import * as mysql from 'mysql2/promise';

export async function readBackModel(conn: mysql.Connection, schema: string) {
    const models = new Map<string, Model>();
    await fillColumns(conn, models, schema);
    return models;
}

function getModel(models: Map<string, Model>, tableName: string) {
    let model = models.get(tableName);
    if (!model) {
        model = {
            cacheHash: 0,
            qualifiedName: '',
            tableName,
            decorators: {},
            properties: [],
            staticProperties: [],
            methods: [],
            staticMethods: []
        };
        models.set(tableName, model);
    }
    return model;
}

async function fillColumns(conn: mysql.Connection, models: Map<string, Model>, schema: string) {
    const [columns] = await conn.execute('SELECT * FROM information_schema.columns WHERE table_schema = ?', [schema])
    for (const column of columns as any) {
        const model = getModel(models, column.TABLE_NAME);
        model.properties.push({
            name: column.COLUMN_NAME,
            readonly: false,
            decorators: {
                'column': [column.COLUMN_TYPE]
            }
        })
    }
}