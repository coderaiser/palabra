# 民 Palabra [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMURL]: https://npmjs.org/package/palabra "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/palabra.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/palabra/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/palabra/workflows/Node%20CI/badge.svg
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[CoverageURL]: https://coveralls.io/github/coderaiser/palabra?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/palabra/badge.svg?branch=master&service=github

Install software easier then ever before.

<img width="546" height="405" alt="image" src="https://github.com/user-attachments/assets/272fb625-a51e-488f-9d58-89268f810efb" />

## Install

```
npm i palabra -g
```

## Usage

First thing you should do is:

- ✅ create `.palabra.json` with soft you want to install, like this:

```json
{
    "directorio": "~/.local/src",
    "letras": {
        "fasm": "*"
    }
}
```

Then run:

```sh
palabra
```

### `i`

You can also use interactive mode:

```
palabra i bun node deno rust go nvim fasm -d /usr/local/src
```

You can also pass version:

```
palabra i nvim@0.11
```

Default installation directory is `~/.local/src`.

### `l`

To list all packages that can be installed use `l`:

```
palabra l
[
  'bun',  'deno',
  'fasm', 'go',
  'nvim', 'nvm',
  'rust'
]
```

That's it!

## License

MIT
