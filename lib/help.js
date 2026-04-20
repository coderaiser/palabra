import helpJson from '../help.json' with {
    type: 'json',
};

const {entries} = Object;

export const help = () => {
    const result = [
        'Usage: palabra [command|options]',
        'Options:',
    ];
    
    for (const [name, description] of entries(helpJson)) {
        result.push(`  ${name} ${description}`);
    }
    
    return result.join('\n');
};
