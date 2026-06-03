import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: gh', async ({comprar}) => {
    await comprar('gh');
});
