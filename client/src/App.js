import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import OvertimeForm from './components/forms/Overtime'
import Register from './components/forms/Register'
import Login from './components/forms/Login'
import AllUsers from './components/AllUsers'

function App() {
  return (
    <div className="App">
      <header>
        <nav>
          <Link to="/forms/overtime">Overtime Form</Link>
          <Link to="/forms/absent">Absent Form</Link>
          <Link to="/register">Register/Login</Link>
        </nav>
      </header>

      <h2>Employee Dashboard</h2>

      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forms/overtime" component={OvertimeForm} />
      <Route path="/all-users" component={AllUsers} />
      {/* <Route path="/forms/absent" component={AbsentForm} /> */}
      
    </div>
  )
}

export default App
