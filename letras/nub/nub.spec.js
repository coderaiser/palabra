import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: nub', async ({comprar}) => {
    await comprar('nub');
});
