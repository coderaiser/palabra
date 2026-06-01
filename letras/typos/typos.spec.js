import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: typos', async ({comprar}) => {
    await comprar('typos');
});
