import React from 'react';
import { inject, observer } from 'mobx-react';
import userStore from '../stores/userStore';
import history from './history';

export default function(ComposedComponent) {
    @inject(['userStore'])
    @observer
    class Authenticate extends React.Component {
        constructor(props) {
            super(props);

            if (!userStore.isAuthenticated) {
                userStore.logout();
                history.push('/');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return Authenticate;
}
