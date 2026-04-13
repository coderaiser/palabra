import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: oxker', async ({comprar}) => {
    await comprar('oxker');
});
