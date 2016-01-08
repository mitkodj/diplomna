//by default when requiring a folder it loads the index.js file in that folder
var repository = require('./repositories/users');

var controller = require('./controllers/users')(repository);

var router = require('./routes/users')(controller);

module.exports = router;