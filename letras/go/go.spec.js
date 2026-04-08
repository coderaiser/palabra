import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: go', async ({comprar}) => {
    await comprar('go');
});
