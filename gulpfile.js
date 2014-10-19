'use strict';

var gulp          = require('gulp');
var jshint        = require('gulp-jshint');
var nodemon       = require('gulp-nodemon');
var mocha         = require('gulp-mocha');

/*******************************************************
 *            File Paths and Values
 ******************************************************/

var paths = {

  //Server side scripts
  serverScripts: ['server.js', 'server/**/*.js'],

  //Main server side js file 
  mainServerAppFile: 'server.js',

  //Nodemon files to not watch
  nodemonIgnoreFiles: ['node_modules/**/*.js'],

  //Unit test files
  serverSideMochaTestFiles: ['server/**/*.unit.test.js']
};

/*******************************************************
 *            Server Side Build Tasks 
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
 *            Server Side Testing Tasks 
 ******************************************************/

gulp.task('serverUnitTests', ['serverLint'], function(){
  return gulp
    .src(paths.serverSideMochaTestFiles, {read: false})
    .pipe(mocha({reporter: 'min'}));
});

/*******************************************************
 *            Defined Task Groups
 ******************************************************/

gulp.task('test', ['serverUnitTests']);
gulp.task('default', ['serve']);
