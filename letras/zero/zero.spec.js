import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: zero', async ({comprar}) => {
    await comprar('zero');
});
