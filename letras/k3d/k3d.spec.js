import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: k3d', async ({comprar}) => {
    await comprar('k3d');
});
