const { syncDb } = require("../../task/sync-db")

describe('Pruebas en syncDb', () => {
    test('debe ejecutar dos veces el proceso', () => {
        syncDb()
        const times = syncDb()
        expect(times).toBe(2);
    });
});