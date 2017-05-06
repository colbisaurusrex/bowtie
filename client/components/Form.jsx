import React, { Component } from 'react';
import { FloatingActionButton, TextField, DatePicker, TimePicker, Divider } from 'material-ui';


const Form = () => (
  <div>
    <TextField hintText="Name The Event" />
    <Divider />
    <TextField hintText="Add A Description" />
    <Divider />
    <DatePicker hintText="Pick A Date" />
    <Divider />
    <TimePicker hintText="Pick A Time" />
    <Divider />
    <FloatingActionButton />
  </div>
);

export default Form;
