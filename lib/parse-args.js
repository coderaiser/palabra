import yargsParse from 'yargs-parser';

export const parseArgs = (args) => {
    return yargsParse(args, {
        alias: {
            'install': 'i',
            'instalar': 'install',
            'quiet': 'q',
            'help': 'h',
            'dry-run': 'd',
        },
        boolean: ['install', 'quiet', 'help', 'dry-run'],
    });
};
