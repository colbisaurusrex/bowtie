import React, { Component } from 'react';
import { Tabs, Tab, CircularProgress } from 'material-ui';
import SideBar from './Sidebar.jsx';
import Event from './Event.jsx';
import sampleData from '../sample.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: sampleData,
      fetching: true,
    };
  }
  componentDidMount() {
    // SIMULATION OF NETWORK REQUEST
    setTimeout(() => {
      this.setState({ fetching: false });
    }, 2000);
    // TODO: I think this is crux of optimization. Should I request all events at once and hydrate the state
    // with the response? Or somehow pagiate and request them as the user interacts? How does this effect the attending
    // and hosting tabs?
    console.log('send network request for all events ');
  }

  // TODO: nest button to open sidebar and tabs menu in a containing app bar
  render() {
    return (
      <div>
        {this.state.fetching ?
          <CircularProgress size={80} thickness={5} /> :
          <div>
            <SideBar />
            <Tabs>
              <Tab label="All Events" />
              <Tab label="Attending" />
              <Tab label="Hosting" />
            </Tabs>
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
