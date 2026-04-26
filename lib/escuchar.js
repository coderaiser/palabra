import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {
        directorio = '~/.local/share',
        letras = [],
    } = palabras;
    
    const names = new Set();
    const dependencies = [];
    
    for (const [name, version] of entries(letras)) {
        const letra = await buscar(name, {
            version,
            directorio,
        });
        
        silabas.push(letra);
        names.add(name);
        
        dependencies.push(...letra.dependencies || []);
    }
    
    for (const dep of dependencies) {
        if (names.has(dep))
            continue;
        
        const letra = await buscar(dep, {
            directorio,
        });
        
        silabas.unshift(letra);
        names.add(dep);
    }
    
    return [directorio, await Promise.all(silabas)];
};
