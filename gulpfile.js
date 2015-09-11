var gulp = require('gulp');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');

gulp.task('default', ['compile:js']);

gulp.task('compile:js', function () {
	return gulp.src([
		'bower_components/jquery/dist/jquery.js',
		'bower_components/angular/angular.js',
		'bower_components/highcharts/highcharts.js',
		'bower_components/underscore/underscore.js',
		'public/js/src/angular/app/app.js',
		'public/js/src/angular/*.js',
		'public/js/src/highcharts/**/*.js',
		'public/js/src/*.js'
	])
		.pipe(uglify())
		.pipe(concat('app.min.js'))
		.pipe(gulp.dest('public/js'));
});

var watcher = gulp.watch(['bower_components/**/*.js', 'public/js/src/**/*.js'], ['compile:js']);
watcher.on('change', function (event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});