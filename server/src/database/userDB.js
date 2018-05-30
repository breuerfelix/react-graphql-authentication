import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import jwt from 'jsonwebtoken';

const adapter = new FileSync('./databaseUser.json');
const userLow = low(adapter);

userLow.defaults({ users: [] }).write();

class userDB {
    async getUserByEmail(email) {
        return userLow
            .get('users')
            .find({ email })
            .value();
    }

    async updateToken(username, token) {
        return userLow
            .get('users')
            .find({ username })
            .set('iat', jwt.decode(token).iat)
            .write();
    }

    async getUser(username) {
        return userLow
            .get('users')
            .find({ username })
            .value();
    }
}

export default new userDB();
