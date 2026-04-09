import {rendy} from 'rendy';

const {entries} = Object;

export const parseEnv = (letra) => {
    const envLine = [];
    const {env} = letra;
    
    if (!env)
        return '';
    
    for (const [name, value] of entries(env)) {
        const envValue = rendy(value, letra);
        
        envLine.push(`${name}=${envValue}`);
    }
    
    return envLine.join(' ') + ' ';
};
