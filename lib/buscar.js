import {tryToCatch} from 'try-to-catch';

const parseVersion = ({values, data}) => {
    if (values.version === '*')
        return data.version;
    
    return values.version || data.version;
};

export const buscar = async (name, values = {}) => {
    const [, data] = await tryToCatch(importPalabra, name);
    
    if (!data)
        return {
            name,
            encontro: false,
        };
    
    const version = parseVersion({
        values,
        data,
    });
    
    const {directorio} = values;
    
    return {
        encontro: true,
        confirmar: true,
        ...data,
        version,
        directorio,
    };
};

async function importPalabra(name) {
    const {default: letra} = await import(new URL(`../letras/${name}/${name}.json`, import.meta.url), {
        with: {
            type: 'json',
        },
    });
    
    return letra;
}
