// Imports
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

// Employee Collection
import { Employees } from '../api/employees.js'

// Components
import Employee from './Employee.jsx'

// App Component
class App extends Component {
  constructor(props) {
    super(props)
  }

  // Handle Employee Add
  handleEmployeeAdd(event) {
    // Prevent Default Event Behaviour
    event.preventDefault()

    // Pull Form Data
    const name        = ReactDOM.findDOMNode(this.refs.name).value.trim()
    const designation = ReactDOM.findDOMNode(this.refs.designation).value.trim()

    // DB Insert
    Employees.insert({
      name: name,
      designation: designation,
    })

    // Clear Form Values
    ReactDOM.findDOMNode(this.refs.name).value        = ''
    ReactDOM.findDOMNode(this.refs.designation).value = ''
  }

  // Render Employee List
  renderEmployees() {
    return this.props.employees.map((employee) => (
      <Employee key={employee._id} employee={employee} />
    ))
  }

  // Component Render
  render() {
    return (
      <div className="container">
        <header>
          <h1>Employee Management</h1>
        </header>

        <div>
          <form onSubmit={this.handleEmployeeAdd.bind(this)}>
            <input type="text" ref="name" placeholder="Employee Name" />
            <input type="text" ref="designation" placeholder="Designation" />
            <button type="submit">Add</button>
          </form>
        </div>

        <ul>
          {this.renderEmployees()}
        </ul>
      </div>
    )
  }
}

// Component PropTypes
App.propTypes = {
  employees: PropTypes.array.isRequired
}

// React-Mongo Collection Mapping
export default createContainer(() => {
  return {
    employees: Employees.find({}).fetch()
  }
}, App)
