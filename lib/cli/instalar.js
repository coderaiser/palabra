import {create, createPalabra} from '../palabra.js';
import {readPalabra} from './read-palabra.js';

export const instalar = async (nombres) => {
    if (nombres) {
        const palabra = createPalabra(nombres);
        return create(palabra);
    }
    
    return await readPalabra();
};
