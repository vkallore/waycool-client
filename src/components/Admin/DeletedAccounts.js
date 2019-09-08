import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import Pagination from 'react-bulma-components/lib/components/pagination'
import 'react-bulma-components/dist/react-bulma-components.min.css'

import { getDeletedAccounts } from 'actions/AdminActions'

import { TEXT_DELETED_USERS, TITLE_DELETED_USERS } from 'constants/AppLanguage'
import { clearMessage, paginate, resetListingData } from 'actions'

import { SvgLoader } from 'components/Common/Loaders'

import { toLocaleString } from 'helpers'

const AlertBox = React.lazy(() => import('components/Common/AlertBox'))

class DeletedAccounts extends React.Component {
  constructor(props) {
    super(props)

    this.getData = this.getData.bind(this)
    this.paginate = this.paginate.bind(this)
  }

  getData = async () => {
    const { getDeletedAccounts } = this.props

    await getDeletedAccounts()
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

    const htmlDeletedAccounts =
      data.length > 0 ? (
        data.map((deletedAccount, index) => {
          return (
            <DeletedAccount
              key={deletedAccount.id}
              deletedAccount={deletedAccount}
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
          <title>{TITLE_DELETED_USERS}</title>
        </Helmet>
        <h1 className="title">{TEXT_DELETED_USERS}</h1>

        <div className="table__wrapper">
          <table className="table responsive-table">
            <thead>
              <tr className="has-text-centered is-vertical-center">
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Unique ID</th>
                <th rowSpan={2}>Email</th>
                <th rowSpan={2}>Name</th>
                <th colSpan={2}>Time</th>
              </tr>
              <tr className="has-text-centered is-vertical-center">
                <th>Created</th>
                <th>Deleted</th>
              </tr>
            </thead>
            <tbody>{htmlDeletedAccounts}</tbody>
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

const DeletedAccount = props => {
  const { deletedAccount, currentPage, perPage, index } = props
  const userCreatedAt = toLocaleString(deletedAccount.created_at)
  const userDeletedAt = toLocaleString(deletedAccount.deleted_at)
  return (
    <tr>
      <td>{perPage * (currentPage - 1) + index + 1}</td>
      <td>{deletedAccount.user_id}</td>
      <td>{deletedAccount.email_id}</td>
      <td>{deletedAccount.fullname}</td>
      <td>{userCreatedAt}</td>
      <td>{userDeletedAt}</td>
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
    { getDeletedAccounts, clearMessage, paginate, resetListingData }
  )(DeletedAccounts)
)
