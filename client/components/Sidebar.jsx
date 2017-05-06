import React, { Component } from 'react';
import { DatePicker, TimePicker, RaisedButton, Drawer } from 'material-ui';
import Form from './Form.jsx';

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
        <Drawer width="35%" open={this.state.open}>
          <Form />
          <RaisedButton label="Close" onClick={() => { this.toggleDrawer(); }} />
        </Drawer>
      </div>
    );
  }
}
