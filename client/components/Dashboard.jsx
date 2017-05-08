import React, { Component } from 'react';
import { Tabs, Tab, CircularProgress } from 'material-ui';
import SideBar from './Sidebar.jsx';
import EventTable from './EventTable.jsx';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// TODO: To improve performance, add 'updatedid' to state and pass as props to Event component. Within event component, use in shouldComponentUpdate 
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      fetching: true,
      processing: false,
      // TODO: Store userid in localStorage is inconsistent. Refactor to pass as props
      userid: window.localStorage.getItem('userid'),
    };
  }

  //TODO: Better error handling for network requests
  componentDidMount() {
    axios.get('https://testproject-api.strv.com/events')
    .then(({ data }) => {
      this.setState({ events: data });
      this.setState({ fetching: false });
    })
    .catch(err => console.log(err));
  }
  // USING ARROW FUNCTIONS TO BIND 'THIS' CONTEXT TO DASHBOARD. THIS IS EXPERIMENTAL SYNTAX.
  createEvent = (details) => {
    const headers = {
      Authorization: window.localStorage.getItem('token'),
    };  
    axios.post('https://testproject-api.strv.com/events', details, { headers })
    .then((data) =>{
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  updateEvent = () => {
    console.log('update event :', this);
  }

  attendEvent = (eventid) =>{
    const headers = {
      Authorization: window.localStorage.getItem('token'),
    };   
    axios.post(`https://testproject-api.strv.com/events/${eventid}/attendees/me/`, {}, { headers })
    .then((data)=>{
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  unattendEvent = (eventid) => {
    const headers = {
      Authorization: window.localStorage.getItem('token'),
    };
    axios.delete(`https://testproject-api.strv.com/events/${eventid}/attendees/me/`, { headers })  
    .then((data)=>{
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  filterHosting(){
    const hosting = this.state.events.filter( (event) => {
      return event.owner.id === this.state.userid; 
    })
    this.setState({events: hosting}) 
  }

  filterAttending(){
     // this.setState({fetching: true}) 
  }

  // TODO: nest button to open sidebar and tabs menu in a containing app bar
  render() {
    return (
      <div>
          <div>
            <SideBar
              createEvent={this.createEvent}
            />
            <Tabs>
              <Tab label="All Events" onClick={this.fetchEvents}/>
              <Tab label="Attending" 
              onClick={this.filterAttending.bind(this)}
              />
              <Tab 
              label="Hosting" 
              onClick={this.filterHosting.bind(this)}
              />
            </Tabs>
            {/* TODO: I have slightly optomized by only passing the updateEvent function to events the user owns, however it be best to find a way to instantiate the funciton only once on a parent component*/}
            <div> 
              <EventTable 
               events = {this.state.events}
               updateEvent= {this.updateEvent}
               attendEvent= {this.attendEvent}
               unattendEvent={ this.unattendEvent} 
               fetching={this.state.fetching}
              />
            </div>                     
          </div>
      </div>
    );
  }
  // TODO: clear out all network requests, intervals, etc in a lifecycle method
}
// TODO: how do I type check for this.state.events
