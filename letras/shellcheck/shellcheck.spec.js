import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: shellcheck', async ({comprar}) => {
    await comprar('shellcheck');
});
