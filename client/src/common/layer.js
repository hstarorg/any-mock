const noop = function () { };

export const layer = {
  msg(message, done) {
    return window.layer.msg(message, {
      offset: 20,
      shift: 3,
      icon: 1,
      time: 1500
    }, done || noop);
  },

  error(message) {
    return window.layer.msg(message, {
      offset: 20,
      shift: 3,
      icon: 2,
      time: 1500
    });
  },

  close(index) {
    window.layer.close(index);
  },

  closeAll() {
    window.layer.closeAll();
  }
};
