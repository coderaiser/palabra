import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: bun', async ({comprar}) => {
    await comprar('bun');
});
