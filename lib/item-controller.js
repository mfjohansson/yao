var create = function(req, res, next) {
	var item = global.dbConn.collection(req.collection.system_name);
	item.insert(req.body, function(err, results) {
		return res.jsonp(results);
	});
};

var update = function(req, res, next) {
	// update a item
	return res.jsonp({success: true, item: {}});
};

var remove = function(req, res, next) {
	// remove a item
	return res.jsonp({success: true});
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