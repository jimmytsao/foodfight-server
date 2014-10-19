'use strict';

var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var nodemon       = require('gulp-nodemon');
var mocha         = require('gulp-mocha');
var istanbul      = require('gulp-istanbul');
/*******************************************************
 *            File Paths and Values
 ******************************************************/

var paths = {

  //All server side scripts
  serverScripts: ['server.js', 'server/**/*.js'],

  //All server side scripts except test scripts
  nonTestScripts: ['server.js', 'server/**/*.js', '!server/**/*.unit.test.js'],

  //Main server side js file 
  mainServerAppFile: 'server.js',

  //Nodemon files to not watch
  nodemonIgnoreFiles: ['node_modules/**/*.js'],

  //Unit test files
  serverSideMochaTestFiles: ['server/**/*.unit.test.js']
};

/*******************************************************
 *                Tasks
 ******************************************************/

//Lint files with jshint
gulp.task('serverLint', function(){
  gulp
    .src(paths.serverScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

//Start nodemon server
gulp.task('serve', ['serverUnitTests'], function() {
  nodemon({script: paths.mainServerAppFile, ignore: [paths.nodemonIgnoreFiles]})
    .on('change', ['serverUnitTests']);
});


/*******************************************************
 *            Testing Tasks
 ******************************************************/

gulp.task('serverUnitTests', ['serverLint'], function(){
  return gulp
    .src(paths.serverSideMochaTestFiles, {read: false})
    .pipe(mocha({reporter: 'min'}));
});

//Istanbul code coverage
gulp.task('coverage', ['serverLint'], function (cb) {
  gulp.src(paths.nonTestScripts)
    .pipe(istanbul({includeUntested: true})) // Includes all files listed in src
    .on('finish', function () {
      gulp.src(paths.serverSideMochaTestFiles, {read: false})
        .pipe(mocha({reporter: 'min'}))
        .pipe(istanbul.writeReports({
            reporters: [ 'lcov', 'text', 'text-summary'],
          }))
        .on('end', cb);
    });
});
/*******************************************************
 *            Defined Task Groups
 ******************************************************/

gulp.task('test', ['coverage']);
gulp.task('default', ['serve']);
