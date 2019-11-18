import React from 'react'
import Elm from 'react-elm-components'
import EmployeeDashboardElm from '../Dashboards/EmployeeDashboard.elm'

export default function EmployeeDashboard() {
    return <Elm src={EmployeeDashboardElm.Elm.Components.Dashboards.EmployeeDashboard} />
}