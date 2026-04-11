import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: yara', async ({comprar}) => {
    await comprar('yara');
});
