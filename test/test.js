const User = require('../models/user')
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

describe('User model', function () {

    it('should be able to retrieve by id', async() => {
        const theUser = await User.getById(1);
        theUser.should.be.an.instanceOf(User);
    });

    it('should error if no user by id', async ()=> {
        const theUser = await User.getById(27645);
        expect(theUser).to.be.null;
    });

    it('should update the user', async () => {
        const theUser = await User.getById(1);
        theUser.email = 'new@new.com';
        await theUser.save();
        const alsoTheUser = await User.getById(2);
        expect(theUser.email).to.equal('new@new.com');
    });

    it ('should be able to check for correct passwords', async () => {
        const theUser = await User.getById(1);
        theUser.setPassword("bacon");
        await theUser.save();
        const sameUser = await User.getById(1);
        const isCorrectPassword = theUser.checkPassword("waffles");
        expect(isCorrectPassword).to.be.true;

        const isNotCorrectPassword = sameUser.checkPassword('notwaffles');
        expect(isNotCorrectPassword).to.be.false;
    });

    it('should encrypt the password', async () => {
        const theUser = await User.getById(1);
        theUser.setPassword("password");
        expect (theUser.password).not.to.equal('password');
    });
});