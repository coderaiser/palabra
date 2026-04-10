import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: haskell', async ({comprar}) => {
    await comprar('haskell');
});
