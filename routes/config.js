var express = require('express');
var _ = require('lodash');
var router = express.Router();

var patterns = require('../libs/patterns');
var interfaceRes = [];

/* GET users listing. */
router.get('/', function(req, res) {

	patterns.getPatterns()
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
});

router.post('/addPattern', function(req, res) {

	patterns.addPattern(req.body.pattern, null)
	.then(function(results) {

		interfaceRes.patterns.push(req.body.pattern);
  		res.send(interfaceRes.patterns);
	})
});

router.post('/addFill', function(req, res) {

	patterns.addPattern(null, req.body.fill)
	.then(function(results) {

		interfaceRes.fills.push(req.body.fill)
  		res.send(interfaceRes.fills);
	})
})

module.exports = router;
