import {test} from 'supertape';
import {rename} from './rename.js';

test('palabra: parser: rename: array', (t) => {
    const result = rename({
        name: 'gh',
        version: '2.93.0',
        directorio: '~/.local/share',
        rename: [
            'gh_{{ version }}_linux_amd64',
            'gh_{{ version }}_macos_arm64',
        ],
    });
    
    const expected = [
        '[ -e ~/.local/share/gh_2.93.0_linux_amd64 ] && rm -rf ~/.local/share/gh || true',
        '[ -e ~/.local/share/gh_2.93.0_linux_amd64 ] && mv -f ~/.local/share/gh_2.93.0_linux_amd64 ~/.local/share/gh || true',
        '[ -e ~/.local/share/gh_2.93.0_macos_arm64 ] && rm -rf ~/.local/share/gh || true',
        '[ -e ~/.local/share/gh_2.93.0_macos_arm64 ] && mv -f ~/.local/share/gh_2.93.0_macos_arm64 ~/.local/share/gh || true',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
