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
    const {url, confirmar} = letra;
    
    const envLine = parseEnv(letra);
    const renderedURL = rendy(url, letra);
    
    const arg = confirmar ? '' : ' -- -y';
    const curl = `bash -c "$(curl -fsSL ${renderedURL})"${arg}`;
    
    commands.push(`${envLine}${curl}`);
    
    return commands;
};
