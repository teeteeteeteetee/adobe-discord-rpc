var Path = require( 'path' );
var FS = require( 'fs' );
var SAMPLE_PATH = Path.resolve( __dirname, './domains/' );

module.exports = function( filename ){

    var dataArrays = FS.readFileSync( Path.resolve( SAMPLE_PATH, filename ) ).toString().split( /\n\r?/ );
    var datas = [];

    dataArrays.forEach(function( line, index ){
        datas[ index ] = line.split( '' );
    });

    return datas;
};