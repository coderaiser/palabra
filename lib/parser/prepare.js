import os from 'node:os';
import process, {env} from 'node:process';

const isString = (a) => typeof a === 'string';
const prepareArch = () => {
    const arch = env.ARCH || process.arch;
    
    if (arch === 'x64')
        return 'x86-64';
    
    return arch;
};

export const prepare = (letra, overrides) => {
    const {
        confirmar = true,
        directorio = '~/.local/share',
        name,
        bin = parseBin(letra),
        hogar = name,
        afterInstall = [],
        arch = prepareArch(),
    } = letra;
    
    const url = parseURL(letra, overrides);
    
    return {
        arch,
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
