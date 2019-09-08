import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import { SvgLoader } from 'components/Common/Loaders'
import { LoginGoogle } from 'components/Common/SocialProfile'

import { clearMessage } from 'actions'
import { getLoginRedirect } from 'helpers'
import {
  getProfileDetails,
  deleteProfile,
  socialConnectResponse
} from 'actions/ProfileActions'
import {
  FIELD_AGE,
  FIELD_USERNAME,
  FIELD_EMAIL,
  FIELD_GENDER,
  FIELD_ADDRESS,
  FIELD_NAME
} from 'constants/AppForms'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      userid: '',
      name: '',
      age: '',
      gender: '',
      address: '',
      google_uid: ''
    }

    this.getData = this.getData.bind(this)
    this.connectSocial = this.connectSocial.bind(this)
  }

  getData = async () => {
    const { getProfileDetails } = this.props

    const profileDetails = await getProfileDetails()
    const curState = this.state
    const newState = { ...curState, ...profileDetails }
    this.setState(newState)
  }

  connectSocial = async (authResponse, socialType) => {
    const { socialConnectResponse } = this.props

    const socialResponse = await socialConnectResponse(authResponse, socialType)
    const { google_uid } = socialResponse
    this.setState({ google_uid })
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const {
      email,
      userid: username,
      name,
      age,
      gender,
      address,
      google_uid
    } = this.state

    const {
      ajaxProcessing,
      deleteProfile,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage,
      loggedIn,
      loggedInAdmin
    } = this.props

    if (loggedIn) {
      const redirectPath = getLoginRedirect(loggedIn, loggedInAdmin)
      if (window.location.pathname !== redirectPath) {
        return <Redirect to={redirectPath} />
      }
    }
    return (
      <>
        <div className="container">
          <div className="columns">
            <div className="column is-half table-container">
              <table className="table is-fullwidth">
                <tbody>
                  <tr>
                    <th>{FIELD_EMAIL}</th>
                    <td>{email}</td>
                  </tr>
                  <tr>
                    <th>{FIELD_USERNAME}</th>
                    <td>{username}</td>
                  </tr>

                  <tr>
                    <th>{FIELD_NAME}</th>
                    <td>{name}</td>
                  </tr>
                  <tr>
                    <th>{FIELD_AGE}</th>
                    <td>{age}</td>
                  </tr>
                  <tr>
                    <th>{FIELD_GENDER}</th>
                    <td>{gender}</td>
                  </tr>
                  <tr>
                    <th>{FIELD_ADDRESS}</th>
                    <td>{address}</td>
                  </tr>
                </tbody>
              </table>
              {email !== '' ? (
                <div className="columns">
                  <div className="column">
                    <LoginGoogle
                      buttonClass="button"
                      buttonText="Connect"
                      socialConnectResponse={this.connectSocial}
                      renderPlugin={
                        google_uid === '' ||
                        google_uid === undefined ||
                        google_uid === null
                      }
                    />
                  </div>
                  <div className="column">
                    <a className="button is-warning">Facebook</a>
                  </div>
                  <div className="column">
                    <a className="button is-danger" onClick={deleteProfile}>
                      Delete Account
                    </a>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
        </div>
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInAdmin: state.common.loggedInAdmin,
  ajaxProcessing: state.common.ajaxProcessing,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getProfileDetails,
      deleteProfile,
      clearMessage,
      socialConnectResponse
    }
  )(DashboardContainer)
)
