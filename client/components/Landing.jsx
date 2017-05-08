import React, { Component } from 'react';
import { CircularProgress } from 'material-ui';
import Event from './Event.jsx';
import axios from 'axios';

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      fetching: true,
    };
  }
  componentDidMount() {
    axios.get('https://testproject-api.strv.com/events')
    .then(({ data }) => {
      this.setState({ events: data });
      this.setState({ fetching: false });
    })
    // TODO: UX error handling
    .catch(err => console.log(err));
  }

  // TODO: nest button to open sidebar and tabs menu in a containing app bar
  render() {
    return (
      <div>
        {this.state.fetching ?
          <CircularProgress size={80} thickness={5} /> :
          <div>
            {this.state.events.map(event => (
          // TODO: Add keys to uniquely identify each event
              <Event
                title={event.title}
                description={event.description}
              />
         ))}
          </div>
        }
      </div>
    );
  }
  // TODO: clear out all network requests, intervals, etc in a lifecycle method
}
// TODO: how do I type check for this.state.events
