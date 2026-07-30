import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: tape', async ({comprar}) => {
    await comprar('tape');
});
