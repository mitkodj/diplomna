var interfaceRes = {};
var _ = require('lodash');

function patternsController(repository) {

	this.repository = repository;
}

patternsController.prototype.getPatterns = function(req, res) {

	this.repository.getPatterns()
	.then(function(results) {

		var patternResults = _.map(results.patterns, function(element) {
			return element.pattern;
		});

		var fillResults = _.map(results.fills, function(element) {
			return element.fill_text;
		});
		interfaceRes = {
			patterns: patternResults,
			fills: fillResults
		};

  		res.render('config', interfaceRes);
	})
};

patternsController.prototype.addPattern = function(req, res) {

	patterns.addPattern(req.body.pattern, null)
	.then(function(results) {

		interfaceRes.patterns.push(req.body.pattern);
  		res.send(interfaceRes.patterns);
	})
};

patternsController.prototype.addFillValue = function(req, res) {

	patterns.addPattern(null, req.body.fill)
	.then(function(results) {

		interfaceRes.fills.push(req.body.fill)
  		res.send(interfaceRes.fills);
	})
};

module.exports = function(repository) {
  return new patternsController(repository);
};