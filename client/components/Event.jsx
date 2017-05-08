import React, { Component } from 'react';
import { Card, CardHeader, CardText, Divider, CardActions, FlatButton, Dialog } from 'material-ui';
import Form from './Form.jsx';
import PropTypes from 'prop-types';


export default class Event extends Component {
  // TODO: Should this be a pure component?
  constructor(props) {
    super(props);
    // Local UI State
    this.state = {
      open: false,
      // TODO: I am passing this hosting boolean based on the userid in Dashboard. This is temporary and hard to keep track of. Make state more uniform
      hosting: this.props.hosting,
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
              {this.props.hosting ?
                <FlatButton label="Update" onClick={() => { this.props.updateEvent(this.props.eventid); }} />
                : null
              }
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
  hosting: PropTypes.bool,
  updateEvent: PropTypes.func,
  eventid: PropTypes.string,
};
