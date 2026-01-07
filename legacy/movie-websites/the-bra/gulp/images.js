"use strict";

var gulp = require("gulp");
var del = require('del');
var path = require('path');
var through = require('through2');
var scaleImages = require('gulp-scale-images');
var imagemin = require('gulp-imagemin');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var imageminPngquant = require('imagemin-jpeg-recompress');

gulp.task('images:clean', function() {
	return del('_site/img/**');
});


const computeScaleInstructions = (file, _, cb) => {
    file.scale = {
		maxWidth: 1000,
    }
    cb(null, file)
}

const computeFileName = (output, scale, cb) => {
    const fileName = path.basename(output.path, output.extname) + output.extname;
    cb(null, fileName)
}

gulp.task('images:scaleandcopy', 
	function(done) {
		var img = 
			gulp.src('./src/img/**/*.{jpeg,jpg,png,gif}')
			.pipe(through.obj(computeScaleInstructions))
			.pipe(scaleImages(computeFileName))
			.pipe(imagemin([
				imageminJpegRecompress({quality:'medium'}),
				imageminPngquant({quality:'80'}),
			]))
			.pipe(gulp.dest('./_site/img'));
			done();
	}
);

gulp.task('images:copysvg', 
	function(done) {
		var img = 
			gulp.src('./src/img/**/*.svg')
			.pipe(imagemin([
				imagemin.svgo({
				    plugins: [
				        {removeViewBox: true},
				        {cleanupIDs: false}
				    ]
				})
			]))
			.pipe(gulp.dest('./_site/img'));
			done();
	}
);

gulp.task('favicons:copy', 
	function(done) {
		var favicon = 
			gulp.src('./src/favicons/**/*.png')
			.pipe(gulp.dest('./_site/favicons'));
			done();
	}
);

gulp.task('favicon:copy', 
	function(done) {
		var favicon = 
			gulp.src('./src/favicons/**/*.ico')
			.pipe(gulp.dest('./_site'));
			done();
	}
);

gulp.task('images', 
	gulp.series([
		'images:clean',
		gulp.parallel(
			'images:copysvg',
			'images:scaleandcopy',
			'favicons:copy',
			'favicon:copy'
		)
	])
);