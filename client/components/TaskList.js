import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {fetchTasks, destroyTask, markTaskDone} from '../store';


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
    const taskList = this.props.state.tasks[0]
    console.log('taskList', taskList)
    return (
      <div>
        <p> look at all this stuff you have to do! </p>
        {
          taskList && taskList.map(task => {
            return (
              <div key={task.id}>
                <p> {task.description}</p>
                <Button onClick={(event) => this.props.markDone(event, task)}>Done</Button>
                <Button>Edit</Button>
                <Button>Rollover</Button>
                <Button onClick={(event) => this.props.deleteTaskItem(event, task)}>Delete</Button>
              </div>
            )
          })
        }
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
      console.log('UPDATED TASK', updatedTask)
      dispatch(markTaskDone(event, updatedTask))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
