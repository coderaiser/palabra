import process from 'node:process';
import {join} from 'node:path';

const {cwd: _cwd} = process;

export const readPalabra = async (nombres, overrides = {}) => {
    const {cwd = _cwd} = overrides;
    const name = join(cwd(), '.palabra.json');
    
    const {default: palabra} = await import(name, {
        with: {
            type: 'json',
        },
    });
    
    return palabra;
};
