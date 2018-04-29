import React from 'react';
import {connect} from 'react-redux';
import { Button } from 'react-bootstrap';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
// import {Link} from 'react-router-dom';
// import {logout} from '../store';
// import {createTask} from '../store';
var moment = require('moment');
moment().format();

const Card = (props) => {
  console.log('CARD PROPS', props);

  let datesArr = [];
  for (let i = 0; i < 7; i++){
    let fullDate = moment().add(i, 'days')._d;
    datesArr.push(fullDate.toString());
  }
  console.log(datesArr);

  return (
    <Grid className="card-container">


      <Row className="week-view">
        {
          datesArr && datesArr.map(date => {
            return (
            <Col key={date} className="card-day">
              <h3> {date.slice(0,3).toUpperCase()} </h3>
              <h6> {date.slice(3,10)} </h6>
            </Col>
            )
          })
        }

      </Row>



    </Grid>
  )
}
export default Card

// //CONTAINER
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id,
//     taskList: []
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(event) {
//       const description = event.target.description.value
//       const dayAssigned = event.target.dayAssigned.value
//       const body = {description: description, dayAssigned: dayAssigned}
//       event.preventDefault()
//       dispatch(createTask(body))  //dispatches the thunk that uses ADD_TASK action
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Card)
