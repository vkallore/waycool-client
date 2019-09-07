import React from 'react'

const Footer = props => (
  <footer className="footer">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          Finitatives Learning India Private Limited &copy;{' '}
          {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
