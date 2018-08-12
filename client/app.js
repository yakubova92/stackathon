import React from 'react'

import { Navbar, AddTask, TaskList} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      {/* <AddTask /> */}
      <TaskList />
    </div>
  )
}

export default App
