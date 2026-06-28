import {run, cutEnv} from 'madrun';

const env = {
    PLATFORM: 'linux',
};

export default {
    'test': () => [env, `tape 'test/*.js' '{lib,letras}/**/*.spec.js'`],
    'watch:test': async () => [env, `nodemon -w lib -w test -x "${await cutEnv('test')}"`],
    'lint': () => `putout .`,
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'coverage': async () => [env, `c8 ${await cutEnv('test')}`],
    'report': () => 'c8 report --reporter=lcov',
};
