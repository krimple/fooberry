import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export class ButtonExampleButton extends Component {
  render() {
    return (<Button onClick={this.clickMe}>
      Click Here
    </Button>);
  }

  clickMe() {
    alert('clicked!');
  }
}

export default ButtonExampleButton