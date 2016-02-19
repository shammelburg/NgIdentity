/// <binding BeforeBuild='angular, scripts' />
/// <vs BeforeBuild='angular, scripts, css' />
// include plug-ins
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');



//delete the output file(s)
gulp.task('clean', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(['gulp/*']);
});

gulp.task('css', function () {
    return gulp.src(['Content/*.css', '!Content/*.min.css'])
        .pipe(minifyCss())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('gulp/'));
});

var config = {
    //Include all js files but exclude any min.js files
    src: ['app/**/**/*.js', '!app/**/*.min.js']
}
// Combine and minify all files from the app folder
// This tasks depends on the clean task which means gulp will ensure that the 
// Clean task is completed before running the scripts task.
gulp.task('angular', function () {
    return gulp.src(config.src)
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('gulp/'));
});

var scriptjs = {
    src: ['Scripts/jquery-1.9.1.min.js',
            'Scripts/bootstrap.min.js',
            'Scripts/angular.min.js',
            'Scripts/angular-ui-router.min.js',
            'Scripts/angular-block-ui.min.js',
            'scripts/angular-local-storage.min.js',
            'Scripts/angular-ui/ui-bootstrap.min.js',
            'Scripts/angular-ui/ui-bootstrap-tpls.min.js']
};
gulp.task('scripts', function () {

    return gulp.src(scriptjs.src)
      .pipe(uglify())
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest('gulp/'));
});

//Set a default tasks
gulp.task('default', ['scripts'], function () { });