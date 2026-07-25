import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: task', async ({comprar}) => {
    await comprar('task');
});
