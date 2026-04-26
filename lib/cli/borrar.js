import {join} from 'node:path';

export const borrar = (nombres, {directorio}) => {
    const commands = [];
    
    for (const nombre of nombres) {
        const dir = join(directorio, nombre);
        const bin = join(directorio, '..', 'bin', nombre);
        
        commands.push(`rm rf ${dir}`);
        commands.push(`rm rf ${bin}`);
    }
    
    return commands;
};

