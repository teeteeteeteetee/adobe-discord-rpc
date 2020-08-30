var chai = require( 'chai' );
var Assert = chai.assert;
var SampleParser = require( './sample_parser' );
var ConnectedDomain = require( '../lib/connected-domain' );

describe( 'desc-name', function(){

    it( 'separated different domains', function(){
        var samples = SampleParser( 'separate.txt' );
        var result = ConnectedDomain( samples, function( point ){
            return point;
        });

        Assert.equal( result.totalDomains, 5, '5 domains should be found' );
        Assert.equal( result.domains.length, 5, '5 domains should be found' );
        Assert.equal( result.totalIdentifiers, 4 , '4 kinds of domains should be found');
    });

    it( 'separated same domains', function(){
        var samples = SampleParser( 'separate_same_domain.txt' );
        var result = ConnectedDomain( samples, function( point ){
            return point;
        });

        Assert.equal( result.totalDomains, 8, '8 domains should be found' );
        Assert.equal( result.domains.length, 8, '8 domains should be found' );
        Assert.equal( result.totalIdentifiers, 5, '5 kinds of domains should be found');
        Assert.equal( result.groupByIdentifier[ 'C' ].length, 2, '2 there should be 2 "C" domains');

    });

    it( 'same domains meet again', function(){
        var samples = SampleParser( 'meet_again.txt' );
        var result = ConnectedDomain( samples, function( point ){
            return point;
        });

        Assert.equal( result.totalDomains, 2, '2 domains should be found' );
        Assert.equal( result.domains.length, 2, '2 domains should be found' );
        Assert.equal( result.totalIdentifiers, 2, '2 kinds of domains should be found');
    });

    it( 'parse domains with soft link', function(){
        var samples = SampleParser( 'hard_or_soft.txt' );
        var result = ConnectedDomain( samples, function( point ){
            return point;
        }, false );

        Assert.equal( result.totalDomains, 2, '2 domains should be found' );
        Assert.equal( result.domains.length, 2, '2 domains should be found' );
        Assert.equal( result.totalIdentifiers, 2, '2 kinds of domains should be found');
        console.log( JSON.stringify( result ) );
    });

    it( 'parse domains with hard link', function(){
        var samples = SampleParser( 'hard_or_soft.txt' );
        var result = ConnectedDomain( samples, function( point ){
            return point;
        }, true );

        Assert.equal( result.totalDomains, 6, '6 domains should be found' );
        Assert.equal( result.domains.length, 6, '6 domains should be found' );
        Assert.equal( result.totalIdentifiers, 2, '2 kinds of domains should be found');
    });
});
