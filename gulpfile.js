var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var cleanCSS = require('gulp-clean-css'); 


gulp.task('publish',function(){
	gulp.src(['./sourse/*/*.js','./sourse/*/js/*.js'])
		.pipe(concat('main.js'))
		.pipe(uglify().on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        }))
		.pipe(gulp.dest('./dest/js'));
	gulp.src(['./sourse/*/css/*.css','./sourse/*/*.css'])
		.pipe(concat('main.css'))
		.pipe(cleanCSS().on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        }))
		.pipe(gulp.dest('./dest/css'));
})