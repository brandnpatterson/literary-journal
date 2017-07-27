import gulp    from 'gulp';
import nodemon from 'gulp-nodemon';
import sync    from 'browser-sync';

var reload = sync.reload;

gulp.task('default', ['server', 'watch']);

gulp.task('nodemon', (cb) => {
	var started = false;
	return nodemon({
		script: 'start.js'
	}).on('start', () => {
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('server', ['nodemon'], () => {
  sync.init(null, {
		proxy: 'localhost:7777',
		port: 8888,
		files: 'public/**/*.*',
		notify: false,
		open: false
  });
});

gulp.task('watch', () => {
	gulp.watch('views/**/*', reload);
});
