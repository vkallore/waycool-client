import React from 'react'

const AlertBox = props => {
  let {
    alertType,
    alertText,
    allowMessageClear,
    children,
    clearMessage,
    showInline = false
  } = props
  const className = `notification is-${alertType} ${
    !showInline ? 'fixed-notification' : ''
  }`
  if ((alertText === undefined || alertText === '') && children === undefined) {
    return null
  }
  let alertTextSplit = alertText.split('\n')
  const alertTextHtml = alertTextSplit.map(alertText => {
    return (
      <React.Fragment key={alertText}>
        <span>
          {alertText}
          {alertTextSplit.length > 1 ? <br /> : null}
        </span>
      </React.Fragment>
    )
  })
  return (
    <div className={className}>
      {allowMessageClear && typeof clearMessage === 'function' && (
        <button className="delete" onClick={clearMessage} />
      )}
      {alertTextHtml}
      {children ? children : null}
    </div>
  )
}

export default AlertBox
