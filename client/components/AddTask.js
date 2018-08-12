import React from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
import {createTask} from '../store';


const AddTask = (props) => {
  return (
    <div className="add-task">
      <form className="add-task-form" onSubmit={event => props.handleSubmit(event)}>
        <input type="text" name="description" placeholder="enter a new task" />
        <input type="date" name="dayAssigned" />
        <Button bsStyle="danger" type="submit">Add Task</Button>
      </form>
    </div>
  )
}

//CONTAINER
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    taskList: []
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(event) {
      const description = event.target.description.value
      const dayAssigned = event.target.dayAssigned.value
      const body = {description: description, dayAssigned: dayAssigned}
      event.preventDefault()
      dispatch(createTask(body))  //dispatches the thunk that uses ADD_TASK action
    }
  }
}

export default connect(mapState, mapDispatch)(AddTask)

