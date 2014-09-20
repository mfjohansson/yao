var create = function(req, res, next) {
	// create a item
	return res.jsonp({success: true, item: {}});
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
	// list items
	return res.jsonp([]);
};

module.exports = {
	create: create,
	update: update,
	remove: remove,
	view: view,
	list: list
};