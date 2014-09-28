var ObjectID = require('mongodb').ObjectID;

var create = function(req, res, next) {
	var collectionList = global.dbConn.collection('_collections');
	collectionList.insert(req.body, function(err, results) {
		return res.jsonp(results);
	});
};

var update = function(req, res, next) {
	var collectionList = global.dbConn.collection('_collections');

	var body = req.body;
	body._id = new ObjectID(req.body._id);

	collectionList.update({_id: body._id}, body, function(err, results) {
		return res.jsonp(results);
	});
};

var remove = function(req, res, next) {
	var collectionList = global.dbConn.collection('_collections');
	collectionList.remove({system_name: req.collection.system_name}, function(err, results) {
		return res.jsonp({success: true});
	});	
};

var view = function(req, res, next) {
	// view collection
	return res.jsonp({});
};

var list = function(req, res, next) {
	var collectionList = global.dbConn.collection('_collections');
	collectionList.find().toArray(function(err, results) {
		return res.jsonp(results);
	});
};

var createField = function(req, res, next) {
	// create a field
	return res.jsonp({success: true, field: {}});
};

var updateField = function(req, res, next) {
	// update a field
	return res.jsonp({success: true, field: {}});
};

var removeField = function(req, res, next) {
	// remove a field
	return res.jsonp({success: true});
};

var viewField = function(req, res, next) {
	// view field
	return res.jsonp({});
};

var listFields = function(req, res, next) {
	// list fields
	return res.jsonp([]);
};

module.exports = {
	create: create,
	update: update,
	remove: remove,
	view: view,
	list: list,
	createField: createField,
	updateField: updateField,
	removeField: removeField,
	viewField: viewField,
	listFields: listFields
};