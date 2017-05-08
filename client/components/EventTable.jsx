import React, { Component } from 'react';
import Event from './Event.jsx';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
// NOTE: I put the cicular progress component in the table because I believe it is it's concern and better encapsulate the function
// TODO: Make this a pure component
export default class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: this.props.fetching,
      userid: window.localStorage.getItem('userid'),
      filter: this.props.filter,
    };
  }
  // NOTE: I do this to stay consistent. All UI related state is kept local and encapsulated within component
  componentWillReceiveProps(nextProps) {
    this.setState({ fetching: nextProps.fetching });
    this.setState({ filter: nextProps.filter });
  }
// TODO: clean up
  render() {
    let displayedEvents = [];
    if (this.props.filter) {
      if (this.props.filter === 'hosting') {
        this.props.events.forEach((event) => {
          if (event.owner.id === this.state.userid) {
            displayedEvents.push(event);
          }
        });
      } else {
        this.props.events.forEach((event) => {
          event.attendees.forEach((attendee) => {
            if (attendee.id === this.state.userid) {
              displayedEvents.push(event);
            }
          });
        });
      }
    } else {
      displayedEvents = this.props.events;
    }
    return (
      <div>
        {this.state.fetching ? <CircularProgress size={80} thickness={5} />
        :
        <div>
          { displayedEvents.map(event => (
            <Event
              key={event.id}
              eventid={event.id}
              title={event.title}
              filter={this.props.filter}
              description={event.description}
              updateEvent={event.owner.id === this.state.userid ? this.props.updateEvent : null}
              attendEvent={this.props.attendEvent}
              unattendEvent={this.props.unattendEvent}
            />
        ))}
        </div>
        }
      </div>
    );
  }
}
// TODO: validate events proptypes
// TODO: validate filter
EventTable.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  unattendEvent: PropTypes.func.isRequired,
  attendEvent: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  // filter: PropTypes.string.isRequired,
};
