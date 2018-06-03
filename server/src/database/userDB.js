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

    async addUser(username, email, password) {
        const errors = [];
        var error = false;

        if (!username) {
            errors.push('Username is empty.');
            error = true;
        }

        if (!email) {
            errors.push('Email is empty.');
            error = true;
        }

        if (!password) {
            errors.push('Password is empty.');
            error = true;
        }

        if (error) return errors;

        const user = await this.getUser(username);
        if (user) {
            errors.push('Username already exists.');
            error = true;
        }

        const userEmail = this.getUserByEmail(userEmail);
        if (userEmail) {
            errors.push('There is already an Account with this Email.');
            error = true;
        }

        if (error) return errors;

        const newUser = userLow
            .get('users')
            .push({ username, email, password })
            .write();

        if (!newUser) {
            errors.push('Failed adding the User.');
        }

        return errors;
    }
}

export default new userDB();
