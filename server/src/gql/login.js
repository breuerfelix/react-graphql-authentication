import gql from 'graphql-tag';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
import config from '../config';

import { userDB } from '../database';

const typeDef = gql`
    type User {
        username: String
        email: String
        jwt: String
    }

    type Mutation {
        usernameExists(username: String!): Boolean
        emailExists(email: String!): Boolean
        passwordCorrect(username: String!, password: String!): Boolean
        login(username: String!, password: String!): User
        signup(username: String!, email: String!, password: String!): Boolean
        verifyToken(token: String!): User
    }
`;

const resolver = {
    Mutation: {
        usernameExists: async (obj, { username }) => {
            return await checkUsername(username);
        },
        emailExists: async (obj, { email }) => {
            return await userDB.getUserByEmail(email);
        },
        passwordCorrect: async (obj, { username, password }) => {
            return await checkPassword(username, password);
        },
        login: async (root, { username, password }, context) => {
            const user = await checkUsername(username);

            if (user) {
                const checkedPassword = await checkPassword(username, password);
                if (checkedPassword) {
                    const token = jwt.sign(
                        {
                            username
                        },
                        config.jwtSecret
                    );

                    const u = await userDB.updateToken(username, token);

                    return { username: u.username, email: u.email, jwt: token };
                } else {
                    throw new Error('Password is incorrect!');
                }
            } else {
                throw new Error('Username does no exist!');
            }
        },
        signup: (obj, { username, email, password }) => {},
        verifyToken: async (obj, { token }) => {
            try {
                const decoded = jwt.decode(token);
                const user = await userDB.getUser(decoded.username);
                if (user) {
                    if (user.iat === decoded.iat) {
                        return { username: user.username, email: user.email };
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } catch (err) {
                return null;
            }
        }
    }
};

async function checkUsername(username) {
    return await userDB.getUser(username);
}

async function checkPassword(username, password) {
    const user = await userDB.getUser(username);

    if (user) {
        const compare = await bcrypt.compare(password, user.password);
        return compare;
    } else {
        return false;
    }
}

module.exports = {
    loginSchema: typeDef,
    loginResolver: resolver
};
