var gulp = require('gulp');
var sequence = require('gulp-sequence');

var angularProtractor = require('gulp-angular-protractor');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var mergeStream = require('merge-stream');
var ngTemplate = require('gulp-ngtemplate');
var sass = require('gulp-sass');
var Server = require('karma').Server;

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(clean());
});

gulp.task('copy', function() {
  return gulp.src('img/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('js', function () {
  var jsStream = gulp.src(['src/app.js', 'src/**/*.js']);

  var templateStream = gulp.src('src/**/*.tpl.html')
    .pipe(ngTemplate({module: 'CrimeReport'}));

  return mergeStream(jsStream, templateStream)
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
  gulp.watch(['src/**/*.js', 'src/**/*.tpl.html'], ['js']);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('test:unit', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('test:e2e', function(callback) {
  gulp
    .src(['example_spec.js'])
    .pipe(angularProtractor({
      'configFile': 'protractor.conf.js',
      'debug': false,
      'autoStartStopServer': true
    }))
    .on('error', function(e) {
      console.log(e);
    })
    .on('end', callback);
});

gulp.task('test', ['test:unit', 'test:e2e']);

gulp.task('default', sequence('clean', ['copy', 'js', 'sass']));