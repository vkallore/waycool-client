import React from 'react'
import { TEXT_LOGIN, TEXT_REGISTER } from 'constants/AppLanguage'
import TopNavBar from 'components/Common/TopNavBar'

const Link = require('react-router-dom').Link

const SiteNavItems = () => (
  <TopNavBar>
    <div className="navbar-start">
      <Link className="navbar-item" to="/login" title={TEXT_LOGIN}>
        {TEXT_LOGIN}
      </Link>
    </div>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link
            className="navbar-item button is-primary"
            to="/"
            title={TEXT_REGISTER}
          >
            {TEXT_REGISTER}
          </Link>
        </div>
      </div>
    </div>
  </TopNavBar>
)

export default SiteNavItems
