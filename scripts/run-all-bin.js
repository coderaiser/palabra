import {readdir} from 'node:fs/promises';

const isString = (a) => typeof a === 'string';
const {keys} = Object;
const names = await readdir(new URL('../letras', import.meta.url));

const bins = [];

for (const name of names) {
    const {default: letra} = await import(new URL(`../letras/${name}/${name}.json`, import.meta.url), {
        with: {
            type: 'json',
        },
    });
    
    if (!letra.bin)
        continue;
    
    if (isString(letra.bin)) {
        bins.push(`type ${letra.name}`);
        continue;
    }
    
    for (const bin of keys(letra.bin)) {
        bins.push(`type ${bin}`);
    }
}
