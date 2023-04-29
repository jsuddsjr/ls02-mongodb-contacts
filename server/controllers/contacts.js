import {ObjectId} from 'mongodb';
import {getDb} from '../db/connect.js';

export const getAll = async (request, response, _next) => {
	try {
		const results = await getDb('cse341-ls02')
			.collection('contacts')
			.find({})
			.limit(50)
			.toArray();
		response.setHeader('Content-Type', 'application/json');
		response.status(200).json(results);
	} catch (error) {
		console.log('err', error);
		response.status(500).json({error});
	}
};

export const getSingle = async (request, response, _next) => {
	try {
		const contactId = new ObjectId(request.params.id);
		const results = await getDb('cse341-ls02')
			.collection('contacts')
			.find({_id: contactId})
			.toArray();

		if (Array.isArray(results) && results.length > 0) {
			response.setHeader('Content-Type', 'application/json');
			response.status(200).json(results[0]);
		} else {
			response.status(404).json({message: 'Contact not found!'});
		}
	} catch (error) {
		response.status(500).json({message: error});
	}
};

// POST route for creating new contacts that returns the ID of the new contact and a 201 status
export const post = async (request, response, _next) => {
	try {
		const newContact = contactFromBody(request.body);
		const result = await getDb('cse341-ls02')
			.collection('contacts')
			.insertOne(newContact);
		response.status(201).json({message: 'Contact created!', id: result.insertedId});
	} catch (error) {
		response.status(500).json({message: error});
	}
};

// PUT route for updating a contact that returns a 204 status
export const put = async (request, response, _next) => {
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
		response.status(204).json({message: 'Contact updated!'});
	} else {
		response.status(404).json({message: 'Contact not found!'});
	}
};

const contactFromBody = (body, oldContact = {}) => {
	const contact = Object.assign(oldContact, {
		name: body.name,
		email: body.email,
		phone: body.phone,
		message: body.message,
	});

	return contact;
};

const contacts = {getAll, getSingle, post, put};
export default contacts;
