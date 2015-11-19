'use strict';

import gulp from 'gulp';

// babel/browserify
import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

// gulp plugins
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import notify from 'gulp-notify';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import image from 'gulp-image';
import gls from 'gulp-live-server'
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import sass from 'gulp-sass';
import svgSprite from 'gulp-svg-sprite';

// postCSS
import autoprefixer from 'autoprefixer';
import rimraf from 'rimraf';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';

// utils
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import runSequence from 'run-sequence';
import path from 'path';
import fs from 'fs';
import merge from 'utils-merge';

// server
import browserSync, { reload } from 'browser-sync';
import htmlReplace from 'gulp-html-replace';

// nicer browserify errors
import gutil from 'gulp-util';
import chalk from 'chalk';

const paths = {
  bundle: 'app.js',
  bundleMinify: 'app.min.js',
  srcJsx: 'app/scripts/main.js',
  srcLintJsx: ['app/scripts/**/*'],
  srcCss: 'app/scss/**/*.scss',
  srcImg: ['app/images/**', '!app/images/**/*.svg'],
  srcIcons: 'app/images/icons/**/*.svg',
  srcImgFavicons: 'app/favicons/**/*.png',
  srcFavicons: 'app/favicons/**/*',
  dist: 'dist',
  distJs: 'dist/js',
  distCss: 'dist/css',
  distImg: 'dist/images'
};

const svgConfig = {
    mode                : {
        css             : {
            prefix: '.%s',
            dimensions:true, //include in the  shape rule
            render      : {
                css     : true
            }
        }
    }
};

/* 
 * HELPERS FUNCTIONS
 */
function map_error(err) {
  if (err.fileName) {
    // regular error
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.fileName.replace(__dirname + '/scripts/', ''))
      + ': '
      + 'Line '
      + chalk.magenta(err.lineNumber)
      + ' & '
      + 'Column '
      + chalk.magenta(err.columnNumber || err.column)
      + ': '
      + chalk.blue(err.description))
  } else {
    // browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message))
  }

  //this.end()
}

function bundle_js(bundler) {
  return bundler.bundle()
    .on('error', map_error)
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(gulp.dest(paths.distJs))
    .pipe(rename(paths.bundleMinify))
    .pipe(sourcemaps.init({ loadMaps: true }))
      // capture sourcemaps from transforms
      .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs))
}

/* 
 * GULP TASKS
 */
gulp.task('clean', cb => {
  rimraf('dist', cb);
});

gulp.task('watchify', function () {
  var args = merge(watchify.args, { debug: true });

  var bundler = browserify(paths.srcJsx, args) // Browserify
      .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
      .transform(babelify, {
        ignore: /(bower_components)|(node_modules)/,
        presets: ['stage-0', 'react']
      }); // Babel tranforms

  bundle_js(bundler);

  bundler.on('update', function () {
    bundle_js(bundler).pipe(reload({stream: true}))
  })
})

// Without watchify
gulp.task('browserify', function () {
  var bundler = browserify(paths.srcJsx, { debug: false }).transform(babelify, {
    ignore: /(bower_components)|(node_modules)/,
    presets: ['stage-0', 'react']
  })

  return bundle_js(bundler)
});

// Without sourcemaps
gulp.task('browserify-production', function () {
  var bundler = browserify(paths.srcJsx).transform(babelify, {
    ignore: /(bower_components)|(node_modules)/,
    presets: ['stage-0', 'react']
  })

  return bundler.bundle()
    .on('error', map_error)
    .pipe(source(paths.bundle))
    .pipe(buffer())
    .pipe(rename(paths.bundleMinify))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJs))
});

gulp.task('styles', () => {
  gulp.src(paths.srcCss)
  .pipe(sourcemaps.init())
  .pipe(sass({
    importer: (url, prev, done) => {
      var regex = /^~/;
      if (!url.match(regex)) {

        var cssImportRegex = /^((\/\/)|(http:\/\/)|(https:\/\/))/;
        // if we don't escape this, then it's breaking the normal css @import
        if (url.match(cssImportRegex)) {
          return done({file: '\'' + url + '\''});
        }

        return done({file: url});
      }

      var newFile = path.join(__dirname, 'node_modules', url.replace(regex, ''));
      return done({file: newFile}); 
    }
  }).on('error', sass.logError))
  .pipe(postcss([vars, extend, nested, autoprefixer, cssnano]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distCss))
  .pipe(reload({stream: true}));
});

gulp.task('htmlReplace', () => {
  gulp.src('app/index.html')
  .pipe(htmlReplace({css: ['styles/sprite.css', 'styles/main.css'], js: 'js/'+paths.bundleMinify}))
  .pipe(gulp.dest(paths.dist));
});

gulp.task('html', () => {
  gulp.src('app/index.html')
  .pipe(gulp.dest(paths.dist));
});

gulp.task('images', () => {
  gulp.src(paths.srcImg)
  .pipe(image())
  .pipe(gulp.dest(paths.distImg));
});

gulp.task('lint', () => {
  gulp.src(paths.srcLintJsx)
    .pipe(eslint({
      useEslintrc:true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('svg:sprite', ()=> {
  gulp.src(paths.srcIcons)
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest(paths.dist));  
});

gulp.task('favicons', function(cb) {
  gulp.src(paths.srcImgFavicons)
    .pipe(image())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('other-fav-files', function(cb) {
  gulp.src(['!'+paths.srcImgFavicons, paths.srcFavicons])
    .pipe(gulp.dest(paths.dist));
});

gulp.task('browserSync', ['server'], () => {
  let port = process.env.PORT || 5000;

  browserSync.init(null, {
    proxy: 'http://localhost:'+port,
    files: ['dist/**/*.*'],
    port: 7000,
  });
});

gulp.task('server:transpile', () => {
  gulp.src('server.babel.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(rename('server.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('server', () => {
  let port = process.env.PORT || 5000;

  var server = gls.static('dist', port);
  server.start();
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['watchTask', 'watchify', 'styles', 'svg:sprite', 'html', 'images'], 'browserSync',  cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'svg:sprite', 'styles', 'htmlReplace', 'images'], cb);
});

gulp.task('default', ['watch']);
