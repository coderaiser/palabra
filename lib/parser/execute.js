import {rendy} from 'rendy';

const {entries} = Object;

export const execute = (letra) => {
    const commands = [];
    const {
        link,
        env = {},
    } = letra;
    
    const envLine = [];
    
    for (const [name, value] of entries(env)) {
        const envValue = rendy(value, letra);
        envLine.push(`${name}=${envValue}`);
    }
    
    if (!envLine.length) {
        commands.push(`curl -fsSL ${link} | sh`);
        return commands;
    }
    
    commands.push(`${envLine.join(' ')} curl -fsSL ${link} | sh`);
    
    return commands;
};
