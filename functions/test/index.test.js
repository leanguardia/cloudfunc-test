// Assertions library
const assert = require('chai').assert;
// Stub library
const sinon = require('sinon');

// Require firebase-admin so we can stub out some of its methods.
const admin = require('firebase-admin');

// Not passing in any parameters will initialize 'test' as "offline mode"
let test = require('firebase-functions-test')();
// which means we have to stub out all the methods that interact
// with Firebase services.

describe('CloudFunc Test', () => {
  let adminInitStub, myFunctions;

  describe('Offline mode', () => {

    before(() => {
      // Here we stub admin.initializeApp to be a dummy function that doesn't do anything.
      adminInitStub = sinon.stub(admin, 'initializeApp');
      myFunctions = require('../lib/index');
    });

    after(() => {
      // Restore admin.initializeApp() to its original method.
      adminInitStub.restore();
      test.cleanup();
    });

    it('tests non-HTTP functions like makeUppercase', () => {
      const childStub = sinon.stub();
      const setStub = sinon.stub();
      const snap = {
        val: () => 'Hallo Welt',
        ref: {
          parent: {
            child: childStub,
          }
        }
      };
      childStub.withArgs('uppercase').returns({ set: setStub });
      setStub.withArgs('HALLO WELT').returns(true);

      const wrappedMakeUppercase = test.wrap(myFunctions.makeUppercase);
      return assert.equal(wrappedMakeUppercase(snap), true);
    });

  });
});


