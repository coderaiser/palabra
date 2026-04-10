import {join} from 'node:path';
import {rendy} from 'rendy';
import {extract, isArchive} from './extract.js';
import {execute, isExecute} from './execute.js';
import {parseEnv} from './parse-env.js';
import {run} from './run.js';

const isBool = (a) => typeof a === 'boolean';

const {entries} = Object;

const isString = (a) => typeof a === 'string';

const addDefaults = (letra) => ({
    confirmar: true,
    directorio: '~/.local/src',
    ...letra,
});

export const parse = (letra) => {
    letra = addDefaults(letra);
    const envLine = parseEnv(letra);
    
    const commands = [];
    const {
        url,
        name,
        bin = `/bin/${name}`,
        hogar = name,
        directorio,
        preinstall,
        postinstall,
    } = letra;
    
    if (preinstall)
        commands.push(...run({
            letra,
            commands: preinstall,
            envLine,
        }));
    
    if (isArchive(letra))
        commands.push(...extract(letra));
    
    if (isExecute(letra))
        commands.push(...execute(letra));
    
    if (isBool(letra.execute) && !letra.execute) {
        const renderedURL = rendy(url, letra);
        commands.push(`curl -fsSL ${renderedURL}`);
    }
    
    commands.push(...createSymlinks({
        directorio,
        hogar,
        name,
        bin,
    }));
    
    if (letra.commands)
        commands.push(...run({
            letra,
            commands: letra.commands,
            envLine,
        }));
    
    if (postinstall)
        commands.push(...run({
            letra,
            commands: postinstall,
            envLine,
        }));
    
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
