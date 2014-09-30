var ObjectID = require('mongodb').ObjectID;
var converter = require('./converter');
var diff = require('deep-diff').diff;
var _ = require('lodash');

var create = function(req, res, next) {
	var item = global.dbConn.collection(req.collection.system_name);
	var log = global.dbConn.collection(req.collection.system_name + '_log');

	var data = converter(req.collection.fields, global.TYPES.types, req.body);

	item.insert(data, function(err, results) {
		log.insert({t: 'A', o: results[0]._id, d: new Date()}, function() {
		});
		return res.jsonp(results);
	});
};

var update = function(req, res, next) {
	var item = global.dbConn.collection(req.collection.system_name);
	var log = global.dbConn.collection(req.collection.system_name + '_log');

	var body = req.body;

	var data = converter(req.collection.fields, global.TYPES.types, body);
	data._id = req.item._id;

	item.update({_id: data._id}, data, function(err, results) {

		// Save diff. New vs orig
		var differences = diff(req.item, data);
		log.insert({t: 'E', o: data._id, d: new Date(), c: differences}, function() {
		});
		
		return res.jsonp(results);
	});

};

var remove = function(req, res, next) {
	var item = global.dbConn.collection(req.collection.system_name);
	item.remove({_id: req.item._id}, function(err, results) {
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

	// Eval safely
	var vm = require('vm');
	var sandbox = {
		sort: {},
		displayValue: function(item) {
			return item.name;
		}
	};
	vm.runInNewContext(req.collection.findScripting, sandbox);

	item.find().sort(sandbox.sort).toArray(function(err, results) {
		if (err) { return res.status(500).jsonp(new Error('Could not list items')); }


		// A little unsafe...
		var newData = _.transform(results, function(result, value, fieldName) {
			value.displayValue = sandbox.displayValue(result);
			return true;
		});

		return res.jsonp(newData);
	});
};

module.exports = {
	create: create,
	update: update,
	remove: remove,
	view: view,
	list: list
};