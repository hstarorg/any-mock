let gulp = require('gulp');
let devServer = require('gulp-develop-server');
let notifier = require('node-notifier');

let files = [
  './src/**/*.js'
];

gulp.task('server:start', done => {
  devServer.listen({ path: './src/index.js' });
  done();
});

gulp.task('server:restart', done => {
  devServer.restart();
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