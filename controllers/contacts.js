const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    console.log('getAll')
    try {
        const coll = await mongodb.getDb("cse341-ls02").collection('contacts');
        const results = await coll.find({}).limit(50).toArray();
        console.log('results', results)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(results);
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ error: err });
    }
};

const getSingle = async (req, res, next) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb("cse341-ls02")
        .collection('contacts')
        .find({ _id: contactId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = { getAll, getSingle };