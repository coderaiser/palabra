import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: node', async ({comprar}) => {
    await comprar('node');
});
