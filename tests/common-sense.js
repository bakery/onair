var assert = require('assert');

suite('Common sense', function() {
  test('in the server', function(done, server) {
    assert.equal(2,2);
    done();
  });
});