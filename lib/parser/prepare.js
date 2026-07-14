import os from 'node:os';
import process from 'node:process';
import {prepareArch} from './prepare-arch.js';

const isString = (a) => typeof a === 'string';

export const prepare = (letra, overrides) => {
    const {
        confirmar = true,
        directorio = '~/.local/share',
        name,
        bin = parseBin(letra),
        hogar = name,
        alias,
        afterInstall = [],
        arch = prepareArch(alias),
    } = letra;
    
    const platform = parsePlatform(overrides);
    const url = parseURL(letra.url, platform);
    
    return {
        arch,
        ...letra,
        confirmar,
        directorio,
        url,
        platform,
        name,
        bin,
        hogar,
        afterInstall,
    };
};

const parseBin = ({name, type}) => {
    if (type === 'root-archive')
        return '';
    
    return `/bin/${name}`;
};

const parsePlatform = (overrides = {}) => {
    const {
        env = process.env,
        platform = os.platform,
    } = overrides;
    
    return env.PLATFORM || platform();
};

const parseURL = (url, platform) => {
    if (!url)
        return url;
    
    if (isString(url))
        return url;
    
    return url[platform];
};
