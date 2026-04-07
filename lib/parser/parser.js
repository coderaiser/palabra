import {extname, join} from 'node:path';
import {unpack} from './unpack.js';
import {execute} from './execute.js';

export const parse = (letra) => {
    const commands = [];
    const {
        url,
        name,
        bin = `/bin/${name}`,
        camino,
    } = letra;
    
    const binTo = join(camino, '..', `bin/${name}`);
    
    const ext = extname(url);
    
    if (ext === '.tgz')
        commands.push(...unpack(letra));
    
    if (!ext || ext === '.sh')
        commands.push(...execute(letra));
    
    const binFrom = join(camino, name, bin);
    commands.push(`ln -fs ${binFrom} ${binTo}`);
    
    return commands;
};
