import React from 'react';

import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import history from './utils/history';
import classnames from 'classnames';

import LoginHeader from './components/loginHeader';

@inject('userStore')
@observer
class NavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile: false
        };
    }

    logout = e => {
        this.props.userStore.logout();
    };

    render() {
        const auth = this.props.userStore.isAuthenticated;

        const userLinks = (
            <div className="navbar-end">
                <div class="navbar-item">
                    <Link to="/profile" class="button is-light">
                        Profile
                    </Link>
                </div>
                <div class="navbar-item">
                    <Link to="/domains" class="button is-light">
                        Domains
                    </Link>
                </div>
                <div className="navbar-item">
                    <a class="button is-light" onClick={this.logout}>
                        Logout
                    </a>
                </div>
            </div>
        );

        return (
            <nav class="navbar is-light is-fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                        <Link to="/" class="navbar-item">
                            Home
                        </Link>
                        <a
                            role="button"
                            class="navbar-burger"
                            aria-label="menu"
                            aria-expanded="false"
                            onClick={() => {
                                this.setState({ mobile: !this.state.mobile });
                            }}
                        >
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                            <span aria-hidden="true" />
                        </a>
                    </div>
                    <div className={classnames('navbar-menu', { 'is-active': this.state.mobile })}>
                        <div className="navbar-start">
                            <div className="navbar-item">
                                <Link to="/documentation" class="button is-light">
                                    Documentation
                                </Link>
                            </div>
                        </div>
                        {auth ? userLinks : <LoginHeader />}
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;
