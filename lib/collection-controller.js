var create = function(req, res, next) {
	var collectionList = global.dbConn.collection('_collections');
	collectionList.insert(req.body, function(err, results) {
		return res.jsonp(results);
	});
};

var update = function(req, res, next) {
	// update a collection
	return res.jsonp({success: true, collection: {}});
};

var remove = function(req, res, next) {
	// remove a collection
	return res.jsonp({success: true});
};

var view = function(req, res, next) {
	// view collection
	return res.jsonp({system_name: 'timetracking', name: 'Time tracking'});
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