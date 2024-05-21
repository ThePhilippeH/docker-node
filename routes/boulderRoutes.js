const express = require('express');

const boulderController = require('../controllers/boulderController');

const router = express.Router();

router.route('/')
    .get(boulderController.getAllBoulders)
    .post(boulderController.createBoulder);
router.route('/:id')
    .get(boulderController.getBoulderById)
    .patch(boulderController.updateBoulder)
    .delete(boulderController.deleteBoulder);
router.route('/:name')
    .get(boulderController.getBoulderByName);
router.route('/area/:area')
    .get(boulderController.getAllArea);
router.route('/:name/area/:area')
    .get(boulderController.getBoulderByNameAndArea)
    .patch(boulderController.updateByNameAndArea)
    .delete(boulderController.deleteByNameAndArea);
router.route('/grade/:grade')
    .get(boulderController.getAllGrade);
router.route('/getAllWithBeta/')
    .get(boulderController.getAllWithBeta);
router.route('/getAscentType/:ascentType')
    .get(boulderController.getAllAscentType);

module.exports = router;