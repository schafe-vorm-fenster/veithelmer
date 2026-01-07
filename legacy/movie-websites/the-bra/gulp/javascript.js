"use strict";

var gulp = require("gulp");
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jquery = require('jquery');

gulp.task('js:clean', function() {
	return del('_site/js/**');
});

gulp.task('js:merge',
	function(done) {
		var js = 
			gulp.src([
				"./node_modules/jquery/dist/jquery.js", 
				"./node_modules/bootstrap/dist/js/bootstrap.js",
				"./src/js/lib/*.js",
				"./src/js/*.js"
				])
		    .pipe(concat('scripts.js'))
		    .pipe(uglify())
			.pipe(gulp.dest("./_site/js"));
		done();
	}
);

gulp.task('js', 
	gulp.series([
		'js:clean',
		'js:merge'
	])
);
