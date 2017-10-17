import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styled from 'styled-components';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 40px;
  width: 40px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 40px;
  width: 40px;
  opacity: 1.0;
`;

const NPCThiefIcon = styled.img`
  background-image: url(icons/cathelineau/originals/svg/bad-gnome.svg);
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
    if (this.props.player.get('x') === this.props.tile.x &&
      this.props.player.get('y') === this.props.tile.y) {
      return (
        <PlayerIcon/>
      );
    } else if (this.props.thief.get('x') === this.props.tile.x &&
      this.props.thief.get('y') === this.props.tile.y) {
      return (
        <NPCThiefIcon/>
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

GameTile.propTypes = {
  tile: PropTypes.object,
  player: PropTypes.object,
  thief: PropTypes.object
};

function mapStateToProps(state) {
  return {
    player: state.game.getIn(['atoms', 'player']),
    thief: state.game.getIn(['atoms', 'thief'])
  };
}

export default connect(mapStateToProps)(GameTile);
