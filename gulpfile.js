let gulp = require('gulp'),
    less = require('gulp-less'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    minifyCss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sftp = require('gulp-sftp');

// serv
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});

// less -> css
gulp.task('css', function(){  

  return gulp.src('app/less/bem.less')
    .pipe(less())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 9'], {cascade: true}))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}));

});
 
// Build project in dist
gulp.task('build', ['css', 'clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

// Clean dist
gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean());
});

gulp.task('watch', ['browser-sync', 'css'], function() {
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/less/**/*.less', ['css']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});