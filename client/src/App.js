import React from 'react'
import { Route, Link } from 'react-router-dom'

import './App.css'

import OvertimeForm from './Components/Forms/Overtime'
import Register from './Components/Forms/Register'
import Login from './Components/Forms/Login'
// import AllUsers from './Components/AllUsers'
import EmployeeDashboard from './Components/Dashboards/EmployeeDashboard.jsx'

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

      <Route exact path="/" component={EmployeeDashboard} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forms/overtime" component={OvertimeForm} />
      {/* <Route path="/all-users" component={AllUsers} /> */}
      {/* <Route path="/forms/absent" component={AbsentForm} /> */}
    </div>
  )
}

export default App
