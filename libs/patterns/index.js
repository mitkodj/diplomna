//by default when requiring a folder it loads the index.js file in that folder
var repository = require('./repositories/patterns');

var controller = require('./controllers/patterns')(repository);

var router = require('./routes/patterns')(controller);

module.exports = router;