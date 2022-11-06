const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index', {
		username: 'Stiven',
	});
});

module.exports = router;
