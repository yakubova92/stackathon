import React from 'react'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
// import {Link} from 'react-router-dom'
// import {logout} from '../store'

// const TaskList = ({ handleClick, isLoggedIn }) => (
//   <div>
//     <h3>TaskList</h3>
//     <form onSubmit={props.handleAddTask}>
//       <input type="text" name="description" placeholder="enter a new task" />
//       <input type="date" name="dayAssigned" />
//       <Button type="submit">Add</Button>
//     </form>
//   </div>
// )
const TaskList = () => (
  <div>
    <h3>TaskList</h3>
    <p> See all your tasks </p>
    <form >
      <input type="text" name="description" placeholder="enter a new task" />
      <input type="date" name="dayAssigned" />
      <Button type="submit">Add</Button>
    </form>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(TaskList)

