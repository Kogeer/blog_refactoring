import SessionService from './session-service.js';

describe('SessionService test', () => {
    describe('registrateSession', () => {
        it('Should return the session', () => {
            //arrange
            const expected = {user:'admin'};
            const sessionService = new SessionService();

            //act
            const actual = sessionService.registrateSession('admin');

            //arrange
            expect(expected).toEqual(actual);
        })
    })

    describe('isValidSession', () => {
        it('Shold be truthy if session is valid', () => {
            //arrange
            const sessionService = new SessionService();
            sessionService.session = [{user:'admin'}];
            const req = {
                cookies : {
                    authcookie : 'admin'
                }
            }
            let res;
            const next = () => true;
            
            //act
            const actual = sessionService.isValidSession(req,res,next);
    
            //arrange
            expect(actual).toBeTruthy();
        })

        it('Should be falsy if session is unvalid', () => {
            //arrange
            const sessionService = new SessionService();
            const req = {
                cookies: {
                    authcookie: 'admin'
                }
            }
            const res = {
                redirect: () => {}
            }
            const next = () => {};
            
            //act
            const actual = sessionService.isValidSession(req,res,next);

            //arrange
            expect(actual).toBeFalsy();
        })
    })
})