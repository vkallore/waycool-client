import React from 'react'
import { connect } from 'react-redux'

import { changeFormValue } from 'actions'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    const { onChange, formModel } = this.props
    const { value, name } = event.target
    if (typeof onChange === 'function') {
      onChange(formModel, { [name]: value })
    }
  }

  render() {
    const {
      id,
      name = '',
      value,
      required = false,
      formModel,
      forms,
      autoFocus
    } = this.props
    let { className = '' } = this.props
    const selectValue =
      value === undefined
        ? forms[formModel] && forms[formModel][name]
          ? forms[formModel][name]
          : ''
        : value
    className = `input ${className}`

    return (
      <React.Fragment>
        <select
          name={name}
          id={id || name}
          value={selectValue}
          onChange={this.onChange}
          className={className}
          required={required}
          autoFocus={autoFocus || false}
        >
          {this.props.children}
        </select>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  forms: state.forms
})

const mapDispatchToProps = dispatch => ({
  onChange: (formModel, values) => dispatch(changeFormValue(formModel, values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
