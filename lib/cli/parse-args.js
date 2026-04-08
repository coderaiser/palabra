import yargsParse from 'yargs-parser';

export const parseArgs = (args) => {
    return yargsParse(args, {
        alias: {
            q: 'quiet',
            h: 'help',
            d: 'directorio',
            v: 'version',
        },
        default: {
            directorio: '~/.local/src',
        },
        boolean: [
            'quiet',
            'help',
            'dry-run',
            'directorio',
            'version',
        ],
    });
};
