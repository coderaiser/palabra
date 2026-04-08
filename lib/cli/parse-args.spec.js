import {test} from 'supertape';
import {parseArgs} from './parse-args.js';

test('palabra: cli: parseArgs', (t) => {
    const result = parseArgs([]);
    const expected = {
        _: [],
        d: '~/.local/src',
        directorio: '~/.local/src',
    };
    
    t.deepEqual(result, expected);
    t.end();
});
