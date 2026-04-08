import {basename} from 'node:path';
import {rendy} from 'rendy';

export const unpack = (letra) => {
    const commands = [];
    const {
        name,
        url,
        directorio,
    } = letra;
    
    const renderedurl = rendy(url, letra);
    const filename = basename(renderedurl);
    
    commands.push(`wget ${renderedurl}`);
    commands.push(`rm -rf ${directorio}/${name}`);
    commands.push(`mkdir -p ${directorio}/${name}`);
    commands.push(`tar zxf ${filename} -C ${directorio}/${name}`);
    commands.push(`rm ${filename}`);
    
    return commands;
};
