import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { MENU_LIST, MENU_ADD } from 'constants/AppConstants'
import { TEXT_TIME_LOG } from 'constants/AppLanguage'

const DashboardSideNav = ({ match }) => {
  return (
    <aside className="menu section">
      <p className="menu-label"> {TEXT_TIME_LOG} </p>
      <ul className="menu-list">
        <li>
          <Link to="/time-log/"> {MENU_LIST} </Link>
        </li>
        <li>
          <Link to="/time-log/add"> {MENU_ADD} </Link>
        </li>
      </ul>
    </aside>
  )
}

export default withRouter(DashboardSideNav)
