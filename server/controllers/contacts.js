import {ObjectId} from 'mongodb';
import {getDb} from '../db/connect.js';

/** @typedef {import('../../node_modules/@types/express-serve-static-core').Request} ExpressRequest */
/** @typedef {import('../../node_modules/@types/express-serve-static-core').Response} ExpressResponse */

// GET route for getting all contacts that returns a 200 status
export const getAll = async (request, response) => {
	try {
		const results = await getDb('cse341-ls02')
			.collection('contacts')
			.find({})
			.limit(50)
			.toArray();
		response.status(200).json(results);
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
};

/**
 * GET route for getting a single contact that returns a 200 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
export const getSingle = async (request, response) => {
	if (!request.params.id) {
		return response.sendStatus(400, 'No ID found');
	}

	try {
		const contactId = new ObjectId(request.params.id);
		const results = await getDb('cse341-ls02')
			.collection('contacts')
			.find({_id: contactId})
			.toArray();

		if (Array.isArray(results) && results.length > 0) {
			response.status(200).json(results[0]);
		} else {
			response.status(404).json({message: 'Contact not found!'});
		}
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
};

/**
 * POST route for creating new contacts that returns the ID of the new contact and a 201 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
export const postSingle = async (request, response) => {
	if (!request.body) {
		return response.sendStatus(400, 'No body found');
	}

	try {
		const newContact = contactFromBody(request.body);
		const result = await getDb('cse341-ls02')
			.collection('contacts')
			.insertOne(newContact);
		response.status(201).json({ id: result.insertedId });
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
};

/** PUT route for updating a contact that returns a 204 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
export const putSingle = async (request, response) => {
	if (!request.params.id) {
		return response.sendStatus(400, 'No ID found');
	}

	if (!request.body) {
		return response.sendStatus(400, 'No body found');
	}

	const contactId = new ObjectId(request.params.id);
	const result = await getDb('cse341-ls02')
		.collection('contacts')
		.find({_id: contactId})
		.toArray();
	if (Array.isArray(result) && result.length > 0) {
		const updatedContact = contactFromBody(request.body, result[0]);
		await getDb('cse341-ls02')
			.collection('contacts')
			.updateOne({_id: contactId}, {$set: updatedContact});
		response.status(204).json(updatedContact);
	} else {
		response.status(404).json({message: 'Contact not found!'});
	}
};

/** DELETE route for deleting a contact that returns a 200 status
 * @param {ExpressRequest} request
 * @param {ExpressResponse} response
 */
export const deleteSingle = async (request, response) => {
	if (!request.params.id) {
		return response.sendStatus(400, 'No ID found');
	}

	try {
		const contactId = new ObjectId(request.params.id);
		await getDb('cse341-ls02')
			.collection('contacts')
			.deleteSingle({ _id: contactId });
		response.status(200).json({ message: 'Contact deleted' });
	} catch (error) {
		response.status(500).json({ message: error.message });
	}
};

/**
 * Copies body data (if defined) to contact object
 * @param {Object} body
 * @param {Object} oldContact
 * @returns {Object}
 */
const contactFromBody = (body, oldContact = {}) => {
	const allowedFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];
	// eslint-disable-next-line unicorn/no-array-reduce
	return allowedFields.reduce((acc, field) => {
		acc[field] = body[field] || oldContact[field];
		return acc;
	}, {});
};

const contacts = { getAll, getSingle, postSingle, putSingle, deleteSingle };
export default contacts;
