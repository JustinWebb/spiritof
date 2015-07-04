/* 
* @Author: justinwebb
* @Date:   2015-07-03 19:07:06
* @Last Modified by:   justinwebb
* @Last Modified time: 2015-07-03 21:01:42
*/

// ---------------------------------------------------------
// Build process dependencies
// ---------------------------------------------------------
var gulp = require('gulp');
var sync = require('run-sequence');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var config = require('./build.config');


// ---------------------------------------------------------
// Tasks definitions
// ---------------------------------------------------------

// --------------- Contiguous Integration ---------------//

gulp.task('clean', function () {
  del(config.dist);
});

gulp.task('copy', function () {
  var targets = config.src_files.hbs;
  gulp.src(targets)
    .pipe(gulp.dest(config.dist));
});

gulp.task('sass', function () {
  gulp.src(config.src_files.sass)
    .on('error', sass.logError)
    .pipe(sourcemaps.init())
    .pipe(sass({
        sourcemap: true
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.css_dir));
});

// Create deployable files
gulp.task('build', function (cb) {
  sync('clean', 'copy', 'sass', cb);
});

gulp.task('deploy', function () {
  gulp.src(config.ghost.src)
    .pipe(gulp.dest(config.ghost.themes + '/spiritof'))
});