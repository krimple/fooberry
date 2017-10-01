import React, { Component } from 'react';
import './GameTile.css';

export default class GameTile extends Component {

  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  render() {
    return (
        <img alt={this.props.tile.description}
                className="tileIcon"
                src={this.props.tile.display()}
                onMouseEnter={this.hover}
                onMouseLeave={this.endHover} />
    );
  }

  hover() {
    console.log(`entering ${this.props.tile.describe()}`);
  }

  endHover() {
    console.log(`leaving ${this.props.tile.describe()}`);
  }

}

