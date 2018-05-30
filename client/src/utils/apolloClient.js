import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
    uri: '/gql',
    request: async operation => {
        const token = localStorage.jwtToken;

        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : null
            }
        });
    }
});

export default client;
