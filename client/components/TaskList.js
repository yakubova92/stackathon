import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {fetchTasks, destroyTask, markTaskDone, rollTaskOver, navNext} from '../store';
import {AddTask} from '../components';

var moment = require('moment');
moment().format();

let calculateDateOffset = function (todayDay) {
  switch (todayDay) {
    case 'Sun':
    return [0, 1, 2, 3, 4, 5, 6]
    case 'Mon':
    return [-1, 0, 1, 2, 3, 4, 5]
    case 'Tue':
    return [-2, -1, 0, 1, 2, 3, 4]
    case 'Wed':
    return [-3, -2, -1, 0, 1, 2, 3]
    case 'Thu':
    return [-4, -3, -2, -1, 0, 1, 2]
    case 'Fri':
    return [ -5, -4, -3, -2, -1, 0, 1]
    case 'Sat':
    return [-6, -5, -4, -3, -2, -1, 0]
    default:
    return [0, 1, 2, 3, 4, 5, 6];
  }
}
let todayDay = moment()._d.toString().slice(0, 3);
let fullDatesFormatted = [];
let toAdd = calculateDateOffset(todayDay);
//creates an array of dates from Sun - Sat that includes today's date, saved to presentWeek
for (let i = 0; i < toAdd.length; i++){
  let fullDate = moment().add(toAdd[i], 'days')._d;
  fullDatesFormatted.push(fullDate);
}
let presentWeek = fullDatesFormatted;
let today = moment()._d.toString().slice(0, 10)

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskList: [],
      weekDisplayed: 0
    }
   this.navNextWeek = this.navNextWeek.bind(this);
   this.navPrevWeek = this.navPrevWeek.bind(this);
   this.navPresentWeek = this.navPresentWeek.bind(this);
  }

  componentDidMount(){
    this.props.loadTaskList();
  }

  navNextWeek() {
    fullDatesFormatted = fullDatesFormatted.map(date => moment(date).add(1, 'weeks')._d)
    this.setState({
      weekDisplayed: this.state.weekDisplayed + 1
    })
  }
  navPrevWeek() {
    fullDatesFormatted = fullDatesFormatted.map(date => moment(date).add(-1, 'weeks')._d)
    this.setState({
      weekDisplayed: this.state.weekDisplayed - 1
    })
  }
  navPresentWeek() {
    fullDatesFormatted = presentWeek;
    this.setState({
      weekDisplayed: 0
    })
  }

  render() {
    const taskList = this.props.state.tasks;
    let datesArr = fullDatesFormatted.map(date => date.toString());

    return (
      <div id="task-list">
        <div id="week-nav-add-task" className="center">
          <AddTask />
          <div id="week-nav-buttons">
            <button type="button" className="btn btn-lg" onClick={(event) => this.navPrevWeek(event)}>
              <span className="glyphicon glyphicon-chevron-left" />
            </button>
            <button type="button" className="btn btn-lg" onClick={(event) => this.navPresentWeek(event)}>
              Today
            </button>
            <button type="button" className="btn btn-lg" onClick={(event) => this.navNextWeek(event)}>
              <span className="glyphicon glyphicon-chevron-right" />
            </button>
          </div>

        </div>

        <Grid>
          <Row className="week-view">
            {
              datesArr && datesArr.map(date => {
              date = moment(date)._d.toString().slice(0, 10);
              let dayCardClass;
              if (date === today) dayCardClass = 'today'
              else dayCardClass = 'day-column'

              return (
                <Col className={dayCardClass} key={date}>

                  <Row className="day-date">
                    <h3> {date.slice(0, 3).toUpperCase()} </h3>
                    <h6> {date.slice(3, 10)} </h6>
                  </Row>

                  <Row className="day-task-list">
                  {
                    taskList && taskList.map(task => {
                      if (moment(task.dayAssigned)._d.toString().slice(0, 10) === date){
                        return (
                          <div key={task.id} className="day-task">
                          {
                            task.status === 'Complete'
                            ? <p className="complete-tasks"> {task.description} </p>
                            :
                            <p> {task.description}</p>

                          }
                            <Row className="task-button-group">

                              <ButtonToolbar>
                                <ButtonGroup>
                                  <Button
                                  bsSize="xsmall"
                                  onClick={(event) => this.props.markDone(event, task)}>
                                    <Glyphicon glyph="ok" />
                                  </Button>

                                  {/* <Button bsSize="xsmall">
                                    <Glyphicon glyph="pencil" />
                                  </Button> */}

                                  <Button
                                  bsSize="xsmall"
                                  onClick={(event) => this.props.deleteTaskItem(event, task)}>
                                    <Glyphicon glyph="remove" />
                                  </Button>

                                  <Button
                                  bsSize="xsmall"
                                  onClick={(event) => this.props.rollOver(event, task)}>
                                    <Glyphicon glyph="share-alt" />
                                  </Button>

                                </ButtonGroup>
                              </ButtonToolbar>

                            </Row>
                          </div>
                        )
                      }
                    })
                  }
                  </Row>

                </Col>
              )})
            }
          </Row>
        </Grid>
      </div>
      )
  }
}

//CONTAINER
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    state
  }
}

const mapDispatch = dispatch => {
  return {
    // dispatches the thunk that uses GET_TASK action
    loadTaskList: function (){
      dispatch(fetchTasks())
    },
    deleteTaskItem: function(event, task){
      event.preventDefault()
      dispatch(destroyTask(event, task))
    },
    markDone: function (event, task){
      event.preventDefault()
      dispatch(markTaskDone(event, task))
    },
    rollOver: function (event, task){
      event.preventDefault()
      dispatch(rollTaskOver(event, task))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
