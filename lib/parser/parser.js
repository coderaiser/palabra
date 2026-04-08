import {extname, join} from 'node:path';
import {unpack} from './unpack.js';
import {execute} from './execute.js';

const {entries} = Object;

const isString = (a) => typeof a === 'string';

const addDefaults = (letra) => ({
    confirmar: true,
    directorio: '~/.local/src',
    ...letra,
});

export const parse = (letra) => {
    letra = addDefaults(letra);
    
    const commands = [];
    const {
        url,
        name,
        bin = `/bin/${name}`,
        directorio,
    } = letra;
    
    const ext = extname(new URL(url).pathname);
    
    if (ext === '.tgz' || ext === '.gz')
        commands.push(...unpack(letra));
    
    if (!ext || ext === '.sh')
        commands.push(...execute(letra));
    
    commands.push(...createSymlinks({
        directorio,
        name,
        bin,
    }));
    
    if (letra.commands)
        commands.push(...letra.commands);
    
    return commands;
};

function createSymlinks({directorio, name, bin}) {
    const commands = [];
    const parsedBin = parseBin(name, bin);
    
    const binDir = join(directorio, '..', `bin`);
    commands.push(`mkdir -p ${binDir}`);
    for (const [name, from] of entries(parsedBin)) {
        const binFrom = join(directorio, from);
        const binTo = join(binDir, name);
        
        commands.push(`ln -fs ${binFrom} ${binTo}`);
    }
    
    return commands;
}

function parseBin(name, bin) {
    if (isString(bin))
        return {
            [name]: `${name}/${bin}`,
        };
    
    return bin;
}
