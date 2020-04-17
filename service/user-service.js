import User from '../domain/user.js'
const userAdmin = [{
    name: 'admin',
    password: 'admin'
}]

export default class UserService {
    /**
     * 
     * @param {string} userName 
     * @returns {User} 
     */
    validUser(userName,password) {
        const validUser = userAdmin.find((user) => {
            if(user.name === userName && user.password === password) {
                return user;
            }
        })

        if(!validUser) {
           return false;
        }

        return new User(validUser.name,validUser.password);
    }
}