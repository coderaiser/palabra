import {basename} from 'node:path';
import {rendy} from 'rendy';

export const unpack = (letra) => {
    const commands = [];
    const {
        name,
        url,
        camino,
    } = letra;
    
    const renderedurl = rendy(url, letra);
    const filename = basename(renderedurl);
    
    commands.push(`wget ${renderedurl}`);
    commands.push(`tar zxf ${filename}`);
    commands.push(`rm ${filename}`);
    commands.push(`mkdir -p ${camino}`);
    commands.push(`rm -rf ${camino}/${name}`);
    commands.push(`mv -f ${name} ${camino}/${name}`);
    
    return commands;
};
