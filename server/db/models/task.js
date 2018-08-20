const Sequelize = require('sequelize')
const db = require('../db')


var moment = require('moment');
moment().format();
var nodeSchedule = require('node-schedule')


const Task = db.define('task', {
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dayAssigned: {
    type: Sequelize.DATEONLY,
  },
  status: {
    type: Sequelize.ENUM,
    values: ['Incomplete', 'Complete'],
    defaultValue: 'Incomplete'
  }
});

// Auto Rollover
// get today's date
let todayFullDate = moment()._d.toString();
let today = moment(todayFullDate).format().slice(0, 10);

// get tomorrow's date
let tomorrowFullDate = moment(todayFullDate).add(1, 'days')._d.toString();
let tomorrow = moment(tomorrowFullDate).format().slice(0, 10)

// class method to rollover tasks, will be called by 'scheduleJob'
Task.rollOver = function (){
  console.log('hit ROLLOVER class method')
  return Task.update({
    dayAssigned: tomorrow
  }, {where: {
    status: 'Incomplete',
    dayAssigned: today
  }});
};
// calls Task.rollOver to rollover all of today's incomplete tasks to the next day
nodeSchedule.scheduleJob('00 59 23 * * *', function() {  // tasks will be rolled over at 11:59:00 PM
  console.log('the Scheduler is running')
  return Task.rollOver();
})

module.exports = Task;
