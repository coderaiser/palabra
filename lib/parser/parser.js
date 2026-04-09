import {extname, join} from 'node:path';
import {rendy} from 'rendy';
import {unpack} from './unpack.js';
import {execute} from './execute.js';
import {parseEnv} from './parse-env.js';

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
        hogar = name,
        directorio,
    } = letra;
    
    const ext = extname(new URL(url).pathname);
    
    if (ext === '.tgz' || ext === '.gz')
        commands.push(...unpack(letra));
    
    if (!ext || ext === '.sh')
        commands.push(...execute(letra));
    
    commands.push(...createSymlinks({
        directorio,
        hogar,
        name,
        bin,
    }));
    
    const envLine = parseEnv(letra);
    
    if (letra.commands)
        for (const command of letra.commands) {
            commands.push(`${envLine}${rendy(command, letra)}`);
        }
    
    return commands;
};

function createSymlinks({name, directorio, hogar, bin}) {
    const commands = [];
    const parsedBin = parseBin({
        name,
        hogar,
        bin,
    });
    
    const binDir = join(directorio, '..', `bin`);
    
    commands.push(`mkdir -p ${binDir}`);
    for (const [name, from] of entries(parsedBin)) {
        const binFrom = join(directorio, from);
        const binTo = join(binDir, name);
        
        commands.push(`ln -fs ${binFrom} ${binTo}`);
    }
    
    return commands;
}

function parseBin({name, hogar, bin}) {
    if (isString(bin))
        return {
            [name]: join(name, bin),
        };
    
    const result = {};
    
    for (const [currentName, binPath] of entries(bin)) {
        result[currentName] = join(hogar, binPath);
    }
    
    return result;
}

