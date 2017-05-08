import React, { Component } from 'react';
import { DatePicker, TimePicker, RaisedButton, Drawer } from 'material-ui';
import Form from './Form.jsx';
import PropTypes from 'prop-types';
// TODO: Create Handler will be received as props, pass to form as props
export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div>
        <RaisedButton label="Create Event" onClick={() => { this.toggleDrawer(); }} />
        <Drawer
          width="35%"
          open={this.state.open}
          onRequestClose={() => { this.toggleDrawer(); }}
        >
          <Form createEvent={this.props.createEvent} />
          <RaisedButton label="Close" onClick={() => { this.toggleDrawer(); }} />
        </Drawer>
      </div>
    );
  }
}

// TODO: validate create handler as func
SideBar.propTypes = {
  createEvent: PropTypes.func,
};
