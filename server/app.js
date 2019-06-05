const express = require(`express`);
const bodyParser = require(`body-parser`);
const serveStatic = require('serve-static');
const path = require('path');
const graphqlHttp = require('express-graphql');

// Database connect
const {
	dbconnect
} = require('./utils/database.js');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'development') {
	app.use(serveStatic(path.join(__dirname, '../client')));
}

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, application/x-www-form-urlencoded');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200)
	}
	next();
});

app.use('/graphql', graphqlHttp({
	schema: graphqlSchema,
	rootValue: graphqlResolver,
	graphiql: true,
	customFormatErrorFn(err) {
		if (!err.originalError) {
			return err;
		}
		const data = err.originalError.data;
		const message = err.message || 'An error occured!';
		const code = err.originalError.code || 500;

		return {
			message,
			status: code,
			data
		}
	}
}));

app.use((error, req, res) => {
	res.status(error.status || 500);
	res.render(`error`, {
		message: error.message,
		error: !config.IS_PRODUCTION ? error : {}
	});
});

const port = process.env.PORT || 5000;

dbconnect(async () => {
	await app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));
});
