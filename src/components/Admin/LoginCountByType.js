import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Pagination from 'react-bulma-components/lib/components/pagination'
import 'react-bulma-components/dist/react-bulma-components.min.css'

import { getLoginCountByTypes } from 'actions/AdminActions'

import { TITLE_LOGIN_BY_TYPE, TEXT_LOGIN_BY_TYPE } from 'constants/AppLanguage'
import { clearMessage, paginate, resetListingData } from 'actions'

import { SvgLoader } from 'components/Common/Loaders'

import { toLocaleString } from 'helpers'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class LoginCountByType extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  getData = async () => {
    const { getLoginCountByTypes } = this.props

    await getLoginCountByTypes()
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

    const htmlLoginCountByType =
      data.length > 0 ? (
        data.map((loginCountByType, index) => {
          return (
            <LoginCountByTypeRow
              key={loginCountByType.id}
              loginCountByType={loginCountByType}
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
          <title>{TITLE_LOGIN_BY_TYPE}</title>
        </Helmet>
        <h1 className="title">{TEXT_LOGIN_BY_TYPE}</h1>

        <div className="table__wrapper">
          <table className="table responsive-table">
            <thead>
              <tr className="has-text-centered is-vertical-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Unique ID</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>User Created On</th>
                <th colSpan={3}>Login Type</th>
              </tr>
              <tr className="has-text-centered is-vertical-center">
                <th>Email</th>
                <th>Facebook</th>
                <th>Google</th>
              </tr>
            </thead>
            <tbody>{htmlLoginCountByType}</tbody>
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

const LoginCountByTypeRow = props => {
  const { loginCountByType, currentPage, perPage, index } = props
  const userCreatedAt = toLocaleString(loginCountByType.created_at)
  return (
    <tr>
      <td>{perPage * (currentPage - 1) + index + 1}</td>
      <td>{loginCountByType.user_id}</td>
      <td>{loginCountByType.email_id}</td>
      <td>{loginCountByType.fullname}</td>
      <td>{userCreatedAt}</td>
      <td className="has-text-centered">{loginCountByType.email}</td>
      <td className="has-text-centered">{loginCountByType.facebook}</td>
      <td className="has-text-centered">{loginCountByType.google}</td>
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
    { getLoginCountByTypes, clearMessage, paginate, resetListingData }
  )(LoginCountByType)
)
