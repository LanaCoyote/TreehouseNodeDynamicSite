var http    = require( 'http' ); // http module
var routes  = require( './routes' ); // page routing module

// create web server
http.createServer( function( req, res ) {
    if ( req.url === '/' ) {
        routes.index( req, res );
    } else {
        var username = req.url.slice( 1 );
        routes.userpage( req, res, username );
    }
} ).listen( 1337, '127.0.0.1' );

console.log( "Server running on http://127.0.0.1:1337/" );

// FN: read in an HTML file and replace content with passed data
//      read in the file
//
//      replace the old content
