"use strict";

var gulp = require("gulp");
var gutil = require('gulp-util');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var htmlbeautify = require('gulp-html-beautify');

var htmlminOptions = {
	removeComments : true,
	keepClosingSlash : true,
	preserveLineBreaks : true,
	collapseWhitespace : true,
	conservativeCollapse : true
};

var htmlbeautifyOptions = {
	"indent_size" : 4,
	"indent_char" : " ",
	"eol" : "\n",
	"indent_level" : 0,
	"indent_with_tabs" : true,
	"preserve_newlines" : false,
	"max_preserve_newlines" : 1,
	"jslint_happy" : false,
	"space_after_anon_function" : false,
	"brace_style" : "collapse",
	"keep_array_indentation" : false,
	"keep_function_indentation" : false,
	"space_before_conditional" : true,
	"break_chained_methods" : false,
	"eval_code" : false,
	"unescape_strings" : false,
	"wrap_line_length" : 0,
	"wrap_attributes" : "auto",
	"wrap_attributes_indent_size" : 4,
	"end_with_newline" : false,
	"extra_liners" : [ "html", "head", "/head", "body", "/body", "/html" ]
};


function getEnv(){
	if(gutil.env.env) return gutil.env.env;
	return 'dev';
}

gulp.task('html:clean', function() {
	return del('_site/**/*.html');
});


gulp.task('html:copy', 
	function(done) {
		var html = 
			gulp.src('./src/html/**/*.html')
			.pipe(htmlmin(htmlminOptions))
			.pipe(htmlbeautify(htmlbeautifyOptions))
			.pipe(gulp.dest('./_site'));
			done();
	}
);

gulp.task('html', 
	gulp.series([
		'html:clean',
		'html:copy'
	])
);
