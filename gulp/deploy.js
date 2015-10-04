'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src(path.join(conf.paths.dist, '/**/*'))
    .pipe(ghPages({
      push: false
    }));
});
