const User = require('../models/user')
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();

describe('User model', function () {

    it('should be able to retrieve by id', async() => {
        const theUser = await User.getById(1);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });
    
    it('should error if no user by id', async ()=> {
        const theUser = await User.getById(27645);
        expect(theUser).to.be.null;
    });

    it('should update the user', async () => {
        const theUser = await User.getById(1);
        theUser.email = 'new@new.com';
        await theUser.save();

        // re-grab the user with id 2
        const alsoTheUser = await User.getById(2);
        // // expect the email to be equal to the new value
        expect(theUser.email).to.equal('new@new.com');
    });

    it ('should be able to check for correct passwords', async () => {
        //get a user with id 1
        const theUser = await User.getById(1);
        // set their password field to "bacon"
        theUser.setPassword("bacon");
        // save them to the database
        await theUser.save();
        //get them back out of the databse
        const sameUser = await User.getById(1);
        //ask them if their password is "bacon"
        const isCorrectPassword = theUser.checkPassword("bacon");
        expect(isCorrectPassword).to.be.true;

        const isNotCorrectPassword = sameUser.checkPassword('antibacon');
        expect(isNotCorrectPassword).to.be.false;
    });
});