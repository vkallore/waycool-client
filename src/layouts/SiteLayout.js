import React from 'react'

import SiteNavItems from 'components/Common/SiteNavItems'
import Footer from 'components/Common/Footer'

const SiteLayout = ({ children }) => {
  return (
    <>
      <section>
        <SiteNavItems />
      </section>
      <div className="columns">
        <div className="column">
          <div className="section">
            <div className="container">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SiteLayout
