import {parse} from './parser/parser.js';

export const hablar = (silabas) => {
    const commands = [];
    
    for (const {encontro, ...letra} of silabas) {
        const {name} = letra;
        
        if (!encontro) {
            commands.push(`echo "🧨letra '${name}' not found"`);
            continue;
        }
        
        commands.push(...parse(letra));
        
        return commands;
    }
    
    return commands;
};

