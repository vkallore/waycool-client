import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faTasks, faCalendar } from '@fortawesome/free-solid-svg-icons'

import Input from 'components/FormElements/Input'
import Button from 'components/FormElements/Button'
import { SvgLoader } from 'components/Common/Loaders'

import { TEXT_ADD } from 'constants/AppLanguage'
import {
  FIELD_CATEGORY,
  FIELD_DURATION,
  FIELD_TASK,
  FIELD_START_DATE,
  FIELD_START_TIME
} from 'constants/AppForms'

const TimeLogForm = props => {
  const {
    formFields,
    handleSubmit,
    ajaxProcessing,
    formModel,
    categories
  } = props

  const submitForm = event => {
    event.preventDefault()
    handleSubmit(formFields)
  }

  return (
    <form onSubmit={submitForm}>
      <div className="field">
        <label>{FIELD_CATEGORY}:</label>
        <p className="control">
          <span className="select">
            <select
              name="category"
              //formModel={formModel}
              required={true}
            >
              <option>Select a {FIELD_CATEGORY}</option>
              {categories.map(category => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              })}
            </select>
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_START_DATE}:</label>
        <p className="control has-icons-left">
          <Input
            type="date"
            name="startDate"
            placeholder={FIELD_START_DATE}
            formModel={formModel}
            required={true}
            autoFocus
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faCalendar} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_START_TIME}:</label>
        <p className="control has-icons-left">
          <Input
            type="time"
            name="startTime"
            placeholder={FIELD_START_TIME}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faCalendar} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_DURATION}:</label>
        <p className="control has-icons-left">
          <Input
            type="number"
            name="duration"
            placeholder={FIELD_DURATION}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faClock} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_TASK}:</label>
        <p className="control has-icons-left">
          <Input
            type="text"
            name="taskName"
            placeholder={FIELD_TASK}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faTasks} />
          </span>
        </p>
      </div>
      <div className="buttons is-centered">
        <Button text={TEXT_ADD} className="is-info" disabled={ajaxProcessing} />
      </div>
      <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
    </form>
  )
}

export default TimeLogForm
