import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {fetchTasks, destroyTask} from '../store';


class TaskList extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskList: []
    }
  }
  componentDidMount(){
    this.props.loadTaskList();
  }

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
      console.log('TASK IN MAP DISPATCH', task)
      event.preventDefault()
      dispatch(destroyTask(event, task))
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)
