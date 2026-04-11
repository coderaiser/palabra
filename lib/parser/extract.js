import {basename, extname} from 'node:path';
import {rendy} from 'rendy';

const exts = [
    '.tgz',
    '.gz',
    '.xz',
];

export const isArchive = ({url}) => {
    const ext = extname(new URL(url).pathname);
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
    
    commands.push(`wget ${renderedURL} -O /tmp/${filename}`);
    commands.push(`rm -rf ${directorio}/${name}`);
    commands.push(`mkdir -p ${directorio}/${name}`);
    commands.push(`tar xf /tmp/${filename} -C ${directorio}`);
    commands.push(`rm /tmp/${filename}`);
    
    return commands;
};
