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
            directorio: getDirectorio(process.env),
        },
        boolean: [
            'quiet',
            'help',
            'dry-run',
            'version',
        ],
    });
};

function getDirectorio(env) {
    const {PALABRA_DIR, XDG_DATA_HOME} = env;
    
    if (PALABRA_DIR)
        return PALABRA_DIR;
    
    if (XDG_DATA_HOME)
        return XDG_DATA_HOME;
    
    return '~/.local/share';
}
