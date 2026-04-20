import {extname} from 'node:path';
import {rendy} from 'rendy';
import {parseEnv} from './parse-env.js';

const isBool = (a) => typeof a === 'boolean';

export const isExecute = (letra) => {
    const {url} = letra;
    
    if (!url)
        return false;
    
    const ext = extname(new URL(url).pathname);
    
    if (isBool(letra.execute) && !letra.execute)
        return false;
    
    return !ext || ext === '.sh';
};

export const execute = (letra) => {
    const commands = [];
    const {
        url,
        confirmar,
        args = [],
    } = letra;
    
    const envLine = parseEnv(letra);
    const renderedURL = rendy(url, letra);
    
    const arg = confirmar ? '' : ' -- -y';
    const curl = `bash -c "$(curl -fsSL ${renderedURL})"${arg}`;
    
    const argsLines = [];
    
    for (const arg of args) {
        argsLines.push(rendy(arg, letra));
    }
    
    const argsResult = !argsLines.length ? '' : ` _ ${argsLines.join(' ')}`;
    
    commands.push(`${envLine}${curl}${argsResult}`);
    
    return commands;
};
