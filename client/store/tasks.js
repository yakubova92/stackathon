import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';

/**
 * INITIAL STATE
 */
const taskList = [];

/**
 * ACTION CREATORS
 */
const addTask = task => ({type: ADD_TASK, task});
const deleteTask = () => ({type: DELETE_TASK});

/**
 * THUNK CREATORS
 */

 //dispatch addTask and deleteTask here


/**
 * REDUCER
 */
export default function (state = taskList, action) {
  switch (action.type) {
    case ADD_TASK:
      return action.task;
    case DELETE_TASK:
      return action.task;
    default:
      return state;
  }
}
