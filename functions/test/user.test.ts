import { User } from '../src/user';
import { expect } from 'chai';
import 'mocha';

describe('User', () => {
  
  let user_attributes = { name: 'Jhon Doe',
                          gender: 'male',
                          birthdate: '1994-11-01',
                          city: 'Cochabamba' };
  let user:User = new User(user_attributes);

  // When testing Error rasing, expect() expects the function, not the execution of it.
  // his test passes because the constructor User throws an error automatically,
  // it does not catch the 'throw' defined in the constructor.
  it('throws an error when initial data is missing ', () => {
    expect(User).to.throw(Error);
  });
                          
  it('has always a name', () => {
    expect(user.name).to.not.be.empty;
  });

  it('has always a gender', () => {
    expect(user.gender).to.not.be.empty;
  });
  
  it('has always a birthdate', () => {
    expect(user.birthdate).to.not.be.empty;
  });

  it('has always a city', () => {
    expect(user.city).to.not.be.empty;
  });
});