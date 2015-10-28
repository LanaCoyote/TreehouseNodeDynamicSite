var Profile = require( "./profile" ); // treehouse profile module

// FN: handle HTTP routing to '/'
function index( req, res ) {
//      GET requests will show the search page
    res.writeHead( 200, {'Content-Type': 'text/plain'} );
    res.write( "Header\n" );
    res.write( "Search\n" );
    res.end( "Footer\n" );
//
//      POST requests will redirect to the POSTed '/<username>'
}

// FN: handle HTTP routing to '/<username>'
function userpage( req, res, username ) {
//      get our JSON data
    console.log( "Getting profile....." );
    var prof = new Profile( username );

//      on success: render it into the profile page and display
    prof.on( "end", function( profJson ) {
        var data = {
            avatarUrl: profileJson.gravatar_url,
            username: profileJson.profile_name,
            badges: profileJson.badges.length,
            jsPoints: profileJson.points.JavaScript
        }

        res.writeHead( 200, { 'Content-Type': 'text/plain' } );
        res.end( "\n" );
    } );

//      on error: show the error page instead
    prof.on( "error", function( error ) {
        res.writeHead( 400, { 'Content_Type': 'text/plain' } );
        res.end( error.message + "\n" );
    } );
}


// module exports
module.exports.index    = index;
module.exports.userpage = userpage;
