import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: gdu', async ({comprar}) => {
    await comprar('gdu');
});
