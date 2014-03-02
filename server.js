var express = require('express'),
    app = express(),
    port = process.env.PORT || 5001,
    exec = require('child_process').exec;

app.use(express.bodyParser());
app.listen(port, function() {
    console.log('Listening on ' + port);
});

/**
 * Validate URL
 * @param  {String} val URL string to validate
 */
validUrl = function(val) {
    return /([a-z0-9-]+\.(?:com|net|org|co\.uk))(?:\/|$)/.test(val);
};

/**
 * The route to trigger yslow command
 */
app.get('/', function(req, res, next) {

    var url = req.query.url,
        info = req.query.info || 'basic',
        command = 'node index.js ' + url + ' -i ' + info;

    if (!validUrl(url)) {
        res.send({
            error: 'Invalid URL'
        });
        return;
    }

    console.log('Running command: ' + command);

    exec(command, function (error, stdout, stderr) {
        if (error !== null) {
            res.send(error);
            console.log('exec error: ' + error);
        } else {
            // TODO: Save results
            res.send(JSON.parse(stdout));
        }
    });

});