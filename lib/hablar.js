import {join} from 'node:path';
import {parse} from './parser/parser.js';

export const hablar = (silabas, {directorio} = {}) => {
    const commands = [];
    
    for (const {encontro, ...letra} of silabas) {
        const {name} = letra;
        
        if (!encontro) {
            commands.push(`echo "🧨letra '${name}' not found"`);
            commands.push(`exit 1`);
            continue;
        }
        
        commands.push(...parse(letra));
    }
    
    if (commands.length && directorio) {
        const binDir = join(directorio, '..', `bin`);
        commands.unshift(`mkdir -p ${binDir}`);
    }
    
    return commands;
};
