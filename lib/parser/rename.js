import {join} from 'node:path';
import {rendy} from 'rendy';

const {isArray} = Array;
const maybeArray = (a) => isArray(a) ? a : [a];

export const rename = (letra) => {
    const {name, directorio} = letra;
    const commands = [];
    
    for (const rawFrom of maybeArray(letra.rename)) {
        const renderedRename = rendy(rawFrom, letra);
        const from = join(directorio, renderedRename);
        const to = join(directorio, name);
        
        const rm = `rm -rf ${to}`;
        const mv = `mv -f ${from} ${to}`;
        
        commands.push(`[ -e ${from} ] && ${rm}`);
        commands.push(`[ -e ${from} ] && ${mv}`);
    }
    
    return commands;
};
