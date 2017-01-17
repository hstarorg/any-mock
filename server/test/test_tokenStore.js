const assert = require('assert');
const tokenStore = require('./../src/common/tokenStore');

describe('Test token store', function () {
  it('test get set', function () {
    tokenStore.set('aaa', { a: 1 });
    assert.equal(1, tokenStore.get('aaa').a);
  });
});
