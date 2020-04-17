import UserService from './user-service.js';

describe('UserService test', () => {
    describe('validUser', () => {
        it('Should return user when the user is valid', () => {
            //arrange
            const expected = {userName:'admin',password:'admin'}
            const userService = new UserService();

            //act
            const actual = userService.validUser('admin','admin')

            //assert
            expect(actual).toEqual(expected);
        })

        it('Should return false when the user is invalid', () => {
            //arrange
            const fakeUser = {userName:'valaki',password:'admin'}
            const userService = new UserService();
            
            //act
            const actual = userService.validUser(fakeUser.userName,fakeUser.password);

            //assert
            expect(actual).toBeFalsy();
        })
    })
})