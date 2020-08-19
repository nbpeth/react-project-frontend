import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


class SignUpForm extends Component {

  // this isn't typescript, but if you used it interfaces could be leveraged to assert types and save some boiler plate
  state = {
    name: "",
    email: "",
    password: "",
    department_id: null,
    supervisor: false
  }

  handleChange = event => {
    if (event.target.name === "supervisor") {
      this.setState({
        supervisor: (event.target.value === 'true')
      })
    } else if (event.target.name === "department_id") {
      this.setState({
        department_id: parseInt(event.target.value)
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.signUp(this.state)
  }

  // add a form validation container that displays errors OR decorates each input with an error message

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label>Sign Up:</Form.Label>
        <Form.Group >
          <Form.Label>Name:</Form.Label>
            {/*name is a unique constraint, but shouldn't be - email addresses are unique but what happens if you have two people named "teddy". Then, of course, your user displays need to handle ways to delineate between multiple teddy's*/}
          <Form.Control placeholder="name" value={this.state.name} name="name" type="text" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>Email:</Form.Label>
            {/*this says email but there is no validation on the email, at least having a reasonable regex pattern*/}
          <Form.Control placeholder="email" value={this.state.email} name="email" type="text" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control placeholder="password" value={this.state.password} name="password" type="password" onChange={this.handleChange} />
        </Form.Group>
        <Form.Group >
          <Form.Label>Department:</Form.Label>
          <Form.Control as="select" name="department_id" id="department" onChange={this.handleChange} custom>
            <option value="">Choose a Department</option>
            {this.props.departments.map(department => <option key={department.attributes.id} value={department.attributes.id}>{department.attributes.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <label>Supervisor?</label>
          <br></br>
          <input type="radio" name="supervisor" id="sup-true" value="true" onChange={this.handleChange} />
          <label htmlFor="sup-true">Yes</label>
          <input type="radio" name="supervisor" id="sup-false" value="false" defaultChecked={true} onChange={this.handleChange} />
          <label htmlFor="sup-false">No</label>
        </Form.Group>
        <Button size="sm" variant="outline-secondary" type="submit">Sign Up</Button>
      </Form>
    )
  }
}

export default SignUpForm
