const parseBin = ({name, type}) => {
    if (type === 'root-archive')
        return '';
    
    return `/bin/${name}`;
};

export const prepare = (letra) => {
    const {
        confirmar = true,
        directorio = '~/.local/share',
        url,
        name,
        bin = parseBin(letra),
        hogar = name,
    } = letra;
    
    return {
        confirmar,
        directorio,
        url,
        name,
        bin,
        hogar,
        ...letra,
    };
};

