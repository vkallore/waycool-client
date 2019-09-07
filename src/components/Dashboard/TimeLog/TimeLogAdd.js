import React from 'react'
import TimeLogForm from 'components/Dashboard/TimeLog/TimeLogForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { allCategories, addTimeLog } from 'actions/TimeLogActions'

import { FORM_TIME_LOG } from 'constants/AppForms'

import { TITLE_TIME_LOG_ADD, TIME_LOG_ADD } from 'constants/AppLanguage'

import { clearMessage } from 'actions'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class TimeLogAdd extends React.Component {
  state = {
    allCategories: []
  }
  handleSubmit = async formFields => {
    const { addTimeLog } = this.props
    addTimeLog(formFields)
  }

  componentDidMount = async () => {
    const { allCategories } = this.props
    const categories = await allCategories()

    if (categories.data) {
      this.setState({
        allCategories: categories.data
      })
    }
  }

  render() {
    const {
      ajaxProcessing,
      formFields,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage
    } = this.props
    const { allCategories } = this.state
    return (
      <>
        <Helmet>
          <title>{TITLE_TIME_LOG_ADD}</title>
        </Helmet>
        <h1 className="title">{TIME_LOG_ADD}</h1>
        <TimeLogForm
          handleSubmit={this.handleSubmit}
          ajaxProcessing={ajaxProcessing}
          formFields={formFields}
          formModel={FORM_TIME_LOG}
          categories={allCategories}
        />
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
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.forms.timeLog,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    { addTimeLog, clearMessage, allCategories }
  )(TimeLogAdd)
)
