import {join} from 'node:path';
import {rendy} from 'rendy';

export const rename = (letra) => {
    const {name, directorio} = letra;
    const commands = [];
    const renderedRename = rendy(letra.rename, letra);
    const from = join(directorio, renderedRename);
    const to = join(directorio, name);
    
    commands.push(`mv -T ${from} ${to}`);
    
    return commands;
};

