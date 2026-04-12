import {buscar} from './buscar.js';

const {entries} = Object;

export const escuchar = async (palabras) => {
    const silabas = [];
    const {
        directorio = '~/.local/src',
        letras = [],
    } = palabras;
    
    for (const [name, version] of entries(letras)) {
        const letra = await buscar(name, {
            version,
            directorio,
        });
        
        silabas.push(letra);
        
        for (const dep of letra.dependencies || []) {
            const letra = await buscar(dep, {
                version,
                directorio,
            });
            
            silabas.unshift(letra);
        }
    }
    
    return [directorio, await Promise.all(silabas)];
};
