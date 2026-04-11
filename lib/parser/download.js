import {join} from 'node:path';
import {rendy} from 'rendy';

export const download = (letra) => {
    const {
        name,
        url,
        directorio,
    } = letra;
    
    const commands = [];
    const urlRendered = rendy(url, letra);
    const fullName = join(directorio, name, name);
    
    commands.push(`mkdir -p ${directorio}/${name}`);
    commands.push(`wget ${urlRendered} -O ${fullName}`);
    commands.push(`chmod +x ${fullName}`);
    
    return commands;
};

