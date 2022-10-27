const express = require("express");
const router = express.Router();

const offerController = require('../controllers/offerController');

router.get('/trainer/program/viewalloffers', offerController.viewAllOffer);

router.post('/trainer/program/createoffer', offerController.createAnOffer);
router.get('/trainer/program/viewoffer/:id', offerController.viewAnOffer);
router.patch('/trainer/program/updateoffer/:id', offerController.updateAnOffer);
router.delete('/trainer/program/deleteoffer/:id', offerController.deleteAnOffer);

module.exports = router;