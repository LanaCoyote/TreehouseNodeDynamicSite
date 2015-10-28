var Profile = require( "./profile" ); // treehouse profile module
var querystring = require( "querystring" ); // querystring parser
var template = require( "./template" ); // templating engine

function writeStdResponse( statusCode, contentFn, res ) {
    res.writeHead( statusCode, { 'Content-Type': 'text/html' } );
    writeHeaderContentFooter( contentFn, res );
    res.end();
}

function redirectResponse( endpoint, res ) {
    res.writeHead( 303, { 'Location': endpoint } );
    res.end();
}

function writeHeaderContentFooter( contentFn, res ) {
    template.render( "header", {}, res );
    contentFn();
    template.render( "footer", {}, res );
}

// FN: handle HTTP routing to '/'
function index( req, res ) {
//      GET requests will show the search page
    if ( req.method === "GET" ) {
        writeStdResponse( 200, function() {
            template.render( "search", {}, res );
        }, res );

//      POST requests will redirect to the POSTed '/<username>'
    } else if ( req.method === "POST" ) {
        req.on( "data", function( postBody ) {
            var q = querystring.parse( postBody.toString() );
            redirectResponse( '/' + q.username, res );
        } );
    }
}

// FN: handle HTTP routing to '/<username>'
function userpage( req, res, username ) {
//      get our JSON data
    console.log( "Getting profile data for \"" + username + "\"..." );
    var prof = new Profile( username );

//      on success: render it into the profile page and display
    prof.on( "end", function( profJson ) {
        console.log( "Done!" );

        var data = {
            avatarUrl: profJson.gravatar_url,
            username: profJson.profile_name,
            badges: profJson.badges.length,
            jsPoints: profJson.points.JavaScript
        };

        writeStdResponse( 200, function() {
            template.render( "profile", data, res );
        }, res );
    } );

//      on error: show the error page instead
    prof.on( "error", function( error ) {
        console.error( "!! error: " + error.message );

        var data = {
            errorMessage: error.message
        };

        writeStdResponse( 400, function() {
            template.render( "error", data, res );
            template.render( "search", {}, res );
        }, res );
    } );
}


// module exports
module.exports.index    = index;
module.exports.userpage = userpage;
