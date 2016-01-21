var paths = {
  build: './build/min',
	stylesheet: './assets/css'
};

var gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins(); // Last Injection

gulp.task('sass', function () {
    gulp.src('./build/scss/main.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
          .pipe(plugins.sass({
            includePaths: require('node-bourbon').includePaths,
            outputStyle: 'compressed'
          }))
          .pipe(plugins.autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
          }))
				.pipe(plugins.rename('style.css'))
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest(paths.stylesheet))
        .pipe(plugins.notify("Sass Compiled..."))
        .pipe(plugins.livereload({quiet:true}));
});

gulp.task('plugins', function() {
  gulp.src(['./build/js/*.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.concat('min1.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(paths.build))
    .pipe(plugins.notify("Min1 Created.."))
    .pipe(plugins.livereload())
});

gulp.task('scripts', function() {
  gulp.src(['./build/min/min1.js', './build/js/script/script.js'])
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
      .pipe(plugins.concat('min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest(paths.js))
    .pipe(plugins.sourcemaps.write())
    .pipe(plugins.notify("Min Compiled!"))
    .pipe(plugins.livereload())
});


gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch('./build/', ['sass', 'scripts']);
});

// Default task
gulp.task('default', ['sass', 'scripts', 'watch'], function() {
  //other stuff
});
