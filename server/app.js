const express = require(`express`);
const bodyParser = require(`body-parser`);
const serveStatic = require('serve-static');
const path = require('path');

// Database connect
const {
	dbconnect
} = require('./utils/database.js');

// Routers
const mainRouter = require('./routers/main.js');
const user = require('./routers/user.js');

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'development') {
	app.use(serveStatic(path.join(__dirname, '../client')));
}

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token, application/x-www-form-urlencoded');
	next();
});

app.use('/', mainRouter);
app.use('/user', user);

app.use((req, res, next) => {
	const err = new Error(`Not Found`);
	err.status = 404;
	next(err);
});

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
