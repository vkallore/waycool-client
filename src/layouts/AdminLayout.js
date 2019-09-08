import React from 'react'
import { Helmet } from 'react-helmet'

import AdminSideNav from 'components/Admin/Common/AdminSideNav'
import AdminNavItems from 'components/Admin/Common/AdminNavItems'
import ErrorBoundary from 'components/Common/ErrorBoundary'
import Footer from 'components/Common/Footer'

import { TEXT_ADMIN_DASHBOARD } from 'constants/AppLanguage'

const AdminLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{TEXT_ADMIN_DASHBOARD}</title>
      </Helmet>

      <AdminNavItems />

      <div className="container">
        <div className="columns">
          <div className="column column is-3">
            <AdminSideNav />
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

export default AdminLayout
