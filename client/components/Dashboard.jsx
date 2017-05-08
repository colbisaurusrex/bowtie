import React, { Component } from 'react';
import { Tabs, Tab, CircularProgress } from 'material-ui';
import SideBar from './Sidebar.jsx';
import EventTable from './EventTable.jsx';
import axios from 'axios';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
// TODO: set an interval to periodically fetch new events maybe? Need to clear the interval in a lifecylce method if so
// TODO: To improve performance, add 'updatedid' to state and pass as props to Event component. Within event component, use in shouldComponentUpdate 
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      fetching: true,
      processing: false,
      filter: '',
      // TODO: Store userid in localStorage is inconsistent. Refactor to pass as props
      userid: window.localStorage.getItem('userid'),
    };
  }

  //TODO: Better error handling for network requests
  componentDidMount() {
    axios.get('https://testproject-api.strv.com/events')
    .then(({ data }) => {
      console.log(data)
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
      //TODO: update state
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
      //TODO: update state
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
      //TODO: update state. 
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  filterHosting(){
    this.setState({filter: 'hosting'})
  }

  filterAttending(){
     this.setState({filter: 'attending'})
  }
  displayAll = () => {
    this.setState({filter: ''})
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
              <Tab label="All Events" onClick={this.displayAll}/>
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
               filter={this.state.filter} 
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
