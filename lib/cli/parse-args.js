import process from 'node:process';
import yargsParse from 'yargs-parser';

export const parseArgs = (args) => {
    return yargsParse(args, {
        alias: {
            q: 'quiet',
            h: 'help',
            d: 'directorio',
            v: 'version',
        },
        string: ['directorio'],
        default: {
            directorio: process.env.PALABRA_DIR || '~/.local/src',
        },
        boolean: [
            'quiet',
            'help',
            'dry-run',
            'version',
        ],
    });
};
