import React from 'react'

const TimeLogEdit = ({ match }) => {
  const timeLogId = match.params.timeLogId
  return (
    <>
      <h1 className="title">
        You are editing the time log of ID <em>{timeLogId}</em>
      </h1>
    </>
  )
}

export default TimeLogEdit
