import React from 'react'

import {Navbar, TaskList} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <TaskList />
    </div>
  )
}

export default App
