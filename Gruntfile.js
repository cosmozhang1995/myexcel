module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			excels: {
				files: ["excels/**/*.xls", "excels/**/*.xlsx"],
				tasks: ['node-xlsx']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

	var xlsx = require('node-xlsx');
	grunt.registerTask('node-xlsx', 'Load xlsx', function() {
		var obj = xlsx.parse(__dirname + '/excels/celiang.xlsx');
		obj = obj[0].data;
		// console.log(JSON.stringify(obj[0].data));
		var hldObj = (function(_obj) {
			var _to_obj = [];
			for (var i = 1; i < _obj.length; i++) {
				var _item = _obj[i];
				_to_obj.push({
					"from": _item[0].split('-')[0],
					"to": _item[0].split('-')[1],
					"angel": parseFloat(_item[1]),
					"distance": parseFloat(_item[2])
				});
			}
			return _to_obj;
		})(obj);
		var jsonContent = JSON.stringify(hldObj);
		console.log(jsonContent);
		grunt.file.write(__dirname + '/outputs/celiang.json', jsonContent);
	});

	grunt.registerTask('server', 'Launch express server', function() {
		var app = require('./server');
		app.start();
	});

	grunt.registerTask('default', ['node-xlsx', 'server', 'watch']);
};

