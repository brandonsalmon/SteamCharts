var gulp = require('gulp');
var concat = require('gulp-concat');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var sass = require('gulp-sass');
var bower = require('gulp-bower');

var jsLib = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-route/angular-route.js',
    'bower_components/highcharts/highcharts.js',
    'bower_components/moment/moment.js',
    'bower_components/humanize-duration/humanize-duration.js',
    'bower_components/underscore/underscore.js',
    'bower_components/socket.io-client/socket.io.js'
];
var cssLib = [
    'bower_components/bootstrap/dist/css/bootstrap.css'
];
var jsApp = [
    'client/js/highcharts/themes/steam.js',
    'client/js/angular/app.js',
    'client/js/angular/router.js'
];
var jsControllers = [
    'client/js/angular/controllers/**/*.js'
];
var jsServices = [
    'client/js/angular/services/**/*.js'
];
var jsDirectives = [
    'client/js/angular/services/**/*.js'
];
var sassApp = [
    'client/css/site.scss'
];

gulp.task('default', ['install', 'compile']);
gulp.task('watch', ['default', 'watch:packages', 'watch:gulp', 'watch:js', 'watch:css']);

// Install
gulp.task('install', ['install:npm', 'install:bower']);
gulp.task('install:npm', function () {
    // Todo
});
gulp.task('install:bower', function () {
    return bower();
});

// Compile
gulp.task('compile', ['compile:js', 'compile:css']);
gulp.task('compile:js', ['compile:js:lib', 'compile:js:app']);
gulp.task('compile:js:lib', function () {
    return gulp.src(jsLib)
        .pipe(gulp.dest('compiled/dev/js'))
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('compiled/debug/js'))
        .pipe(uglify())
        .pipe(concat('lib.min.js'))
        .pipe(gulp.dest('compiled/release/js'));
});
gulp.task('compile:js:app', function () {
    return gulp.src(jsApp.concat(jsControllers).concat(jsServices).concat(jsDirectives))
        .pipe(gulp.dest('compiled/dev/js'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('compiled/debug/js'))
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('compiled/release/js'));
});
gulp.task('compile:css', ['compile:css:lib', 'compile:sass']);
gulp.task('compile:css:lib', function () {
    return gulp.src(cssLib)
        .pipe(gulp.dest('compiled/dev/css'))
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('compiled/debug/css'))
        .pipe(uglifycss())
        .pipe(concat('lib.min.css'))
        .pipe(gulp.dest('compiled/release/css'));
});
gulp.task('compile:sass', function () {
    return gulp.src(sassApp)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('compiled/dev/css'))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('compiled/debug/css'))
        .pipe(uglifycss())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('compiled/release/css'));
});

// Watch
gulp.task('watch:packages', function () {
    // Todo
});
gulp.task('watch:gulp', function () {
    gulp.watch(['gulpfile.js'], [])
        .on('change', function (event) {
            console.log(event.path + ' was ' + event.type);
        });
});
gulp.task('watch:js', function () {
    var src = jsLib.concat(jsApp);

    return gulp.watch(src, ['compile:js'])
        .on('change', function (event) {
            console.log(event.path + ' was ' + event.type + ', compiling js...');
        });
});
gulp.task('watch:css', function () {
    var src = cssLib.concat(sassApp);

    return gulp.watch(src, ['compile:sass'])
        .on('change', function (event) {
            console.log(event.path + ' was ' + event.type + ', compiling sass...');
        });
});