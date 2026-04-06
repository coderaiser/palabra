import {escuchar} from './escuchar.js';
import {hablar} from './hablar.js';

export const create = async (palabras) => {
    const silabas = await escuchar(palabras);
    const commands = hablar(silabas);
    
    return commands.join(' && ');
};
