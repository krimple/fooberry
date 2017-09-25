import React, { Component } from 'react';

export default class GameTile extends Component {

  render() {
    return <div>{this.props.tile.display()}</div>;
  }
}

