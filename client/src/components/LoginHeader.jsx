import React from 'react';

import { inject } from 'mobx-react';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import SignupModal from './SignupModal';

import classnames from 'classnames';

@graphql(
    gql`
        mutation($username: String!) {
            usernameExists(username: $username)
        }
    `,
    { name: 'checkUsername' }
)
@graphql(
    gql`
        mutation($username: String!, $password: String!) {
            passwordCorrect(username: $username, password: $password)
        }
    `,
    { name: 'checkPassword' }
)
@graphql(
    gql`
        mutation($username: String!, $password: String!) {
            login(username: $username, password: $password) {
                username
                email
                jwt
            }
        }
    `,
    { name: 'login' }
)
@inject('userStore')
class LoginHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            errorUsername: false,
            errorPassword: false,
            signup: false
        };
    }

    login = async e => {
        if (!this.state.username | !this.state.password) {
            this.setState({ signup: true });
        } else {
            this.setState({ isLoading: true });

            const { data } = await this.props.checkUsername({
                variables: {
                    username: this.state.username
                }
            });

            const user = data.usernameExists;
            const errorUsername = !user;

            this.setState({ errorUsername });

            if (user) {
                const { data } = await this.props.checkPassword({
                    variables: {
                        username: this.state.username,
                        password: this.state.password
                    }
                });

                const password = data.passwordCorrect;
                const errorPassword = !password;

                this.setState({ errorPassword });

                if (password) {
                    const { data } = await this.props.login({
                        variables: {
                            username: this.state.username,
                            password: this.state.password
                        }
                    });

                    if (data.login) {
                        await this.props.userStore.login(
                            data.login.username,
                            data.login.email,
                            data.login.jwt
                        );
                    }
                }
            }

            if (!this.props.userStore.isAuthenticated) {
                this.setState({ isLoading: false });
            }
        }
    };

    hideSignup = () => {
        this.setState({ signup: false });
    };

    render() {
        return (
            <div className="navbar-end">
                <SignupModal active={this.state.signup} hide={this.hideSignup} />
                <div className="navbar-item">
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                type="text"
                                className={classnames('input is-small', {
                                    'is-danger': this.state.errorUsername
                                })}
                                placeholder="Username"
                                value={this.state.username}
                                onChange={e => {
                                    this.setState({ username: e.target.value });
                                }}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-user" />
                            </span>
                        </p>
                    </div>
                </div>
                <div className="navbar-item">
                    <div className="field">
                        <p className="control has-icons-left">
                            <input
                                type="password"
                                className={classnames('input is-small', {
                                    'is-danger': this.state.errorPassword
                                })}
                                placeholder="Password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState({ password: e.target.value });
                                }}
                            />
                            <span class="icon is-small is-left">
                                <i class="fas fa-lock" />
                            </span>
                        </p>
                    </div>
                </div>
                <div className="navbar-item">
                    <a
                        class={classnames('button is-light', {
                            'is-loading': this.state.isLoading
                        })}
                        onClick={this.login}
                    >
                        Login / Signup
                    </a>
                </div>
            </div>
        );
    }
}

export default LoginHeader;
