'use strict';

var gulp = require('gulp');
var del = require('del');
var devServer = require('gulp-develop-server');
var notify = require('gulp-notify');

//清空dist目录
gulp.task('clean', (callback) => del(['./dist/'], callback));

//复制src目录的文件到dist目录
gulp.task('copy', () => gulp.src(['./src/**/*']).pipe(gulp.dest('./dist/')));

//启动程序
gulp.task('serve', () => devServer.listen({path: './dist/index.js'}));

//重新启动程序
gulp.task('restart', () => {
  devServer.restart();
  gulp.src('./src/index.js')
    .pipe(notify('程序已重新启动成功！'));
});

//监听src目录文件变化（注意不要用./src，否则不能监听新增，改名等变化）
gulp.task('watch', (callback) => gulp.watch(['src/**/*'], gulp.series('copy', 'restart')));

//默认任务，入口点（命令： gulp / gulp default）
//noinspection JSUnresolvedFunction
gulp.task('default', gulp.series('clean', 'copy', gulp.parallel('serve', 'watch')));
