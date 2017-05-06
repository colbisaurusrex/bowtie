import React, { Component } from 'react';
import { RaisedButton, Dialog } from 'material-ui';
import SideBar from './Sidebar.jsx';

const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

export default class AlertDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      title: 'This will be the event title',
      description: 'This will be then even description',
    };
  }

  componentDidMount() {
    console.log('send network request');
  }

  closeDialog() { this.setState({ open: false }); }

  render() {
    return (
      <div>
        <SideBar />
        <RaisedButton label="See More"onClick={() => this.setState({ open: true })} />
        <Dialog
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          <RaisedButton label="Close" onClick={this.closeDialog.bind(this)} primary />
        </Dialog>
      </div>
    );
  }
}
