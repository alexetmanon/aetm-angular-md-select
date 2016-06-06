var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass');

var sources = {
    js: ["src/aetm-md-select.js"],
    scss: ["src/aetm-md-select.scss"]
};

gulp.task('uglify', function() {
    return gulp
        .src(sources.js)
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    return gulp
        .src(sources.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['sass', 'uglify']);

gulp.task('default', ['build']);