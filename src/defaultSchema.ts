export const defaultSchema = {
    get(): string {
        throw new Error('defaultSchema not set');
    },
    async with(defaultSchema: string, cb: () => Promise<void>) {
        this.get = () => {
            return defaultSchema;
        };
        try {
            return await cb();
        } finally {
            this.get = () => {
                throw new Error('defaultSchema not set');
            };
        }
    },
};
