import {tryToCatch} from 'try-to-catch';

export const buscar = async (name, values = {}) => {
    const [, data] = await tryToCatch(importPalabra, name);
    
    if (!data)
        return {
            name,
            encontro: false,
        };
    
    const version = values.version || data.version;
    const {camino} = values;
    
    return {
        encontro: true,
        confirmar: true,
        ...data,
        version,
        camino,
    };
};

async function importPalabra(name) {
    const {default: letra} = await import(`../letras/${name}/${name}.json`, {
        with: {
            type: 'json',
        },
    });
    
    return letra;
}
