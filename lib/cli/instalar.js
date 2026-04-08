import {create, createPalabra} from '../palabra.js';
import {readPalabra} from './read-palabra.js';

export const instalar = async (nombres, {directorio}) => {
    if (nombres) {
        const palabra = createPalabra(nombres, {
            directorio,
        });
        return create(palabra);
    }
    
    return await readPalabra();
};
