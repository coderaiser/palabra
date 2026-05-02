import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: nvchad', async ({comprar}) => {
    await comprar('nvchad');
});
