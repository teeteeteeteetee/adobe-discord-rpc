TableParser [![Build Status](https://travis-ci.org/neekey/table-parser.svg)](https://travis-ci.org/neekey/table-parser)
================

A parser to parse table style output from shell

## Install

```
npm install table-parser
```

## Usage

We have some kind of log below as `test/ps.log`:

```bash
  PID TTY           TIME CMD
49692 ttys000    0:00.06 login -pfl neekey /bin/bash -c exec -la bash /bin/bash
49693 ttys000    0:00.06 -bash
54195 ttys000    0:00.09 node run

...

56266 ttys005    0:00.06 login -pfl neekey /bin/bash -c exec -la bash /bin/bash
56269 ttys005    0:00.04 -bash
56463 ttys005    0:00.09 node test.js
56464 ttys005    0:00.01 ps -a
```

Use table-parser to parse it into object:

```
var FS = require( 'fs' );
var Parser = require( '../lib/index' );

var linux_ps = './ps.log';

data = FS.readFileSync( linux_ps ).toString();
var parsedData = Parser.parse( data );

console.log( parsedData );

```

Which will output:

```bash
[ { PID: [ '49692' ],
    TTY: [ 'ttys000' ],
    TIME: [ '0:00.06' ],
    CMD:
     [ 'login',
       '-pfl',
       'neekey',
       '/bin/bash',
       '-c',
       'exec',
       '-la',
       'bash',
       '/bin/bash' ] },
  ...

  { PID: [ '56464' ],
    TTY: [ 'ttys005' ],
    TIME: [ '0:00.01' ],
    CMD: [ 'ps', '-a' ] } ]
```

## Double quotation marks

Normally, all the values will be transformed into array using `split( /\s+/ )`, but string wrapped with `"` will be treated as a continuous string. 

For example, the CommandLine below:

```
"C:\Program Files\Internet Explorer\iexplore.exe" --name="Jack Neekey" --sex=male otherargs
```

will be split into:

- `C:\Program Files\Internet Explorer\iexplore.exe` ( `"` will be removed, if `"` is at the beginning )
- `--name="Jack Neekey"`    ( `"` is reserved )
- `--sex=male`
- `otherargs`
