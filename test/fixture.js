import {join, dirname} from 'node:path';
import {
    readFileSync,
    writeFileSync,
} from 'node:fs';
import {fileURLToPath} from 'node:url';
import kebabCase from 'just-kebab-case';

export const readFixtures = (dir) => {
    return new Proxy({}, createHandler(dir));
};

const createHandler = (dir) => ({
    get(obj, prop) {
        return readFixture(dir, kebabCase(prop));
    },
    set(obj, prop, value) {
        writeFixture(dir, kebabCase(prop), value);
        return true;
    },
});

const parseDirectory = (url) => {
    if (url.startsWith('/'))
        return url;
    
    const __filename = fileURLToPath(url);
    
    return dirname(__filename);
};

const readFixture = (url, name) => {
    const dir = parseDirectory(url);
    
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    
    return readFileSync(`${longName}.json`, 'utf8');
};

const writeFixture = (url, name, value) => {
    const dir = parseDirectory(url);
    
    const dirFixture = join(dir, 'fixture');
    const longName = join(dirFixture, name);
    
    return writeFileSync(`${longName}.json`, value);
};
