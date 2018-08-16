const router = require('express').Router();
const {Task} = require('../db/models');
module.exports = router;


var moment = require('moment');
moment().format();


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
    .then(createdTask => {
      return res.status(200).json(createdTask);
    })
    .catch(next);
});

router.put('/delete', (req, res, next) => {
  Task.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(res.status(200).json(req.body))
    .catch(next);
});

router.put('/done', (req, res, next) => {
  let currentTask = req.body;
  if (currentTask.status === 'Incomplete') var updatedStatus = {status: 'Complete'}
  else updatedStatus = {status: 'Incomplete'}
  Task.findById(req.body.id)
    .then(task => task.update(updatedStatus))
    .then(updatedTask => res.status(200).json(updatedTask))
    .catch(next);
});

router.put('/rollover', (req, res, next) => {
  let currentTask = req.body;
  let newDay = moment(currentTask.dayAssigned).add(1, 'days')._d.toString();
  let newDayAssigned = moment(newDay).format()
  const updatedDay = {dayAssigned: newDayAssigned}
  Task.findById(req.body.id)
    .then(task => task.update(updatedDay))
    .then(updatedTask => res.status(200).json(updatedTask))
    .catch(next);
});

// router.put('/edit', (req, res, next) => {
//   Task.findById(req.body.id)
//     .then(task => task.update(req.body))
//     .then(res.status(204).send('Task successfully edited'))
//     .catch(next);
// });
