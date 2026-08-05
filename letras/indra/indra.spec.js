import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: indra', async ({comprar}) => {
    await comprar('indra');
});
