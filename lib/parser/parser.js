import {basename, extname} from 'node:path';
import {rendy} from 'rendy';

export const parse = (letra) => {
    const commands = [];
    const {link, name, bin} = letra;
    const renderedLink = rendy(link, letra);
    const filename = basename(renderedLink);
    
    commands.push(`wget ${renderedLink}`);
    commands.push(`tar zxf ${filename}`);
    commands.push(`rm ${filename}`);
    commands.push(`mkdir -p ~/.local/src`);
    commands.push(`rm -rf ~/.local/src/${name}`);
    commands.push(`mv -f ${name} ~/.local/src/${name}`);
    commands.push(`ln -fs ~/.local/src/${name}/${bin} ~/.local/bin/${name}`);
    
    return commands;
};

