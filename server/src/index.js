import express from 'express';
import path from 'path';
import open from 'open';

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import gqlMiddleware from './gql';

import bodyParser from 'body-parser';

var dev = process.env.NODE_ENV !== 'production';

const port = 3000;
const app = express();
app.listen(port, function(error) {
    if (error) {
        console.log('Error: ' + error);
    } else {
        console.log(`Listening on Port: ${port}`);
        //open(`http://localhost:${port}`)
    }
});

const parser = bodyParser.json();
app.use(parser);

app.use('/gql', parser, graphqlExpress(gqlMiddleware));

if (dev) {
    app.use('/giql', graphiqlExpress({ endpointURL: '/gql' }));
}

if (!dev) {
    //static files
    app.use(express.static(path.resolve(__dirname, '../../public')));

    //requests to react
    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
}
