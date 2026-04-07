import {extname, join} from 'node:path';
import {unpack} from './unpack.js';
import {execute} from './execute.js';

const {entries} = Object;

const isString = (a) => typeof a === 'string';

const addDefaults = (letra) => ({
    confirmar: true,
    camino: '~/.local/src',
    ...letra,
});

export const parse = (letra) => {
    letra = addDefaults(letra);
    
    const commands = [];
    const {
        url,
        name,
        bin = `/bin/${name}`,
        camino,
    } = letra;
    
    const ext = extname(new URL(url).pathname);
    
    if (ext === '.tgz' || ext === '.gz')
        commands.push(...unpack(letra));
    
    if (!ext || ext === '.sh')
        commands.push(...execute(letra));
    
    commands.push(...createSymlinks({
        camino,
        name,
        bin,
    }));
    
    return commands;
};

function createSymlinks({camino, name, bin}) {
    const commands = [];
    const parsedBin = parseBin(name, bin);
    
    for (const [name, from] of entries(parsedBin)) {
        const binFrom = join(camino, from);
        const binTo = join(camino, '..', `bin/${name}`);
        
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
