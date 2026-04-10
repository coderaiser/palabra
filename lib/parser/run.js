import {rendy} from 'rendy';

export function run({letra, envLine, commands}) {
    const result = [];
    
    for (const command of commands) {
        result.push(`${envLine}${rendy(command, letra)}`);
    }
    
    return result;
}
