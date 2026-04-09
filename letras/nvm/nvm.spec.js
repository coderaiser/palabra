import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: nvm', async ({comprar}) => {
    await comprar('nvm');
});
