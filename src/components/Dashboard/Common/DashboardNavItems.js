import React from 'react'
import Link from 'react-router-dom/Link'
import { TEXT_DASHBOARD, TEXT_LOGOUT } from 'constants/AppLanguage'
import TopNavBar from 'components/Common/TopNavBar'

const DashboardNavItems = () => (
  <TopNavBar>
    <div className="navbar-start">
      <Link className="navbar-item" to="/dashboard" title={TEXT_DASHBOARD}>
        {TEXT_DASHBOARD}
      </Link>
    </div>
    <div className="navbar-end">
      <Link className="navbar-item" to="/logout" title={TEXT_LOGOUT}>
        {TEXT_LOGOUT}
      </Link>
    </div>
  </TopNavBar>
)

export default DashboardNavItems
