export function mysql(clazz: { new (): any }) {}

mysql.column = (columnType: string) => {
    return (target: object, propertyKey: string) => {};
};
