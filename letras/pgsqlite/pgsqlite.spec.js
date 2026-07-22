import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: pgsqlite', async ({comprar}) => {
    await comprar('pgsqlite');
});
