import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Pagination from 'react-bulma-components/lib/components/pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import 'react-bulma-components/dist/react-bulma-components.min.css'

import { getTimeLogs, deleteTimeLog } from 'actions/TimeLogActions'

import { TEXT_TIME_LOG, TITLE_TIME_LOG } from 'constants/AppLanguage'
import { clearMessage, paginate, resetListingData } from 'actions'

import { SvgLoader } from 'components/Common/Loaders'

import { toLocaleString } from 'helpers'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class TimeLogList extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)
    this.paginate = this.paginate.bind(this)
    this.deleteTimeLog = this.deleteTimeLog.bind(this)
  }

  getData = async () => {
    const { getTimeLogs } = this.props

    await getTimeLogs()
  }

  deleteTimeLog = async timeLogId => {
    const { deleteTimeLog } = this.props
    const response = await deleteTimeLog(timeLogId)
    if (response.code === '200') {
      await this.getData()
    }
  }

  paginate(page) {
    const { history, paginate } = this.props
    paginate(page, history)
  }

  componentDidMount() {
    this.getData()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (prevProps.location.search !== location.search) {
      this.getData()
    }
  }

  componentWillUnmount() {
    const { resetListingData } = this.props
    resetListingData()
  }

  render() {
    const { loggedIn } = this.props
    if (!loggedIn) {
      return <Redirect to="/" />
    }
    const {
      ajaxProcessing,
      apiResponse,
      apiResponseType,
      allowMessageClear,
      clearMessage,
      data,
      currentPage,
      totalPages,
      perPage
    } = this.props

    const htmlUserTimeLogs =
      data.length > 0 ? (
        data.map((userTimeLog, index) => {
          return (
            <TimeLog
              key={userTimeLog.id}
              timeLog={userTimeLog}
              deleteTimeLog={this.deleteTimeLog}
              currentPage={currentPage}
              perPage={perPage}
              index={index}
            />
          )
        })
      ) : (
        <tr>
          <th colSpan={6} className="has-text-centered">
            No records found
          </th>
        </tr>
      )

    return (
      <>
        <Helmet>
          <title>{TITLE_TIME_LOG}</title>
        </Helmet>
        <h1 className="title">{TEXT_TIME_LOG}</h1>

        <div className="table__wrapper">
          <table className="table responsive-table">
            <thead>
              <tr className="has-text-centered is-vertical-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Task</th>
                <th colSpan={2}>Time</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr className="has-text-centered is-vertical-center">
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>{htmlUserTimeLogs}</tbody>
          </table>
        </div>

        <Pagination
          current={currentPage}
          total={totalPages}
          delta={3}
          autoHide={false}
          {...(!ajaxProcessing
            ? { onChange: page => this.paginate(page) }
            : null)}
        />
        <AlertBox
          alertText={apiResponse}
          alertType={apiResponseType}
          allowMessageClear={allowMessageClear}
          clearMessage={clearMessage}
        />
        <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
      </>
    )
  }
}

const TimeLog = props => {
  const { timeLog, deleteTimeLog, currentPage, perPage, index } = props
  const timeLogStartTime = toLocaleString(timeLog.startTime)
  const timeLogEndTime = toLocaleString(timeLog.endTime)
  const timeLogId = timeLog.id
  return (
    <tr className="has-text-centered">
      <td>{perPage * (currentPage - 1) + index + 1}</td>
      <td>{timeLog.category}</td>
      <td>{timeLog.taskName}</td>
      <td>{timeLogStartTime}</td>
      <td>{timeLogEndTime}</td>
      <td>
        <a onClick={() => deleteTimeLog(timeLogId)}>
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </td>
    </tr>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  ajaxProcessing: state.common.ajaxProcessing,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear,
  data: state.listing.data,
  currentPage: state.listing.currentPage,
  totalPages: state.listing.totalPages,
  perPage: state.listing.perPage
})

export default withRouter(
  connect(
    mapStateToProps,
    { getTimeLogs, clearMessage, deleteTimeLog, paginate, resetListingData }
  )(TimeLogList)
)
