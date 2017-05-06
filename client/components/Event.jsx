import React, { Component } from 'react';
import { Card, CardHeader, CardText, Divider, CardActions, FlatButton, Dialog } from 'material-ui';
import Form from './Form.jsx';
import PropTypes from 'prop-types';
// TODO: Do i have to inject this in every file?
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

export default class Event extends Component {
  // TODO: Should this be a pure component?
  constructor(props) {
    super(props);
    // Local UI State
    this.state = {
      open: false,
    };
  }

  toggleDialog() {
    this.setState({ open: !this.state.open });
  }
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.title}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            {this.props.description}
            <CardText>
              <FlatButton label="Update" onClick={() => { this.toggleDialog(); }} />
            </CardText>
          </CardText>
        </Card>
        <Dialog
          open={this.state.open}
          onRequestClose={() => { this.toggleDialog(); }}
        >
          <FlatButton label="Close" onClick={() => { this.toggleDialog(); }} />
          <Form />
        </Dialog>
        <Divider />
      </div>
    );
  }
  // TODO: should shouldComponentUpdate be in each event to improve performance
}
Event.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};
