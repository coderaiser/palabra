import {
    basename,
    extname,
    join,
} from 'node:path';
import {rendy} from 'rendy';

const exts = [
    '.tgz',
    '.gz',
    '.xz',
    '.zip',
];

const CONTINUE = '-c';

export const isArchive = ({url}) => {
    if (!url)
        return false;
    
    const ext = extname(new URL(url).pathname);
    
    return exts.includes(ext);
};

export const extract = (letra) => {
    const commands = [];
    const {
        name,
        url,
        directorio,
        extractDirectory = directorio,
    } = letra;
    
    const renderedURL = rendy(url, letra);
    const filename = basename(renderedURL);
    const renderedextractDirectory = rendy(extractDirectory, letra);
    const tmpDir = '${XDG_CACHE_HOME:-/tmp}';
    const tmpFile = join(tmpDir, filename);
    
    commands.push(`wget ${CONTINUE} ${renderedURL} -O ${tmpFile}`);
    commands.push(`rm -rf ${directorio}/${name}`);
    commands.push(`mkdir -p ${directorio}/${name}`);
    
    if (tmpFile.endsWith('.zip'))
        commands.push(`unzip -q ${tmpFile} -d ${renderedextractDirectory}`);
    else
        commands.push(`tar xf ${tmpFile} -C ${renderedextractDirectory}`);
    
    commands.push(`rm ${tmpFile}`);
    
    return commands;
};
