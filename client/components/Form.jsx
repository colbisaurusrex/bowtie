import React, { Component } from 'react';
import { FloatingActionButton, TextField, DatePicker, TimePicker, Divider } from 'material-ui';
import moment from 'moment';
import PropTypes from 'prop-types';

// TODO: Create Handler will be received as props, implement here
// TODO: Do not allow user to submit without all fields compeleted
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      date: null,
      time: null,
      capacity: null,
    };
  }
  // TODO: Clean this up.
  // NOTE: Material-UI has a flaw wherein two date and time picker input fields cannot be combined through a built in method. This must be done manually.
  createHandler() {
    const convertedDate = moment(this.state.date);
    const convertedTime = moment(this.state.time);
    const year = JSON.stringify(convertedDate.year());
    // NOTE: moment converts it to previous month, for some reason. Have to add one.
    const month = convertedDate.month() + 1;
    const day = JSON.stringify(convertedDate.date());
    const hour = JSON.stringify(convertedTime.hours());
    const minutes = JSON.stringify(convertedTime.minutes());
    let date = `${year}-${month}-${day} ${hour}:${minutes}:00`;
    date = moment(date).format('YYYY-MM-DD HH:mm:ssZ');
    const details = {
      title: this.state.title,
      description: this.state.description,
      startsAt: date,
      capacity: this.state.capacity,
    };
    this.props.createEvent(details);
  }

  handleInputChange(e, date) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleDatePickerChange(event, date) {
    this.setState({ date });
  }
  handleTimePickerChange(event, time) {
    this.setState({ time });
  }
  render() {
    return (
      <div>
        <TextField
          floatingLabelText="Name The Event"
          errorText="This is required"
          name="title"
          onChange={this.handleInputChange.bind(this)}
        />
        <Divider />
        <TextField
          floatingLabelText="Add A Description"
          errorText="This is required"
          name="description"
          multiLine
          rows={1}
          rowsMax={6}
          onChange={this.handleInputChange.bind(this)}
        />
        <Divider />
        <TextField
          floatingLabelText="Capacity"
          errorText="This is required"
          name="capacity"
          type="number"
          onChange={this.handleInputChange.bind(this)}
        />
        <Divider />
        <DatePicker
          floatingLabelText="Pick A Date"
          errorText="This is required"
          autoOk
          name="date"
          value={this.state.date}
          onChange={this.handleDatePickerChange.bind(this)}
        />
        <Divider />
        <TimePicker
          format="ampm"
          floatingLabelText="Pick A Time"
          errorText="This is required"
          autoOk
          name="time"
          value={this.state.time}
          onChange={this.handleTimePickerChange.bind(this)}
        />
        <Divider />
        <FloatingActionButton onClick={this.createHandler.bind(this)} />
      </div>
    );
  }
}
// TODO: validate create handler as props
Form.propTypes = {
  createEvent: PropTypes.func,
};
