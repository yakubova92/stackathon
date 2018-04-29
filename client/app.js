import React from 'react'

import { Navbar, AddTask, TaskList, Card} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AddTask />
      <Card />
      <TaskList />
    </div>
  )
}

export default App
