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

router.post('/', (req, res, next) => {
  const user = {userId: req.user.id};
  const body = req.body;
  const taskBody = Object.assign(body, user);
  Task.create(taskBody)
    .then(createdTask => res.json(createdTask))
    .catch(next);
});
