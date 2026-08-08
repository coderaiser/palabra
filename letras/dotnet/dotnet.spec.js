import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: dotnet', async ({comprar}) => {
    await comprar('dotnet');
});
