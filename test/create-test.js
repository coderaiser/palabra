import {extend} from 'supertape';
import {createComprar} from './comprar.js';

export const createTest = (dir) => {
    return extend({
        comprar: createComprar(dir),
    });
};

