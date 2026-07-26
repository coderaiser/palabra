import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: coverage', async ({comprar}) => {
    await comprar('coverage');
});
