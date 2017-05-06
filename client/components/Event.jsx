import React, { Component } from 'react';
import { Card, CardHeader, CardText, Divider } from 'material-ui';
// TODO: Do i have to inject this in every file?
const injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

export default class Event extends Component {
  constructor(props) {
    super(props);
    // Local UI State
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    console.log('send network request');
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.title}
            actAsExpander
            showExpandableButton
          />
          <CardText expandable>
            {this.props.description}
          </CardText>
        </Card>
        <Divider />
      </div>
    );
  }
  // TODO: should shouldComponentUpdate be in each event to improve performance
  // TODO: add props validation
}
