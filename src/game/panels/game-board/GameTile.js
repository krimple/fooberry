import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 50px;
  width: 50px;
  max-height: 100px;
  max-width: 100px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 50px;
  width: 50px;
  max-height: 100px;
  max-width: 100px;
  opacity: 1.0;
`;

const NPCThiefIcon = styled.img`
  background-image: url(icons/cathelineau/originals/svg/bad-gnome.svg);
  border: 1px solid black;
  max-height: 100px;
  max-width: 100px;
  height: 50px;
  width: 50px;
  opacity: 1.0;
`;

export default class GameTile extends Component {

  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  render() {
    if (this.props.playerLocation.x === this.props.tile.x &&
      this.props.playerLocation.y === this.props.tile.y) {
      return (
        <PlayerIcon/>
      );
    } else if (this.props.thiefLocation.x === this.props.tile.x &&
      this.props.thiefLocation.y === this.props.tile.y) {
      return (
        <NPCThiefIcon/>
      );
    } else {
      return (
        <TileIcon alt={this.props.tile.description}
          className="tileIcon"
          src={this.props.tile.display()}
          onmouseenter={this.hover}
          onmouseleave={this.endhover}/>
      );
    }
  }

  hover() {
    console.log(`entering ${this.props.tile.describe()}`);
  }

  endHover() {
    console.log(`leaving ${this.props.tile.describe()}`);
  }

}

GameTile.propTypes = {
  tile: PropTypes.object,
  playerLocation: PropTypes.object,
  thiefLocation : PropTypes.object
};

