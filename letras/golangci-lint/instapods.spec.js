import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: golangci-lint', async ({comprar}) => {
    await comprar('golangci-lint');
});
