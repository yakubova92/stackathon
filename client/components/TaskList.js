import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {fetchTasks, destroyTask, markTaskDone, rollTaskOver} from '../store';

var moment = require('moment');
moment().format();


class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskList: [],
      //showForm: false
    }
    //this.showForm = this.showForm.bind(this);
  }
  componentDidMount(){
    this.props.loadTaskList();
  }
  // showForm(){
    //   this.setState({
      //     showForm: !this.state.showForm
      //   })
      // }

  render() {
    const taskList = this.props.state.tasks[0];
    console.log('taskList', taskList);

    let datesArr = [];
    for (let i = 0; i < 7; i++){
      let fullDate = moment().add(i, 'days')._d;
      datesArr.push(fullDate.toString());
    }

    return (
      <div>
      <p> look at all this stuff you have to do! </p>
      <Grid className="card-container">

        <Row className="week-view">
          {
            datesArr && datesArr.map(date => {
            date = moment(date)._d.toString().slice(0, 10);
            return (
              <Col key={date}>

                <Row className="day">
                <h3> {date.slice(0,3).toUpperCase()} </h3>
                <h6> {date.slice(3,10)} </h6>
                </Row>

                <Row className="card-day">
                {
                  taskList && taskList.map(task => {
                    if (moment(task.dayAssigned)._d.toString().slice(0, 10) === date){
                      return (
                        <div key={task.id} className="day-tasks">
                        {
                          task.status === 'Complete'
                          ? <p className="complete-tasks"> {task.description} </p>
                          :
                          <p> {task.description}</p>

                        }
                          <Row className="button-group">
                          <div>
                            <ButtonToolbar>
                              <ButtonGroup>
                                <Button
                                bsSize="xsmall"
                                onClick={(event) => this.props.markDone(event, task)}>
                                  <Glyphicon glyph="ok" />
                                </Button>

                                <Button bsSize="xsmall">
                                  <Glyphicon glyph="pencil" />
                                </Button>

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
                            </div>

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
    loadTaskList: function (){
      dispatch(fetchTasks())
    },
      //dispatches the thunk that uses GET_TASK action
    deleteTaskItem: function(event, task){
      event.preventDefault()
      dispatch(destroyTask(event, task))
    },
    markDone: function (event, task){
      event.preventDefault()
      const updatedStatus = {status: 'Complete'}
      const updatedTask = Object.assign(task, updatedStatus)
      dispatch(markTaskDone(event, updatedTask))
    },
    rollOver: function (event, task){
      event.preventDefault()
      let newDay = moment(task.dayAssigned).add(1, 'days')._d.toString();
      let newDayAssigned = moment(newDay).format()
      const updatedDay = {dayAssigned: newDayAssigned}
      const updatedTask = Object.assign(task, updatedDay)
      dispatch(rollTaskOver(event, updatedTask))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
