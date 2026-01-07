"use strict";

var gulp = require("gulp");
var del = require('del');


gulp.task('fontsClear', function() {
	return del('_site/fonts/**');
});

gulp.task('fontsCopy',
	function(done) {
		var fonts = 
			gulp.src(['./src/fonts/**/*','./node_modules/socicon/font/*'])
			.pipe(gulp.dest('./_site/fonts'));
		done();
	}
);

gulp.task('fonts', 
	gulp.series([
		'fontsClear',
		'fontsCopy'
	])
);
