import {basename} from 'node:path';
import {rendy} from 'rendy';

const exts = [
    '.tgz',
    '.gz',
    '.xz',
];

export const isArchive = (ext) => {
    return exts.includes(ext);
};

export const extract = (letra) => {
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
    commands.push(`tar xf ${filename} -C ${directorio}`);
    commands.push(`rm ${filename}`);
    
    return commands;
};
