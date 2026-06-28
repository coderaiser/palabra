import os from 'node:os';
import process from 'node:process';

const isString = (a) => typeof a === 'string';

export const prepare = (letra, overrides) => {
    const {
        confirmar = true,
        directorio = '~/.local/share',
        name,
        bin = parseBin(letra),
        hogar = name,
        afterInstall = [],
    } = letra;
    
    const url = parseURL(letra, overrides);
    
    return {
        arch: '$(uname -m)',
        ...letra,
        confirmar,
        directorio,
        url,
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

const parseURL = ({url}, overrides = {}) => {
    const {
        env = process.env,
        platform = os.platform,
    } = overrides;
    
    if (!url)
        return url;
    
    if (isString(url))
        return url;
    
    const currentPlatform = env.PLATFORM || platform();
    
    return url[currentPlatform];
};
