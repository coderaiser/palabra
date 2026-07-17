import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: kustomize', async ({comprar}) => {
    await comprar('kustomize');
});
