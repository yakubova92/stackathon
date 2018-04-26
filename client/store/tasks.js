import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';


//INITIAL STATE
const taskList = [];

//ACTION CREATORS
export function getTasks(tasks){
  return {
    type: GET_TASKS,
    tasks
  }
}
export function addTask(task){
  return {
    type: ADD_TASK,
    task
  }
}
export function deleteTask (task){
  return {
    type: DELETE_TASK,
    task
  }
}
//THUNK CREATORS
export function createTask(newTask) {
  return function (dispatch) {
    axios.post('/api/tasks', newTask)
      .then(res => res.data)
      .then(createdTask => {
        dispatch(addTask(createdTask));
      })
      .catch(err => {throw Error('task could not be created', err)})
    }
  }

//REDUCER
export default function (state = taskList, action) {
  switch (action.type) {
    case GET_TASKS:
      return action.task;
    case ADD_TASK:
      return [...state, action.task];
    case DELETE_TASK:
      return action.task;
    default:
      return state;
  }
}
