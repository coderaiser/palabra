import {parseEnv} from './parse-env.js';

export const execute = (letra) => {
    const commands = [];
    const {
        url,
        confirmar,
    } = letra;
    
    const envLine = parseEnv(letra);
    
    const arg = confirmar ? '' : ' -- -y';
    const curl = `bash -c "$(curl -fsSL ${url})"${arg}`;
    
    commands.push(`${envLine}${curl}`);
    
    return commands;
};
