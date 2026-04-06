import {tryToCatch} from 'try-to-catch';

export const buscar = async (name, values = {}) => {
    const [, data] = await tryToCatch(importPalabra, name);
    
    if (!data)
        return {
            name,
            encontro: false,
        };
    
    const version = values.version || data.version;
    
    return {
        encontro: true,
        ...data,
        version,
    };
};

async function importPalabra(name) {
    const {default: letra} = await import(`../letras/${name}.json`, {
        with: {
            type: 'json',
        },
    });
    
    return letra;
}
