const { Router } = require('express');
const controller = require('./controllers');

const router = Router();

router.get('/', controller.getIncidents);
router.post('/', controller.reportIncident);
router.get('/:id', controller.getIncidentById);

module.exports = router;
