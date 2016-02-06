var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

gulp.task('browser-sync', ['sass'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("lib/sass/*.scss", ['sass']);
  gulp.watch("lib/js/*.js", ['compress']);
  gulp.watch("assets/js/*.js").on('change', browserSync.reload);
  gulp.watch("**/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("lib/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("assets/css"))
    .pipe(browserSync.stream());
});

gulp.task('compress', function() {
  return gulp.src("lib/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'));
})

gulp.task('default', ['browser-sync']);
