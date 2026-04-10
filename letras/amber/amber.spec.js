import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: amber', async ({comprar}) => {
    await comprar('amber');
});
