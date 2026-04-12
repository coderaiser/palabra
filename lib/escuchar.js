import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {
        directorio = '~/.local/src',
        letras = [],
    } = palabras;
    
    const names = new Set();
    
    for (const [name, version] of entries(letras)) {
        const letra = await buscar(name, {
            version,
            directorio,
        });
        
        silabas.push(letra);
        names.add(name);
        
        for (const dep of letra.dependencies || []) {
            if (names.has(dep))
                continue;
            
            const letra = await buscar(dep, {
                version,
                directorio,
            });
            
            silabas.unshift(letra);
            names.add(name);
        }
    }
    
    return [directorio, await Promise.all(silabas)];
};
