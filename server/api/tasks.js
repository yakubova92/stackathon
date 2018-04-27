const router = require('express').Router();
const {Task} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  const user = +req.user.dataValues.id;
  Task.findAll({
    where: {
      userId: user
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

router.put('/delete', (req, res, next) => {
  // const user = {userId: req.user.id};
  // const body = req.body;
  // const taskBody = Object.assign(body, user);
  console.log('REQ.BODY', req.body)
  Task.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(res.status(204).send('Task successfully deleted'))
    .catch(next);
});
