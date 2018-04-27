import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';


// //INITIAL STATE
// const taskList = [];

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
export function fetchTasks() {
  return function (dispatch) {
    axios.get('/api/tasks')
      .then(res => res.data)
      .then(tasks => {
        dispatch(getTasks(tasks));
      })
      .catch(err => {throw Error('task list could not be fetched from the database', err)})
  }
}
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
export function destroyTask(event, taskToDestroy) {
  console.log('EVENT', event)
  console.log('AXIOS taskToDestroy', taskToDestroy)
  return function (dispatch) {
    axios.put('/api/tasks/delete', taskToDestroy)
      .then(res => res.data)
      .then(task => {
        dispatch(deleteTask(task));
      })
      .catch(err => {throw Error('task could not be deleted from the database', err)})
  }
}

//REDUCER - keep your state as an array, always return an array, never an object
export default function (state = [], action) {
  switch (action.type) {
    case GET_TASKS:
      return [...state, action.tasks];
    case ADD_TASK:
      return [...state, action.task];
    case DELETE_TASK:
      // filter out deleted task - NEEDS MORE WORK, NOT RENDERING RIGHT. doesn't rerender list with deleted task filtered out unless you hard refresh
      console.log('ACTION.TASK', action.task.id)
      return state.filter(task => task !== action.task);
    default:
      return state;
  }
}
