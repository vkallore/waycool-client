import React from 'react'
import { Helmet } from 'react-helmet'

import DashboardSideNav from 'components/Dashboard/Common/DashboardSideNav'
import DashboardNavItems from 'components/Dashboard/Common/DashboardNavItems'
import ErrorBoundary from 'components/Common/ErrorBoundary'
import Footer from 'components/Common/Footer'

import { TITLE_DASHBOARD } from 'constants/AppLanguage'

const DashboardLayout = ({ children, match }) => {
  return (
    <>
      <Helmet>
        <title>{TITLE_DASHBOARD}</title>
      </Helmet>

      <DashboardNavItems />

      <div className="container">
        <div className="columns">
          <div className="column column is-2">
            <DashboardSideNav />
          </div>
          <div className="column">
            <div className="section">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DashboardLayout
