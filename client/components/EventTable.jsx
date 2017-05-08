import React, { Component } from 'react';
import Event from './Event.jsx';
import PropTypes from 'prop-types';
import { CircularProgress } from 'material-ui';
const { object, arrayOf } = React.PropTypes;

// TODO: Make this a pure component
export default class EventTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: window.localStorage.getItem('userid'),
    };
  }
  componentDidMount() {
    console.log('mounted');
  }


  render() {
    return (
      <div>
        {this.props.fetching ? <CircularProgress size={80} thickness={5} />
        :
        <div>
          { this.props.events.map(event => (
            <Event
              key={event.id}
              eventid={event.id}
              hosting={event.owner.id === this.state.userid}
              attending={null}
              title={event.title}
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
EventTable.propTypes = {
  updateEvent: PropTypes.func.isRequired,
  unattendEvent: PropTypes.func.isRequired,
  attendEvent: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(object).isRequired,
  fetching: PropTypes.bool.isRequired,
};
