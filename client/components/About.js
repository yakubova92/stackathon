import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export const About = () => (
  <div>
    <h4>Plan Your Days</h4>
    <p>A week long view allows you to plan by day. Add tasks and assign them to a day.</p>

    <h4>Manage Your Tasks</h4>
    <p>Use these buttons to mark your task complete or delete it. As you work through the day's task, you may realize you won't get to a few. No worries, just click the rollover button and do it tomorrow. </p>

    <h4>Not keeping up with things like you should?</h4>
    <p>No worries, incomplete tasks will automatically roll over to the next day.</p>
  </div>
)
