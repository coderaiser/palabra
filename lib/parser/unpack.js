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
    commands.push(`rm -rf ${camino}/${name}`);
    commands.push(`mkdir -p ${camino}/${name}`);
    commands.push(`tar zxf ${filename} -C ${camino}/${name}`);
    commands.push(`rm ${filename}`);
    
    return commands;
};
