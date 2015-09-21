var gulp = require('gulp');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

gulp.task('default', ['watch']);

gulp.task('watch', function () {
    var jsWatcher = gulp.watch(['bower_components/**/*.js', 'public/js/**/*.js'], ['compile:js']);
    var sassWatcher = gulp.watch(['**/*.sass'], ['compile:sass']);

    jsWatcher.on('change', function (event) {
        console.log(event.path + ' was ' + event.type + ', compiling js...');
    });

    sassWatcher.on('change', function (event) {
        console.log(event.path + ' was ' + event.type + ', compiling sass...');
    });
});

gulp.task('compile:sass', function () {

});

gulp.task('compile:js', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/highcharts/highcharts.js',
        'bower_components/moment/moment.js',
        'bower_components/humanize-duration/humanize-duration.js',
        'bower_components/underscore/underscore.js',
        'bower_components/socket.io-client/socket.io.js',
        'public/js/src/angular/app/app.js',
        'public/js/src/angular/socketService.js',
        'public/js/src/angular/ChartController.js',
        'public/js/src/highcharts/themes/steam.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('public'))
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest('public'));
});