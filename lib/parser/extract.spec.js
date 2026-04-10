import {test} from 'supertape';
import {extract} from './extract.js';

test('palabra: parser: extract: tar.xz', (t) => {
    const result = extract({
        name: 'amber',
        version: '0.5.1-alpha',
        url: 'https://github.com/amber-lang/amber/releases/download/{{ version }}/amber-linux-gnu-x86_64.tar.xz',
    });
    
    const expected = [
        'wget https://github.com/amber-lang/amber/releases/download/0.5.1-alpha/amber-linux-gnu-x86_64.tar.xz',
        'rm -rf undefined/amber',
        'mkdir -p undefined/amber',
        'tar xf amber-linux-gnu-x86_64.tar.xz -C undefined',
        'rm amber-linux-gnu-x86_64.tar.xz',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
