import React, { Component } from 'react';
import { Card, CardHeader, CardText, Divider, CardActions, FlatButton, Dialog, RaisedButton } from 'material-ui';
import { Line } from 'react-progressbar.js';
import Form from './Form.jsx';
import PropTypes from 'prop-types';
const options = {
  color: '#DE5745',
  trailWidth: 1,
  strokeWidth: 10,
};
const containerStyle = {
  width: '10%',
  height: '100%',
};

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
            <div>{this.props.description}</div>
            <div>Capacity: {this.props.capacity}</div>
            <div>Attending: {this.props.totalGuests}</div>
            <div className="progressbar">
              <Line
                progress={(this.props.totalGuests / this.props.capacity)}
                containerClassName={'.progressbar'}
                containerStyle={containerStyle}
                options={options}
              />
            </div>
            <ul>
              {this.props.guests.map(guest => <li key={guest.id}>{guest.firstName} {guest.lastName}</li>)}
            </ul>
            <CardText>
              {this.props.filter === 'hosting' ?
                <div>
                  <RaisedButton label="Delete" onClick={() => { this.props.deleteEvent(this.props.eventid); }} />
                  <RaisedButton label="Update" onClick={() => { this.toggleDialog(); }} />
                  <Dialog
                    open={this.state.open}
                    onRequestClose={() => { this.toggleDialog(); }}
                  >
                    <FlatButton label="Close" onClick={() => { this.toggleDialog(); }} />
                    <Form
                      eventid={this.props.eventid}
                      hosting={this.props.hosting}
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
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hosting: PropTypes.bool.isRequired,
  updateEvent: PropTypes.func,
  unattendEvent: PropTypes.func,
  attendEvent: PropTypes.func,
  deleteEvent: PropTypes.func.isRequired,
  eventid: PropTypes.string.isRequired,
  capacity: PropTypes.number.isRequired,
  totalGuests: PropTypes.number.isRequired,
};
