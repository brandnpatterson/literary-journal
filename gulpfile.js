var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sync = require('browser-sync');
var reload  = sync.reload;

gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'start.js',
		ext: '.pug'
	}).on('start', function () {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('browser-sync', ['nodemon'], function () {
	sync.init(null, {
		proxy: 'localhost:8888',
    files: ['views/**/*'],
    port: 7777,
    notify: false
	});
});

gulp.task('default', ['browser-sync'], function () {

});
