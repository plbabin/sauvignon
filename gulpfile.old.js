var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var del = require('del');
// set variable via $ gulp --type production
var environment = $.util.env.type || 'development';
var isProduction = environment === 'production';
var webpackConfig = require('./webpack.config.js').getConfig(environment);

var port = $.util.env.port || 3333;
var app = 'app/';
var dist = 'dist/';

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [                 
  'ff >= 30',
  'chrome >= 34',
  'safari >= 6',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];
 
var svgConfig = {
    mode                : {
        css             : {
            prefix: ".%s",
            dimensions:true, //include in the  shape rule
            render      : {
                css     : true
            }
        }
    }
};

gulp.task('scripts', function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + 'js/'))
    .pipe($.size({ title : 'js' }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task('html', function() {
  return gulp.src(app + 'index.html')
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : 'html' }))
    .pipe($.connect.reload());
});

gulp.task('styles', ['svg:sprite', 'styles:scss'], function(cb) {
  gulp.start(['styles:concat']);
});

gulp.task('styles:scss:reload', ['styles:scss'], function(){
  gulp.start(['styles:concat']);
});

gulp.task('styles:scss', function(cb) {
  // convert scss to css
  return $.rubySass(app + 'scss/main.scss', { sourcemap: true })
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers})) 
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.connect.reload());
});

gulp.task('styles:concat', function(cb) {
  gulp.src([dist + 'css/main.css', dist + 'css/sprite.css'])
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat('styles.css'))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest(dist + 'css/'))
    .pipe($.size({ title : 'css' }))
    .pipe($.connect.reload())
});

// add livereload on the given port
gulp.task('serve', function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

// copy images
gulp.task('images', function(cb) {
  return gulp.src([app + 'images/**/*.{png,jpg,jpeg,gif}'])
    .pipe($.size({ title : 'images' }))
    .pipe(gulp.dest(dist + 'images/'));
});

gulp.task('favicons', function(cb) {
  return gulp.src([app + '/favicons/**/*'])
    .pipe(gulp.dest(dist));
});

// watch styl, html and js file changes
gulp.task('watch', function() {
  gulp.watch(app + 'scss/**/*.scss', ['styles:scss']);
  gulp.watch(app + 'index.html', ['html']);
  gulp.watch(app + 'scripts/**/*.js', ['scripts']);
  gulp.watch(app + 'scripts/**/*.jsx', ['scripts']);
});

// remove bundels
gulp.task('clean', function(cb) {
  del([dist], cb);
});


gulp.task('svg:sprite', function() {
  return gulp.src(app+'images/icons/**/*.svg')
      .pipe($.svgSprite(svgConfig))
      .pipe(gulp.dest(dist));  
});


// by default build project and then watch files in order to trigger livereload
gulp.task('default', ['build', 'serve', 'watch']);

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function(){
  gulp.start(['images', 'html','scripts','styles', 'favicons']);
});
