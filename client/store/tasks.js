import axios from 'axios';
import history from '../history';

//ACTION TYPES
const GET_TASKS = 'GET_TASKS';
const ADD_TASK = 'ADD_TASK';
const DELETE_TASK = 'DELETE_TASK';
const MARK_DONE = 'MARK_DONE';
const ROLL_OVER = 'ROLL_OVER';


// //INITIAL STATE
// const taskList = [];

//ACTION CREATORS
export function getTasks(tasks){
  return {
    type: GET_TASKS,
    tasks
  }
}
export function addTask(createdTask){
  return {
    type: ADD_TASK,
    createdTask
  }
}
export function deleteTask (task){
  return {
    type: DELETE_TASK,
    task
  }
}
export function markDone (task){
  return {
    type: MARK_DONE,
    task
  }
}
export function rollOver (task){
  return {
    type: ROLL_OVER,
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
  return function (dispatch) {
    axios.put('/api/tasks/delete', taskToDestroy)
      .then(res => res.data)
      .then(task => {
        dispatch(deleteTask(task));
      })
      .catch(err => {throw Error('task could not be deleted from the database', err)})
  }
}
export function markTaskDone(event, task) {
  return function (dispatch) {
    axios.put('/api/tasks/done', task)
      .then(res => res.data)
      .then(task => {
        dispatch(markDone(task));
      })
      .catch(err => {throw Error('task could not be deleted from the database', err)})
  }
}
export function rollTaskOver(event, task) {
  return function (dispatch) {
    axios.put('/api/tasks/rollover', task)
      .then(res => res.data)
      .then(task => {
        dispatch(rollOver(task));
      })
      .catch(err => {throw Error('task could not be rolled over', err)})
  }
}

//REDUCER - keep your state as an array, always return an array, never an object
export default function (state = [], action) {
  switch (action.type) {

    case GET_TASKS:
      return [...state, action.tasks];

    case ADD_TASK:
      return [...state, action.createTask];
      // return {
      //   ...state,
      //   tasks: [...state.tasks, action.task]
      // };
    //   // var index = state.tasks.length;
    //   // //return Object.assign({}, state, { tasks: action.task })
    //   // state.tasks[index] = action.task
    //   // return state;

    // return {
    //     // ...state,
    //     // tasks: [...state.tasks, action.newTask]
    // }
    case DELETE_TASK:
      // filter out deleted task - NEEDS MORE WORK, NOT RENDERING RIGHT. doesn't rerender list with deleted task filtered out unless you hard refresh
      console.log('state', state)
      console.log('action', action)
      console.log('state filtered', state.filter(task => task !== action.task))
      console.log('ACTION.TASK', action.task)
      return state.filter(task => task !== action.task);

    case MARK_DONE:
      return [...state, action.task];

    case ROLL_OVER:
      return [...state, action.task];

    default:
      return state;
  }
}
