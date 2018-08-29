// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const standard = require('gulp-standard')
const del = require('del');
const cmd = require('gulp-run-command').default;
const jsdoc = require('gulp-jsdoc3');
const jsdocConfig = require('./jsdoc.json');
 
//doc task
gulp.task('doc', function () {
    del(['docs']).then(() => gulp.src([ 'README.md', './index.js', './config.js', './app/**/*.js'], {read: false})
        .pipe(jsdoc(jsdocConfig)));
    
});

// Lint Task
gulp.task('lint', () => {
    return gulp.src('app/**/*.js')
            .pipe(standard({fix: true}))
            .pipe(standard.reporter('default', {}));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('app/*.js', ['lint']);
});

//test
gulp.task('test', ['lint'], () => {
    return cmd('npm test', {quiet: false})();
});


// Default Task
gulp.task('default', ['watch']);

