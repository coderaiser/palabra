import {join} from 'node:path';
import {parse} from './parser/parser.js';

export const hablar = (silabas, {directorio} = {}) => {
    const commands = [];
    
    if (directorio) {
        const binDir = join(directorio, '..', `bin`);
        commands.push(`mkdir -p ${binDir}`);
    }
    
    for (const {encontro, ...letra} of silabas) {
        const {name} = letra;
        
        if (!encontro) {
            commands.push(`echo "🧨letra '${name}' not found"`);
            continue;
        }
        
        commands.push(...parse(letra));
    }
    
    return commands;
};

