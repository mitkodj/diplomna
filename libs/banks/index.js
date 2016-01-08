//by default when requiring a folder it loads the index.js file in that folder
var bankRepository = require('./repositories/banks');
var userRepository = require('../users/repositories/users');
var controller = require('./controllers/banks')(bankRepository, userRepository);
var router = require('./routes/banks')(controller);

module.exports = router;