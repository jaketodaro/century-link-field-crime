var gulp = require('gulp');
var sequence = require('gulp-sequence');

var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js', function() {
  return gulp.src(['src/app.js', 'src/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src('src/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie >= 10']
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['js']);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('default', sequence('clean', ['copy', 'js', 'sass']));