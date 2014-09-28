var ObjectID = require('mongodb').ObjectID;

var create = function(req, res, next) {
	var item = global.dbConn.collection(req.collection.system_name);
	item.insert(req.body, function(err, results) {
		return res.jsonp(results);
	});
};

var update = function(req, res, next) {
	var collection = global.dbConn.collection(req.collection.system_name);

	var body = req.body;
	body._id = new ObjectID(req.body._id);

	collection.update({_id: body._id}, body, function(err, results) {
		return res.jsonp(results);
	});
};

var remove = function(req, res, next) {
	var collection = global.dbConn.collection(req.collection.system_name);
	collection.remove({_id: req.item._id}, function(err, results) {
		return res.jsonp({success: true});
	});	
};

var view = function(req, res, next) {
	// view item
	return res.jsonp({});
};

var list = function(req, res, next) {
	if (!req.collection) {
		return res.status(500).jsonp(new Error('No collection selected'));
	}
	var item = global.dbConn.collection(req.collection.system_name);
	item.find().toArray(function(err, results) {
		if (err) { return res.status(500).jsonp(new Error('Could not list items')); }
		return res.jsonp(results);
	});
};

module.exports = {
	create: create,
	update: update,
	remove: remove,
	view: view,
	list: list
};