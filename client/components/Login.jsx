import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';
import axios from 'axios';
export default class Login extends Component {
  // TODO: add error to state and warn user of error if authentication failed
  // TODO: web worker to check if authenticated? Or just reauthenticate
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
      email: '',
      password: '',
      firstname: '',
      lastname: '',
    };
  }

  toggleComponent() {
    this.setState({ newUser: !this.state.newUser });
  }
  // TODO: should i store the id of the user and first name? Easy.
  authenticate() {
    const email = this.state.email;
    const password = this.state.password;
    axios.post('https://testproject-api.strv.com/auth/native', { email, password })
    .then(({ data, headers }) => {
      window.localStorage.setItem('token', headers.authorization);
      // TODO: push to dashboard
    })
    .catch(err => console.log(err));
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Email"
          errorText="This is required"
          name="email"
          type="email"
          onChange={this.handleInputChange.bind(this)}
        />
        <TextField
          floatingLabelText="Password"
          errorText="This is required"
          name="password"
          type="password"
          onChange={this.handleInputChange.bind(this)}
        />
        {this.state.newUser ?
          <div>
            <TextField
              floatingLabelText="First Name"
              errorText="This is required"
              name="firstname"
              type="text"
              onChange={this.handleInputChange.bind(this)}
            />
            <TextField
              floatingLabelText="LastName"
              errorText="This is required"
              name="lastname"
              type="text"
              onChange={this.handleInputChange.bind(this)}
            />
            <FlatButton type="submit" label="Sign Up" />
          </div>
        :
        null
        }
        { this.state.newUser ? null :
        <div>
          <FlatButton label="Sign In" onClick={() => { this.authenticate(); }} />
          <FlatButton label="New User?" onClick={() => { this.toggleComponent(); }} />
        </div>
       }
      </div>
    );
  }
}
