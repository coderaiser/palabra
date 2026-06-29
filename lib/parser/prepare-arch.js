import process, {env} from 'node:process';

export const prepareArch = ({arch = {}} = {}) => {
    const currentArch = env.ARCH || process.arch;
    
    return arch[currentArch] || currentArch;
};

