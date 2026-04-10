import {rendy} from 'rendy';
import {parseEnv} from './parse-env.js';

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
