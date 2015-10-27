var gulp = require('gulp'),
		sass = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		sourcemaps = require('gulp-sourcemaps'),
		browserSync = require('browser-sync').create(),
		rubySass = require('gulp-ruby-sass'),
		minifyCss = require('gulp-minify-css'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		jshint = require('gulp-jshint')
	;

// gulp.task('sass', function() {
// 	return gulp.src('./sass/style.scss')
// 		.pipe(sourcemaps.init())
// 		.pipe(sass({
// 			includePaths: ['./sass']
// 		}).on('error', sass.logError))
// 		.pipe(autoprefixer())
// 		.pipe(sourcemaps.write())
// 		.pipe(gulp.dest('./'))
// 		.pipe(browserSync.stream())
// 		;
// });

gulp.task('rubySass', function() {
	return rubySass('./sass/style.scss', {sourcemap: true})
		.on('error', rubySass.logError)
		.pipe(autoprefixer())
		.pipe(minifyCss())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./'))
		.pipe(browserSync.stream())
		;
});

// Compress Images
gulp.task('imagemin', function() {
	return gulp.src('./images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewbox}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('./images'))
		;
});

// JShint Javascript
gulp.task('lint', function() {
	return gulp.src('./js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
		;
});

gulp.task('serve', ['rubySass'], function() {
	browserSync.init({
		proxy: 'localhost/master/gulp-theme'
	});
	gulp.watch('./sass/**/*.scss', ['rubySass']);
	gulp.watch('**/*.php').on('change', browserSync.reload)
});

gulp.task('default', ['serve']);
