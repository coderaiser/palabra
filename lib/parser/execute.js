import {rendy} from 'rendy';

const {entries} = Object;

export const execute = (letra) => {
    const commands = [];
    const {
        
        url,
        env = {},
        confirmar,
    } = letra;
    
    const envLine = [];
    
    for (const [name, value] of entries(env)) {
        const envValue = rendy(value, letra);
        
        envLine.push(`${name}=${envValue}`);
    }
    
    const arg = confirmar ? '' : ' -- -y';
    const curl = `bash -c "$(curl -fsSL ${url})"${arg}`;
    
    if (!envLine.length) {
        commands.push(curl);
        return commands;
    }
    
    commands.push(`${envLine.join(' ')} ${curl}`);
    
    return commands;
};
