import React, { Component } from 'react';
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

  render() {
    return (
      <div>
        <SideBar />
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
