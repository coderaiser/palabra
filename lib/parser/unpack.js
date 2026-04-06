import {basename} from 'node:path';
import {rendy} from 'rendy';

export const unpack = (letra) => {
    const commands = [];
    const {
        name,
        link,
        camino,
    } = letra;
    
    const renderedLink = rendy(link, letra);
    const filename = basename(renderedLink);
    
    commands.push(`wget ${renderedLink}`);
    commands.push(`tar zxf ${filename}`);
    commands.push(`rm ${filename}`);
    commands.push(`mkdir -p ${camino}`);
    commands.push(`rm -rf ${camino}/${name}`);
    commands.push(`mv -f ${name} ${camino}/${name}`);
    
    return commands;
};
