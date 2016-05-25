// Imports
import React, { Component, PropTypes } from 'react'

// Mongo Collection
import { Employees } from '../api/employees.js'

export default class Employee extends Component {
  // Handle Delete
  remove() {
    Employees.remove(this.props.employee._id)
  }

  render() {
    return(
      <div>
        <li>
          <div>
            <b>{this.props.employee.name}</b> - {this.props.employee.designation}
            <button onClick={this.remove.bind(this)}>Delete</button>
          </div>
        </li>
      </div>
    )
  }
}

// Employee PropTypes
Employee.propTypes = {
  employee: PropTypes.object.isRequired
}
