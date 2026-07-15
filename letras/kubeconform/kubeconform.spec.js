import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: kubeconform', async ({comprar}) => {
    await comprar('kubeconform');
});
