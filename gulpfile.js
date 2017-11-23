var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var less = require('gulp-less');

var appFiles = {
    htmlfiles:[
        'index.html',
        './app/views/*.html',
        './app/**/*.html'
    ],
    cssFiles:[
        './app/assets/*.less'
    ],
    jsFiles: [
        './app/*.js',
        './app/config/*.js',
        './app/services/**/*.js',
        './app/models/**/*.js',
        './app/controllers/*.js'
    ]
};

gulp.task('clean', function(){
    return gulp.src('src/*')
    .pipe(clean());
});

gulp.task('jshint', function(){
    return gulp.src(appFiles.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('js', function(){
    return gulp.src(appFiles.jsFiles)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('src/'));
});

gulp.task('less', function(){
    return gulp.src(appFiles.cssFiles)
    .pipe(less())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('src/'));
});

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

gulp.task('serve', ['less', 'js'], function(){
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });

   gulp.watch(appFiles.htmlfiles, ['reload']);
   gulp.watch(appFiles.cssFiles, ['less', 'reload']);
   gulp.watch(appFiles.jsFiles, ['js', 'reload']);

});

gulp.task('default',['serve']);