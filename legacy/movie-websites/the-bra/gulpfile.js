"use strict";

// load all gulp plugins
var requireDir = require('require-dir'),
    gulp = require('gulp'),
    wrench = require('wrench'),
    $ = require('gulp-load-plugins')({
      pattern: ['gulp-*', 'uglify-save-license', 'del']
    });
    // watch = require('gulp-watch');

// load all gulp task files
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

gulp.task('default', 
	gulp.parallel([
		'images',
		'fonts',
		'js',
		'styles',
		'html'
	])
);


gulp.task('watch', function() {
	gulp.watch('./src/fonts/**/*.*', gulp.series([
		'fonts'
	]));
	gulp.watch('./src/html/**/*.html', gulp.series([
		'html'
	]));
	gulp.watch('./src/sass/**/*.scss', gulp.series([
		'styles'
	]));
	gulp.watch('./src/js/**/*.js', gulp.series([
		'js'
	]));
	gulp.watch('./src/img/**/*', gulp.series([
		'images'
	]));
});
