import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: instapods', async ({comprar}) => {
    await comprar('instapods');
});
