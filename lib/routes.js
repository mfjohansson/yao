'use strict';

var _ = require('lodash');

module.exports = function(app) {

	// Dependencies
	var path = require('path');

	// Controllers
	var itemCtrl = require('./item-controller');
	var collectionCtrl = require('./collection-controller');

	// Index
	app.get('/', function (req, res) {
		res.sendFile('index.html', { root: path.join(__dirname, '../views') });
	});

	// Document
	app.route('/api/v1/items/:collectionName')
		.get(itemCtrl.list)
		.post(itemCtrl.create);
	app.route('/api/v1/items/:collectionName/:itemId')
		.post(itemCtrl.update)
		.delete(itemCtrl.remove)
		.get(itemCtrl.view);

	// Collection fields
	app.route('/api/v1/fields/:collectionName')
		.get(collectionCtrl.listFields)
		.post(collectionCtrl.createField);
	app.route('/api/v1/fields/:collectionName/:fieldId')
		.post(collectionCtrl.updateField)
		.delete(collectionCtrl.removeField)
		.get(collectionCtrl.viewField);

	// Collections
	app.route('/api/v1/collections')
		.get(collectionCtrl.list)
		.post(collectionCtrl.create);
	app.route('/api/v1/collections/:collectionName')
		.post(collectionCtrl.update)
		.delete(collectionCtrl.remove)
		.get(collectionCtrl.view);

	// Types
	app.route('/api/v1/types')
		.get(function(req, res) {
			var types = _.extend({}, global.TYPES.types);
			return res.jsonp(types);
		});

	// Params
	app.param('collectionName', function (req, res, next, collectionName) {
		//console.log('Collection: ' + collectionName);

		var collectionList = global.dbConn.collection('_collections');
		collectionList.findOne({system_name: collectionName}, function(err, results) {
			req.collection = results;
			next();
		});		
	});

	app.param('fieldId', function (req, res, next, collectionId) {
		//console.log('Field: ' + fieldId);
		next();
	});

	app.param('itemId', function (req, res, next, itemId) {
		//console.log('Item: ' + itemId);

		var collectionList = global.dbConn.collection(req.collection.system_name);
		collectionList.findOne({_id: itemId}, function(err, results) {
			req.item = results;
			next();
		});
	});

	return app;
};