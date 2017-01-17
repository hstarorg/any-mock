const assert = require('assert');
const tokenStore = require('./../src/common/tokenStore');

describe('Test token store', function (done) {
  it('test', function () {
    tokenStore.set('aaa', { a: 1 });
    assert.equal(1, tokenStore.get('aaa').a);
    setTimeout(() => {
      console.log(tokenStore.get('aaa'));
      assert.equal(undefined, tokenStore.get('aaa'));
      done();
    }, 100);
  });
});
