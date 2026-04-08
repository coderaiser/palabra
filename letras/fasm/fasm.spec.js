import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: fasm', async ({comprar}) => {
    await comprar('fasm');
});
