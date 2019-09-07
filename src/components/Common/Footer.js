import React from 'react'

const Footer = props => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>WayCool &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  </footer>
)

export default Footer
