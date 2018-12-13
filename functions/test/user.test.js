const assert = require('chai').assert;
let User = require('../lib/user');

describe('User', ()=> {

    it('has a name field', ()=> {
        let user = new User("Jhon Doe");
        assert.isDefined(user.name, 'Name has been defined');
    });

    // it('is invalid if name fielsd is missing', ()=> {
    //     let user = new User();
    //     assert.
    // });
});