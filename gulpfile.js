var gulp = require('gulp'),
    less = require('gulp-less'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify');

gulp.task('less', function () {
    return gulp.src('./less/styles.less')
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('./css'));
});

gulp.task('scripts', function () {
    return gulp.src(
        ['./js/vendor/jquery-1.12.0.min.js',
            './js/helpers.js',
            './js/storage.js',
            './js/clock.js',
            './js/validation.js',
            './js/main.js'
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'));
});

gulp.task('watch', function () {
    gulp.watch(
        ['./js/helpers.js',
            './js/storage.js',
            './js/clock.js',
            './js/validation.js',
            './js/main.js'
        ], ['scripts']);
    gulp.watch('./less/**/*.less', ['less']);
});

// Default Task
gulp.task('default', ['watch']);