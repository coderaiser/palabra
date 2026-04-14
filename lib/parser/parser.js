import {join} from 'node:path';
import {rendy} from 'rendy';
import {rename} from './rename.js';
import {extract, isArchive} from './extract.js';
import {execute, isExecute} from './execute.js';
import {parseEnv} from './parse-env.js';
import {run} from './run.js';
import {download} from './download.js';
import {prepare} from './prepare.js';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

const isBool = (a) => typeof a === 'boolean';

const {entries} = Object;

const isString = (a) => typeof a === 'string';

export const parse = (letra) => {
    const tinta = prepare(letra);
    const commands = [];
    
    const {
        url,
        beforeInstall,
        afterInstall,
        test,
        name,
        bin = `/bin/${name}`,
        directorio,
    } = tinta;
    
    const envLine = parseEnv(tinta);
    
    if (beforeInstall)
        commands.push(...run({
            letra: tinta,
            commands: beforeInstall,
            envLine,
        }));
    
    if (tinta.preparado)
        commands.push(...download(tinta));
    else if (isArchive(tinta))
        commands.push(...extract(tinta));
    else if (isExecute(tinta))
        commands.push(...execute(tinta));
    
    if (isBool(tinta.execute) && !tinta.execute) {
        const renderedURL = rendy(url, tinta);
        commands.push(`curl -fsSL ${renderedURL}`);
    }
    
    commands.push(...createSymlinks(tinta));
    
    if (tinta.rename)
        commands.push(...rename(tinta));
    
    if (tinta.commands)
        commands.push(...run({
            letra: tinta,
            commands: tinta.commands,
            envLine,
        }));
    
    if (afterInstall)
        commands.push(...run({
            letra: tinta,
            commands: afterInstall,
            envLine,
        }));
    
    if (tinta.executable && isString(bin))
        commands.push(`chmod +x ${rendy(join(directorio, name, bin), tinta)}`);
    
    if (test)
        for (const testCommand of maybeArray(test)) {
            const cmd = rendy(testCommand, tinta);
            
            if (envLine) {
                commands.push(`${envLine}${cmd}`);
                continue;
            }
            
            commands.push(cmd);
        }
    
    return commands;
};

function createSymlinks(letra) {
    const {
        name,
        directorio,
        hogar,
        bin,
    } = letra;
    
    const commands = [];
    
    const parsedBin = parseBin({
        name,
        hogar,
        bin,
    });
    
    const binDir = join(directorio, '..', `bin`);
    
    for (const [name, from] of entries(parsedBin)) {
        const binFrom = rendy(join(directorio, from), letra);
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
