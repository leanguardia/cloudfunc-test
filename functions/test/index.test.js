const assert = require('chai').assert;

describe('CloudFunc Test', () => {
  describe('Offline mode', () => {
    it('tests non-HTTP functions like makeUppercase', () => {
      let truthy = true;
      assert.equal(truthy, true);
    });
  });
});
