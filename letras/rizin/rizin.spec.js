import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: rizin', async ({comprar}) => {
    await comprar('rizin');
});
