# connected-domain

Calculate all the connected domains based on the given two-dimensional array

## How To Use

variable `samples` in the following code is a two-dimensional array parsed from file separate.txt

```javascript
var ConnectedDomain = require( 'connected-domain' );
var samples = [ ... ];

console.log( ConnectedDomain( samples, function( value ){
    return value;
});
```

## Details

ConnectedDomain( `twoDimensionalArray`, `indicator`, `ifHardLink` ):

- `twoDimensionalArray`: A two-dimensional array for ConnectedDomain to parse
- `indicator`: Function to decide what identifier each point should have to decide which domain it belongs to. The first parameter will be given as the point value. The return value of this function will be used as the identifier.
- `ifHardLink`: Boolean. If use hard-link to decide connected domains. ( see section `Hard Link` for details )

The result of invocation of `ConnectedDomain` is a object:

```js
{
    domains: [ {}, {}, ... ],
    totalDomains: 10,
    groupByIdentifier: {
        id1: {},
        id2: {},
        ...
    },
    totalIdentifiers: 5
}
```

The structure of every domain:

```js
{ 
    bounding: { 
        w: 12, 
        h: 19, 
        x: 0, 
        y: 1
    }, 
    points: [ { x: 1, y: 2, value: 'a' }, {}, ... ], 
    identifier: 'blue', 
    domainId: 1 
} 
```

## Hard Link

ConnectedDomains use soft-link as default. Below is how soft-link think two domains are connected( all the 0 zones are connected as a domain ):

```
0011
0011
1100
1100
```

If you use hard-link, the upper-left and bottom-right "0" zones are not connected, they become 2 separate domains. Below shows how a hard-link connection can be formed:

```
0011
0001
1000
1100
```
