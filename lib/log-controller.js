var ObjectID = require('mongodb').ObjectID;
var converter = require('./converter');
var diff = require('deep-diff').diff;

var list = function(req, res, next) {
	// Get log
	var logs = global.dbConn.collection(req.collection.system_name + '_log');
	debugger;
	logs.find({o: new ObjectID(req.item._id)}).sort({d: -1}).toArray(function(err, results) {
		return res.jsonp(results);
	});
	
};

module.exports = {
	list: list
};