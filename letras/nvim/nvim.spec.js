import {createTest} from '#test';

const test = createTest(import.meta.url);

test('palabra: letras: nvim', async ({comprar}) => {
    await comprar('nvim');
});

test('palabra: letras: nvim: v1.0.0', async ({comprar}) => {
    await comprar('nvim-v1.0.0', {
        nvim: '1.0.0',
    });
});

