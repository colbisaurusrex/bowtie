import React, { Component } from 'react';
import { TextField, FlatButton } from 'material-ui';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newUser: false,
    };
  }

  toggleComponent() {
    this.setState({ newUser: !this.state.newUser });
  }
  render() {
    return (
      <div>
        <TextField
          hintText="Username"
          errorText="This is required"
        />
        <TextField
          hintText="Password"
          errorText="This is required"
        />
        {this.state.newUser ?
          <div>
            <TextField
              hintText="First Name"
              errorText="This is required"
            />
            <TextField
              hintText="LastName"
              errorText="This is required"
            />
            <FlatButton label="Sign Up" onClick={() => { this.toggleComponent(); }} />
          </div>
        :
        null
        }
        { this.state.newUser ? null :
        <div>
          <FlatButton label="Sign In" />
          <FlatButton label="New User?" onClick={() => { this.toggleComponent(); }} />
        </div>
       }
      </div>
    );
  }
}
