import { Model } from '@rotcare/codegen';
import { defaultSchema } from './defaultSchema';
import { SqlExecutor } from './SqlExecutor';

export async function readBackModels(conn: SqlExecutor, schema?: string) {
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

async function fillColumns(conn: SqlExecutor, models: Record<string, Model>, schema: string) {
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