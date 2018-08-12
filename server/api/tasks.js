const router = require('express').Router();
const {Task} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  //console.log('USER', req.user)
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
  console.log(`\n ** ABOUT TO CREATE ${taskBody} *** \n`);
  Task.create(taskBody)
    .then(createdTask => {
      console.log(`\n ** TASK CREATED => ${createdTask} *** \n`);
      return res.status(200).json(createdTask);
    })
    .catch(error => {
      console.log(`\n ** CRAB-APPLES! ${error.message + error.stack} *** \n`);
      return next(error);
    });
});

router.put('/delete', (req, res, next) => {
  Task.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(res.status(204).send('Task successfully deleted'))
    .catch(next);
});

router.put('/done', (req, res, next) => {
  //console.log('REQ.BODY', req.body)
  Task.findById(req.body.id)
    .then(task => task.update(req.body))
    .then(res.status(204).send('Task successfully marked done'))
    .catch(next);
});

router.put('/rollover', (req, res, next) => {
  //console.log('REQ.BODY', req.body)
  Task.findById(req.body.id)
    .then(task => task.update(req.body))
    .then(res.status(204).send('Task successfully rolled over'))
    .catch(next);
});

router.put('/edit', (req, res, next) => {
  //console.log('REQ.BODY', req.body)
  Task.findById(req.body.id)
    .then(task => task.update(req.body))
    .then(res.status(204).send('Task successfully edited'))
    .catch(next);
});
