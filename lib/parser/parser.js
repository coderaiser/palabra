import {basename} from 'node:path';
import {rendy} from 'rendy';

export const parse = (letra) => {
    const commands = [];
    const {link} = letra;
    const renderedLink = rendy(link, letra);
    
    commands.push(`wget ${renderedLink}`);
    commands.push(`tar zxf ${basename(renderedLink)}`);
    
    return commands;
};

