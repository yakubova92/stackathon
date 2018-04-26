const router = require('express').Router();
const {Task} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  Task.findAll({
    where: {
      userId: req.user.id
    }
  })
    .then(tasks => res.json(tasks))
    .catch(next);
});
