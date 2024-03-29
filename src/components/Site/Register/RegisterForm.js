import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEnvelope,
  faUser,
  faChild,
  faGenderless,
  faMap,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

import Input from 'components/FormElements/Input'
import Select from 'components/FormElements/Select'
import Button from 'components/FormElements/Button'
import { SvgLoader } from 'components/Common/Loaders'

import {
  FIELD_EMAIL,
  FIELD_NAME,
  FIELD_AGE,
  FIELD_GENDER,
  FIELD_GENDER_MALE,
  FIELD_GENDER_FEMALE,
  FIELD_GENDER_OTHER,
  FIELD_ADDRESS
} from 'constants/AppForms'

const RegisterForm = props => {
  const {
    formFields,
    handleSubmit,
    ajaxProcessing,
    formModel,
    gettingLocation,
    getGeoLocation
  } = props

  const { regBtnText } = formFields

  const submitForm = event => {
    event.preventDefault()
    handleSubmit(formFields)
  }

  return (
    <form onSubmit={submitForm} noValidate>
      <div className="field">
        <label>{FIELD_NAME}:</label>
        <p className="control has-icons-left">
          <Input
            type="text"
            name="name"
            placeholder={FIELD_NAME}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_EMAIL}:</label>
        <p className="control has-icons-left">
          <Input
            type="email"
            name="email"
            placeholder={FIELD_EMAIL}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_AGE}:</label>
        <p className="control has-icons-left">
          <Input
            type="number"
            name="age"
            placeholder={FIELD_AGE}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faChild} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_GENDER}:</label>
        <p className="control has-icons-left">
          <Select name="gender" formModel={formModel} required={true}>
            <option>{FIELD_GENDER}</option>
            <option>{FIELD_GENDER_MALE}</option>
            <option>{FIELD_GENDER_FEMALE}</option>
            <option>{FIELD_GENDER_OTHER}</option>
          </Select>
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faGenderless} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_ADDRESS}:</label>
        <p className="control has-icons-left">
          <Input
            type="email"
            name="address"
            placeholder={FIELD_ADDRESS}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faMap} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>
          <a
            className="button"
            onClick={getGeoLocation}
            href="#"
            disabled={ajaxProcessing || gettingLocation}
          >
            {gettingLocation ? 'Getting location' : 'Get location'}
            <span className="icon is-small is-left">
              &nbsp;
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>
          </a>
        </label>
        <Input type="hidden" name="latitude" formModel={formModel} />
        <Input type="hidden" name="longitude" formModel={formModel} />
        <Input type="hidden" name="recreate_confirm" formModel={formModel} />
      </div>

      <div className="buttons is-centered">
        <Button
          text={regBtnText}
          className="is-info"
          disabled={ajaxProcessing || gettingLocation}
        />
      </div>
      <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
    </form>
  )
}

export default RegisterForm
