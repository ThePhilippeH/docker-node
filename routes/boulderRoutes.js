const express = require('express');

const boulderController = require('../controllers/boulderController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/')
    .get(boulderController.getAllBoulders)
    .post(protect.protect, boulderController.createBoulder);

router.route('/:id')
    .get(protect.protect,boulderController.getBoulderById)
    .patch(protect.protect,boulderController.updateBoulder)
    .delete(protect.protect,boulderController.deleteBoulder);
router.route('/:name')
    .get(protect.protect,boulderController.getBoulderByName);
router.route('/area/:area')
    .get(protect.protect,boulderController.getAllArea);
router.route('/:name/area/:area')
    .get(protect.protect,boulderController.getBoulderByNameAndArea)
    .patch(protect.protect,boulderController.updateByNameAndArea)
    .delete(protect.protect,boulderController.deleteByNameAndArea);
router.route('/grade/:grade')
    .get(protect.protect,boulderController.getAllGrade);
router.route('/getAllWithBeta/')
    .get(protect.protect,boulderController.getAllWithBeta);
router.route('/getAscentType/:ascentType')
    .get(protect.protect,boulderController.getAllAscentType);

module.exports = router;