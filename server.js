module.exports = (function() {
	var express = require('express');
	var app = express();
	var ejs = require('ejs');
	app.engine('.html', ejs.__express);
	app.use(express.static('./'));
	app.set('views', './');
	app.set('view engine', 'html');
	app.get('/', function(req,res) {
		res.render('index');
	});
	app.get('/mobile', function(req,res) {
		res.render('mobile');
	});
	app.start = function() {
		var server = app.listen(3000, function() {
			var host = server.address().address;
			var port = server.address().port;
			console.log('Server running at http://%s:%s', host, port);
		});
		app.server = server;
	}
	return app;
})();
if (module === require.main) {
	module.exports.start();
}