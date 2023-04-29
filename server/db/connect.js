import process from 'node:process';
import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoURL = process.env.DB_CONNECTION;

/** @type {MongoClient} */
let _db;

/**
 * @callback InitDbCallback
 * @param {Error} err
 * @param {MongoClient} db
 * @returns {void}
 */

/**
 * Initializes the database connection
 * @param {import('./connect.js').InitDbCallback} callback
 * @returns {void}
 * @throws {Error}
 */
export const initDb = callback => {
	if (_db) {
		console.log('Db is already initialized!');
		return callback(null, _db);
	}

	MongoClient.connect(mongoURL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then(client => {
			_db = client;
			callback(null, _db);
		})
		.catch(error => {
			callback(error);
		});
};

/**
 *
 * @param {String} name
 * @returns {Db}
 */
export const getDb = name => {
	if (!_db) {
		throw new Error('Db not initialized');
	}

	return _db.db(name);
};

const connect = {initDb, getDb};
export default connect;
