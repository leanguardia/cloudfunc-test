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

describe('CloudFunc Offline Test', () => {
  let adminInitStub, myFunctions;

  describe('makeUppercase', () => {

    before(() => {
      // Stub admin.initializeApp to be a dummy function that doesn't do anything.
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

  describe('addMessage', () => {
    let oldDatabase;

    before(()=> {
      oldDatabase = admin.database;
    });

    after(()=> {
      admin.database = oldDatabase;
    });

    it('should return a 303 redirect', (done)=> {
      const refParam = '/messages';
      const pushParam = { original: 'input' };
      const databaseStub = sinon.stub();
      const refStub = sinon.stub();
      const pushStub = sinon.stub();

      // Override the behavior of admin.database().ref('/messages')
      // .push({ original: 'input' }) to return a promise that resolves with { ref: 'new_ref' }.
      // This mimics the behavior of a push to the database, which returns an object containing a
      // ref property representing the URL of the newly pushed item.

      Object.defineProperty(admin, 'database', { get: () => databaseStub });
      databaseStub.returns({ ref: refStub });
      refStub.withArgs(refParam).returns({ push: pushStub });
      pushStub.withArgs(pushParam).returns(Promise.resolve({ ref: 'new_ref' }));

      // A fake request object, with req.query.text set to 'input'
      const req = { query: {text: 'input'} };
      // A fake response object, with a stubbed redirect function which asserts that it is called
      // with parameters 303, 'new_ref'.
      const res = {
        redirect: (code, url) => {
          assert.equal(code, 303);
          assert.equal(url, 'new_ref');
          done();
        }
      };

      // Invoke addMessage with our fake request and response objects. This will cause the
      // assertions in the response object to be evaluated.
      myFunctions.addMessage(req, res);

    });
  
  });
});


