import React from 'react';

import { inject } from 'mobx-react';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import classnames from 'classnames';

@graphql(
    gql`
        mutation($username: String!) {
            usernameExists(username: $username)
        }
    `,
    { name: 'usernameExists' }
)
@graphql(
    gql`
        mutation($email: String!) {
            emailExists(email: $email)
        }
    `,
    { name: 'emailExists' }
)
@graphql(
    gql`
        mutation($username: String!, $email: String!, $password: String!) {
            signup(username: $username, email: $email, password: $password)
        }
    `,
    { name: 'signup' }
)
@inject('userStore')
class SignupModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordVisible: false,
            errors: []
        };
    }

    submit = async e => {};

    render() {
        const show = 'show';
        const hide = 'hide';

        const errors = this.state.errors.map(error => (
            <div class="notification is-danger" key={error}>
                {error}
            </div>
        ));

        return (
            <div
                class={classnames('modal', {
                    'is-active': this.props.active
                })}
            >
                <div class="modal-background" />
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            Get your free Account here!
                        </p>
                        <button
                            class="delete"
                            aria-label="close"
                            onClick={e => {
                                this.props.hide();
                            }}
                        />
                    </header>
                    <section class="modal-card-body">
                        {this.state.errors.length > 0 && (
                            <div>
                                <ul>{errors}</ul>
                                <br />
                            </div>
                        )}

                        <div class="field">
                            <label class="label">Username</label>
                            <div class="control has-icons-left">
                                <input
                                    class="input"
                                    type="text"
                                    placeholder="Choose a Username"
                                    value={this.state.username}
                                    onChange={e => {
                                        this.setState({
                                            username: e.target.value
                                        });
                                    }}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-user" />
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Email</label>
                            <div class="control has-icons-left">
                                <input
                                    class="input"
                                    type="email"
                                    placeholder="Enter your Email"
                                    value={this.state.email}
                                    onChange={e => {
                                        this.setState({
                                            email: e.target.value
                                        });
                                    }}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-envelope" />
                                </span>
                            </div>
                        </div>

                        <label class="label">Password</label>
                        <div class="field has-addons">
                            <p class="control is-expanded has-icons-left">
                                <input
                                    class="input"
                                    type={classnames({
                                        password: !this.state.passwordVisible,
                                        text: this.state.passwordVisible
                                    })}
                                    placeholder="Password must be at least 8 characters long"
                                    value={this.state.password}
                                    onChange={e => {
                                        this.setState({
                                            password: e.target.value
                                        });
                                    }}
                                />
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock" />
                                </span>
                            </p>

                            <p class="control">
                                <a
                                    class="button is-outlined"
                                    onClick={() => {
                                        this.setState({
                                            passwordVisible: !this.state
                                                .passwordVisible
                                        });
                                    }}
                                >
                                    <i
                                        class={classnames('fas', {
                                            'fa-eye': this.state
                                                .passwordVisible,
                                            'fa-eye-slash': !this.state
                                                .passwordVisible
                                        })}
                                    />
                                </a>
                            </p>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button is-success" onClick={this.submit}>
                            Submit
                        </button>
                        <button
                            class="button"
                            onClick={e => {
                                this.props.hide();
                            }}
                        >
                            Cancel
                        </button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default SignupModal;
