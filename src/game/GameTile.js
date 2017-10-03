import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 40px;
  width: 40px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  border: 1px solid black;
  height: 40px;
  width: 40px;
  opacity: 1.0;
`;

class GameTile extends Component {

  constructor(props) {
    super(props);
    this.hover = this.hover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  render() {
    if (this.props.player.x === this.props.tile.x &&
        this.props.player.y === this.props.tile.y) {
     return (
         <PlayerIcon alt="player"
              className="playerIcon"
              src="icons/delapouite/originals/svg/walking-scout.svg" />
     );
    } else {
      return (
          <TileIcon alt={this.props.tile.description}
               className="tileIcon"
               src={this.props.tile.display()}
               onMouseEnter={this.hover}
               onMouseLeave={this.endHover}/>
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

function mapStateToProps(state) {
  return {
    player: state.atoms.player
  };
}

export default connect(mapStateToProps)(GameTile);
