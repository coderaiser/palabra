import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: f4', async ({comprar}) => {
    await comprar('f4');
});
