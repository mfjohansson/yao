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

	// Collections
	app.route('/api/v1/collections')
		.get(collectionCtrl.list)
		.post(collectionCtrl.create);
	app.route('/api/v1/collections/:collectionName')
		.post(collectionCtrl.update)
		.delete(collectionCtrl.remove)
		.get(collectionCtrl.view);

	// Collection fields
	app.route('/api/v1/collections/:collectionName/fields')
		.get(collectionCtrl.listFields)
		.post(collectionCtrl.createField);
	app.route('/api/v1/collections/:collectionName/fields/:fieldId')
		.post(collectionCtrl.updateField)
		.delete(collectionCtrl.removeField)
		.get(collectionCtrl.viewField);

	// Document
	app.route('/api/v1/collections/:collectionName/items')
		.get(itemCtrl.list)
		.post(itemCtrl.create);
	app.route('/api/v1/collections/:collectionName/items/:itemId')
		.post(itemCtrl.update)
		.delete(itemCtrl.remove)
		.get(itemCtrl.view);

	// Params
	app.param('collectionName', function (req, res, next, collectionName) {
		console.log('Collection: ' + collectionName);
		next();
	});

	app.param('fieldId', function (req, res, next, collectionId) {
		console.log('Field: ' + fieldId);
		next();
	});

	app.param('itemId', function (req, res, next, collectionId) {
		console.log('Item: ' + itemId);
		next();
	});

	return app;
};