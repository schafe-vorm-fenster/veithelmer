"use strict";

var gulp = require("gulp");
var del = require('del');
var sass = require("gulp-sass");
var cleanCss = require('gulp-clean-css');

//var bootstrap = require('bootstrap');

gulp.task('css:clean', function() {
	return del('_site/css/**');
});


gulp.task('css:render',
	function(done) {
		var styles = 
			gulp.src('./src/sass/**/*.scss')
			.pipe(sass({ includePaths : ['./node_modules/bootstrap/scss','./node_modules/bootstrap/scss/mixins','./node_modules/bootstrap/scss/utilities'] }).on('error', sass.logError))
			.pipe(cleanCss())
			.pipe(gulp.dest("./_site/css"));
		done();
	}
);

gulp.task('styles', 
		gulp.series([
			'css:clean',
			'css:render'
		])
	);
