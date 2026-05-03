import {buscar} from './buscar.js';

const {entries} = Object;
const notName = (a) => ({name}) => a !== name;

export const escuchar = async (palabras) => {
    let silabas = [];
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
        const letra = await buscar(dep, {
            directorio,
        });
        
        if (names.has(dep))
            silabas = silabas.filter(notName(dep));
        
        silabas.unshift(letra);
        
        names.add(dep);
    }
    
    return [directorio, silabas];
};
