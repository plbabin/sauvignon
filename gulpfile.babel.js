import gulp from 'gulp';
import autoprefixer from 'autoprefixer';
import browserify from 'browserify';
import watchify from 'watchify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import rimraf from 'rimraf';
import notify from 'gulp-notify';
import browserSync, { reload } from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import nested from 'postcss-nested';
import vars from 'postcss-simple-vars';
import extend from 'postcss-simple-extend';
import cssnano from 'cssnano';
import htmlReplace from 'gulp-html-replace';
import image from 'gulp-image';
import runSequence from 'run-sequence';
import gls from 'gulp-live-server'
import babel from 'gulp-babel'
//import nodemon from 'gulp-nodemon'
import rename from 'gulp-rename'
import sass from 'gulp-sass';
import svgSprite from 'gulp-svg-sprite';
import path from 'path';
import fs from 'fs';

const paths = {
  bundle: 'app.js',
  srcJsx: 'app/scripts/main.js',
  srcLintJsx: ['app/scripts/**/*'],
  srcCss: 'app/scss/**/*.scss',
  srcImg: ['app/images/**', '!app/images/**/*.svg'],
  srcIcons: 'app/images/icons/**/*.svg',
  srcFavicons: 'app/favicons/**',
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

gulp.task('clean', cb => {
  rimraf('dist', cb);
});

// gulp.task('clean:server', cb => {
//   rimraf('./server.js', cb);
// });

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
  // var server = gls.new('./server.js');
  // server.start();
  // gulp.watch(['./server.babel.js'], ['server:transpile']);
  // gulp.watch('./server.js', () => server.start() ); //error

  var server = gls.static('dist', port);
  server.start();
});

gulp.task('watchify', ['lint'],() => {
  let bundler = watchify(browserify(paths.srcJsx, watchify.args));

  function rebundle() {
    return bundler
      .bundle()
      .on('error', notify.onError())
      .pipe(source(paths.bundle))
      .pipe(gulp.dest(paths.distJs))
      .pipe(reload({stream: true}));
  }

  bundler.transform(babelify.configure({
      ignore: /(bower_components)|(node_modules)/
  }))
  .on('update', rebundle);
  return rebundle();
});

gulp.task('browserify', ['lint'], () => {
  browserify(paths.srcJsx)
  .transform(babelify.configure({
      ignore: /(bower_components)|(node_modules)/
  }))
  .bundle()
  .pipe(source(paths.bundle))
  .pipe(buffer())
  .pipe(sourcemaps.init())
  .pipe(uglify())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(paths.distJs));
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
  .pipe(htmlReplace({css: ['styles/sprite.css', 'styles/main.css'], js: 'js/app.js'}))
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
  gulp.src(paths.srcFavicons)
    .pipe(image())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watchTask', () => {
  gulp.watch(paths.srcCss, ['styles']);
  gulp.watch(paths.srcJsx, ['lint']);
});

gulp.task('watch', cb => {
  runSequence('clean', ['watchTask', 'watchify', 'svg:sprite', 'styles', 'html', 'images', 'favicons'], 'browserSync',  cb);
});

gulp.task('build', cb => {
  process.env.NODE_ENV = 'production';
  runSequence('clean', ['browserify', 'svg:sprite', 'styles', 'htmlReplace', 'images'], cb);
});

gulp.task('default', ['watch']);
