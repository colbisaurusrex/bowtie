import React, { Component } from 'react';
import { Card, CardHeader, CardText, Divider, CardActions, FlatButton, Dialog, RaisedButton } from 'material-ui';
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
              {this.props.filter === 'hosting' ?
                <div>
                  <RaisedButton label="Update" onClick={() => { this.toggleDialog(); }} />
                  <Dialog
                    open={this.state.open}
                    onRequestClose={() => { this.toggleDialog(); }}
                  >
                    <FlatButton label="Close" onClick={() => { this.toggleDialog(); }} />
                    <Form
                      updateEvent={this.props.updateEvent}
                    />
                  </Dialog>
                </div>
                : null
              }
              {this.props.filter === 'attending' ?
                <RaisedButton label="Unattend" onClick={() => { this.props.unattendEvent(this.props.eventid); }} />
              :
                <RaisedButton label="Attend" onClick={() => { this.props.attendEvent(this.props.eventid); }} /> }
            </CardText>
          </CardText>
        </Card>

        <Divider />
      </div>
    );
  }
  // TODO: should shouldComponentUpdate be in each event to improve performance
}
// TODO:validate filter
Event.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  updateEvent: PropTypes.func,
  unattendEvent: PropTypes.func,
  attendEvent: PropTypes.func,
  eventid: PropTypes.string,
};
