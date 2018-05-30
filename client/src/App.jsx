import React from 'react';

import { Provider } from 'mobx-react';
import store from './stores';

import client from './utils/apolloClient';
import { ApolloProvider } from 'react-apollo';

import { Router, Route, Switch } from 'react-router-dom';

import NavigationBar from './NavigationBar';
import Register from './sites/register';
import Error from './sites/Error';
import Documentation from './sites/documentation';

import history from './utils/history';
import auth from './utils/authenticate';

class App extends React.Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider {...store}>
                    <Router history={history}>
                        <div>
                            <Route path="/" component={NavigationBar} />
                            <div className="container">
                                <Switch>
                                    <Route
                                        path="/documentation"
                                        component={Documentation}
                                    />
                                    <Route
                                        path="/register"
                                        component={Register}
                                    />
                                    <Route path="/" exact />
                                    <Route component={Error} />
                                </Switch>
                            </div>
                        </div>
                    </Router>
                </Provider>
            </ApolloProvider>
        );
    }
}

export default App;
