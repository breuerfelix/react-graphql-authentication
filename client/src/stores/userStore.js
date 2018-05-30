import { observable, action, computed } from 'mobx';

import history from '../utils/history';
import { validateInput, validateLogin } from '../validation';

import jwt from 'jsonwebtoken';
import client from '../utils/apolloClient';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

class userStore {
    @observable username = '';
    @observable email = '';

    @observable isAuthenticated = false;

    @action
    login(username, email, token) {
        localStorage.jwtToken = token;

        this.username = username;
        this.email = email;
        this.isAuthenticated = true;
    }

    @action
    logout() {
        if (localStorage.jwtToken) {
            delete localStorage.jwtToken;
        }

        this.isAuthenticated = false;
        this.username = '';
        this.email = '';

        client.resetStore();

        history.push('/');
    }

    @action
    verifyToken(token) {
        const verify = gql`
            mutation($token: String!) {
                verifyToken(token: $token) {
                    username
                    email
                }
            }
        `;

        client.mutate({ mutation: verify, variables: { token: token } }).then(({ data }) => {
            if (data.verifyToken) {
                this.login(data.verifyToken.username, data.verifyToken.email, token);
            } else {
                this.logout();
            }
        });
    }
}

export default new userStore();
