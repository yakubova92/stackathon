import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {TaskList} from './index';

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props
  const indexOfAt = email.indexOf('@');
  return (
    <div>
      <h3>Welcome, {email.slice(0, indexOfAt)}!</h3>
      <TaskList />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
