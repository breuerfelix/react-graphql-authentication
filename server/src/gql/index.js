import { makeExecutableSchema, mergeSchemas } from 'graphql-tools';
import gql from 'graphql-tag';

import merge from 'lodash/merge';

import { loginResolver, loginSchema } from './login';
import { userDB } from '../database';
import config from '../config';
import jwt from 'jsonwebtoken';

const typeDef = gql`
    type Query {
        helloworld: String
    }
`;

const resolver = {
    Query: {
        helloworld: () => {
            console.log('test');
        }
    }
};

//merge schemas
const typeDefs = [typeDef, loginSchema];

//merge resolver
const resolvers = merge(resolver, loginResolver);

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const gqlMiddleware = async req => {
    const auth = req.headers.authorization;
    var user = null;

    if (auth) {
        const token = auth.split(' ')[1];

        try {
            const decoded = jwt.verify(token, config.jwtSecret);
            const u = await userDB.getUser(decoded.username);
            if (u) {
                if (u.iat === decoded.iat) {
                    //define what is being passed
                    user = { username: u.username, email: u.email };
                }
            }
        } catch (err) {}
    }

    return { schema, context: user };
};

export default gqlMiddleware;
