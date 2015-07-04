/* 
* @Author: justinwebb
* @Date:   2015-07-03 19:07:06
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-07-04 00:13:01
*/

// ---------------------------------------------------------
// Build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var sync = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var path = require('path');
var config = require('./build.config');


// ---------------------------------------------------------
// Tasks definitions
// ---------------------------------------------------------

// --------------- Contiguous Integration ---------------//

gulp.task('clean', function (cb) {
  del(config.dist, {force: true});
  cb();
});

gulp.task('copy', function () {
  var targets = config.src_files.hbs;
  return gulp.src(targets)
    .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {
  return gulp.src(config.src_files.sass)
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(sass({
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css_dir));
});

gulp.task('dist', function () {
  var themeDir = path.join(config.ghost.themes, path.basename(__dirname));
  return gulp.src(config.ghost.src)
    .pipe(gulp.dest(themeDir));
});

// Create deployable files
gulp.task('build', function (cb) {
  sync('clean', 'copy', 'sass', 'dist', cb);
});

gulp.task('print', function () {
  var out = path.basename(__dirname);
  console.log('Print: ', out);
});
