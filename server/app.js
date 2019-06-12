const express = require(`express`);
const bodyParser = require(`body-parser`);
const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');
const graphqlHttp = require('express-graphql');
const multer = require('multer');

// Database connect
const {
	dbconnect
} = require('./utils/database.js');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'storage');
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === 'image/png' ||
		file.mimetype === 'image/jpg' ||
		file.mimetype === 'image/jpeg'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, err => console.log(err));
};


const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const auth = require('./middleware/auth');

const app = express();

app.use(bodyParser.json());
app.use(
	multer({
		storage,
		fileFilter
	}).single('image')
);
app.use('/storage', express.static(path.join(__dirname, 'storage')));

if (process.env.NODE_ENV !== 'development') {
	app.use(serveStatic(path.join(__dirname, '../client')));
}

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200);
	}
	next();
});

app.use(auth);

app.put('/file-upload', (req, res, next) => {
	if (!req.isAuth) {
		throw new Error('Not authenticated!');
	}
	if (!req.file) {
		return res.status(200).json({
			message: 'No file provided!'
		});
	}
	if (req.body.oldPath) {
		clearImage(req.body.oldPath);
	}
	return res
		.status(201)
		.json({
			message: 'File stored!',
			filePath: req.file.path
		});
});


app.use('/graphql', graphqlHttp({
	schema: graphqlSchema,
	rootValue: graphqlResolver,
	graphiql: true,
	customFormatErrorFn(err) {
		console.log(err)
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
	const server = await app.listen(port, () => console.log(`Example app listening on http://localhost:${port}!`));
	const io = require('./socket').init(server);
	io.on('connection', socket => {
		console.log('Client connected');
	})
});
