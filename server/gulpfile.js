const gulp = require('gulp4');
const devServer = require('gulp-develop-server');
const notifier = require('node-notifier');

const files = [
  './src/**/*.js'
];

gulp.task('server:start', done => {
  devServer.listen({ path: './src/index.js' }, err => err && console.error(err));
  done();
});

gulp.task('server:restart', done => {
  devServer.restart(err => {
    err && console.error(err);
  });
  notifier.notify({
    title: 'Notify',
    sound: true,
    message: 'Server restart successfully.'
  });
  done();
});

gulp.task('watch', done => {
  gulp.watch(files).on('change', gulp.series('server:restart'));
  done();
});

gulp.task('default', gulp.series('server:start', 'watch'));
