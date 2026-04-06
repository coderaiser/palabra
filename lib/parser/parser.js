import {normalize} from 'node:path';
import {unpack} from './unpack.js';
import {execute} from './execute.js';

export const parse = (letra) => {
    const commands = [];
    const {
        link,
        name,
        bin,
        camino,
    } = letra;
    
    const dirBin = normalize(`${camino}/../bin/${name}`);
    
    if (link.endsWith('tgz'))
        commands.push(...unpack(letra));
    
    if (link.endsWith('sh'))
        commands.push(...execute(letra));
    
    commands.push(`ln -fs ${camino}/${name}/${bin} ${dirBin}`);
    
    return commands;
};
