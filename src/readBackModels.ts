import { Model } from '@rotcare/codegen';
import * as mysql from 'mysql2/promise';
import { defaultSchema } from './defaultSchema';

export async function readBackModels(conn: mysql.Connection, schema?: string) {
    const models: Record<string, Model> = {};
    await fillColumns(conn, models, schema || defaultSchema.get());
    return models;
}

function getModel(models: Record<string, Model>, tableName: string) {
    let model = models[tableName];
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
        models[tableName] = model;
    }
    return model;
}

async function fillColumns(conn: mysql.Connection, models: Record<string, Model>, schema: string) {
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