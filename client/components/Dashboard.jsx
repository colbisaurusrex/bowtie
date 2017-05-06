import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import SideBar from './Sidebar.jsx';
import Event from './Event.jsx';
import sampleData from '../sample.js';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: sampleData,
    };
  }
  componentDidMount() {
    // TODO: I think this is crux of optimization. Should I request all events at once and hydrate the state
    // with the response? Or somehow pagiate and request them as the user interacts? How does this effect the attending
    // and hosting tabs?
    console.log(this.props);
    console.log('send network request for all events ');
  }

  // TODO: nest button to open sidebar and tabs menu in a containing app bar
  render() {
    return (
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
    );
  }
}
// TODO: how do I type check for this.state.events
