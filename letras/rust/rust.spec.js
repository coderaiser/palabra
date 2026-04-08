import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: rust', async ({comprar}) => {
    await comprar('rust');
});
