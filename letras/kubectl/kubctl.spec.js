import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: kubectl', async ({comprar}) => {
    await comprar('kubectl');
});
