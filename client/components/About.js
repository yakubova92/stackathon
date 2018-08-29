import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import { Image } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


export const About = () => (
  <div>
    <Grid>
      <Row className="feature">
        <Col className="feature-img">
          <Image src="week.svg" responsive />
        </Col>
        <Col className="vertical-line" />
        <Col className="feature-desc">
          <h4>Plan Your Days</h4>
          <hr />
          <p>Organize your tasks by day. You can see everything you need to do this week at a quick glance. <br /> <br />
          Add tasks and assign them to a day. <br /> <br />
          Use the navigation bar to look back to previous weeks or look ahead at what's to come. <br /><br />
          </p>
        </Col>
      </Row>
      <Row className="horizontal-line" />

      <Row className="feature">
        <Col className="feature-img">
          <Image src="day.svg" responsive />
        </Col>
        <Col className="vertical-line" />
        <Col className="feature-desc">
          <h4>Keep Track</h4>
          <hr />
          <p>Use these buttons to manage your tasks for the day. <br /> <br />
          When you've finished a task, click the check to mark your task complete and it will be crossed out. How satisfying is to look at a long list of completed tasks at the end of the day? <br /> <br />
          Use the "X" button to delete a task. <br /> <br />
          As you work through the day's tasks, you may realize you won't get to a few. No worries, just click the rollover button and the task will move to the next day!
          </p>
        </Col>
      </Row>
      <Row className="horizontal-line" />

      <Row className="feature">
        <Col className="feature-img">
          <Image src="rollover.svg" responsive />
        </Col>
        <Col className="vertical-line" />
        <Col className="feature-desc">
          <h4>Not keeping up?</h4>
          <hr />
          <p>No worries, incomplete tasks will automatically roll over at the end of the day.
            <br /> <br />
            Your tasks will be waiting for you when you come back tomorrow morning allowing you to spend less time managing your to-do list and more time getting things done!
          </p>
        </Col>
      </Row>
      <Row className="horizontal-line" />

      <Row className="feature">
        <Col className="feature-img">
          <Image src="mobile_view.svg" responsive />
        </Col>
        <Col className="vertical-line" />
        <Col className="feature-desc">
          <h4>On the go?</h4>
          <hr />
          <p>No problem, The Realist's To-Do works just as well on your mobile browser.
            <br /><br />
            All the days in your week view are listed one after another in a long column for easy scrolling.
          </p>
        </Col>
      </Row>
      <Row className="horizontal-line" />

    </Grid>

  </div>
)
