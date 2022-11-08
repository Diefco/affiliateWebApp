const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

router.get('/', adminController.index);
router.post('/auth', adminController.validate);
// router.get('/create', adminController.create);
// router.post('/', adminController.store);
// router.get('/:id/edit', adminController.edit);
// router.put('/:id', adminController.update);
// router.delete('/:id', adminController.destroy);
module.exports = router;
