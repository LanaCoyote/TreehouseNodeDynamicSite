var fs = require( 'fs' );

function render ( template, data, res ) {
    // open the view
    var f = openView( "./views/" + template + ".html" );

    // replace the data in our template string
    var outdata = replaceData( f, data );

    // write the page to the response
    writeResponse( res, outdata );
}

function openView ( filename ) {
    return fs.readFileSync( filename, "utf8" );
}

function replaceData ( string, data ) {
    // loop over our data keys and replace them in the string
    for ( var k in data ) {
        string = string.replace( "{{" + k + "}}", data[k] );
    }

    return string;
}

function writeResponse( res, string ) {
    res.write( string );
}

// module exports
module.exports.render = render;
