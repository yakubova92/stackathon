import React from 'react'

import {Navbar, AddTask} from './components'
import Routes from './routes'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AddTask />
    </div>
  )
}

export default App
