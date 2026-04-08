import yargsParse from 'yargs-parser';

export const parseArgs = (args) => {
    return yargsParse(args, {
        alias: {
            q: 'quiet',
            h: 'help',
            d: 'directorio',
        },
        boolean: ['quiet', 'help', 'dry-run', 'directorio'],
    });
};
