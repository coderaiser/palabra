import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: mwget', async ({comprar}) => {
    await comprar('mwget');
});
