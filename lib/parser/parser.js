import {basename, normalize} from 'node:path';
import {rendy} from 'rendy';

export const parse = (letra) => {
    const commands = [];
    const {
        link,
        name,
        bin,
        camino,
    } = letra;
    
    const renderedLink = rendy(link, letra);
    const filename = basename(renderedLink);
    const dirBin = normalize(`${camino}/../bin/${name}`);
    
    commands.push(`wget ${renderedLink}`);
    commands.push(`tar zxf ${filename}`);
    commands.push(`rm ${filename}`);
    commands.push(`mkdir -p ${camino}`);
    commands.push(`rm -rf ${camino}/${name}`);
    commands.push(`mv -f ${name} ${camino}/${name}`);
    commands.push(`ln -fs ${camino}/${name}/${bin} ${dirBin}`);
    
    return commands;
};
