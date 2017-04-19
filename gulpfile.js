var paths = {
	build: './build/scss/main.scss',
	stylesheet: './assets/css/'
};

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	browserSync = require('browser-sync').create(),
	plugins = gulpLoadPlugins(); // Last Injection

// gulp.task('browser-sync', function() {
// 	browserSync.init({
// 				proxy: "localhost:8888/wjpro/",
// 				port: 3000
// 	});
// });

gulp.task('sass', function () {
	gulp.src(paths.build)
		.pipe(plugins.plumber())
		.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass({
				includePaths: require('node-bourbon').includePaths,
				outputStyle: 'compressed'
			}))
		.pipe(plugins.rename('style.css'))
		.pipe(plugins.sourcemaps.write())
		.pipe(gulp.dest(paths.stylesheet))
		.pipe(browserSync.stream())
		.pipe(plugins.notify("Sass Compiled..."));
});

gulp.task('final', function () {
	gulp.src(paths.stylesheet + 'build/style.scss')
		.pipe(plugins.plumber())
			.pipe(plugins.sass({
				includePaths: require('node-bourbon').includePaths,
				outputStyle: 'compressed'
			}))
		.pipe(plugins.rename('layout.css'))
		.pipe(gulp.dest(paths.stylesheet))
		.pipe(browserSync.stream())
});

gulp.task('watch', function() {
  gulp.watch('**/*.scss', ['sass']);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['sass', 'watch'], function() {
});
