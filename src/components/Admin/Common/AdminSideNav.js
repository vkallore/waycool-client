import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import {
  TEXT_LOGIN_BY_TYPE,
  TEXT_DELETED_USERS,
  TEXT_LOGIN_LOGS
} from 'constants/AppLanguage'

const AdminSideNav = ({ location }) => {
  const { pathname } = location
  return (
    <aside className="menu section">
      <ul className="menu-list">
        <li>
          <Link
            to="/login-count-by-type"
            className={pathname === '/login-count-by-type' ? 'is-active' : ''}
          >
            {' '}
            {TEXT_LOGIN_BY_TYPE}{' '}
          </Link>
        </li>
        <li>
          <Link
            to="/login-logs"
            className={pathname === '/login-logs' ? 'is-active' : ''}
          >
            {' '}
            {TEXT_LOGIN_LOGS}{' '}
          </Link>
        </li>
        <li>
          <Link
            to="/deleted-accounts"
            className={pathname === '/deleted-accounts' ? 'is-active' : ''}
          >
            {' '}
            {TEXT_DELETED_USERS}{' '}
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default withRouter(AdminSideNav)
