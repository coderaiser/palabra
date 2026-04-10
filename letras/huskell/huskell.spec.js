import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: huskell', async ({comprar}) => {
    await comprar('huskell');
});
