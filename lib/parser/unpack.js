import {basename} from 'node:path';
import {rendy} from 'rendy';

export const unpack = (letra) => {
    const commands = [];
    const {
        name,
        url,
        directorio,
    } = letra;
    
    const renderedURL = rendy(url, letra);
    const filename = basename(renderedURL);
    
    commands.push(`wget ${renderedURL}`);
    commands.push(`rm -rf ${directorio}/${name}`);
    commands.push(`mkdir -p ${directorio}/${name}`);
    commands.push(`tar zxf ${filename} -C ${directorio}`);
    commands.push(`rm ${filename}`);
    
    return commands;
};
