import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Point from '../../Point';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 35px;
  width: 35px;
  max-height: 50px;
  max-width: 50px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(./icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 35px;
  width: 35px;
  max-height: 50px;
  max-width: 50px;
  opacity: 1.0;
`;

const NPCIcon = styled.img`
  background-image: url(${props => props.icon});
  border: 1px solid black;
  max-height: 50px;
  max-width: 50px;
  height: 35px;
  width: 35px;
  opacity: 1.0;
`;

class GameTile extends React.PureComponent {

  render() {
    if (!this.props.tile) {
      return <span></span>;
    }
    const key ='tile' + this.props.x + ',' + this.props.y;

    if (this.props.isPlayerLocation) {
      return (
        <PlayerIcon key={key}/>
      );
    } else if (this.props.isNPCLocation) {
      return (
        <NPCIcon key={key} icon={this.props.npcIcon}/>
      );
    } else {
      return (
        <TileIcon alt={this.props.tile.description}
          key={key}
          className="tileIcon"
          src={this.props.tile.display()} />
      );
    }
  }
}

function mapStateToProps(state, ownProps) {
  let npcIcon = null, isNpcLocation = false;

  if (!state.npcs || !state.player) {
    return {};
  }

  const ownPoint = { x: ownProps.x, y: ownProps.y };
  const playerPoint = state.player.point;

  const npcs = state.npcs;
  if (!npcs) {
    return {};
  }

  for (let npcKey in npcs) {
    const npc = npcs[npcKey];
    const hitPoints = npc.hitPoints;
    const npcPoint = npc.point;
    // if the npc is alive, see if it occupies this tile
    if (hitPoints > 0 &&
      Point.equals(ownPoint, npcPoint)) {
      npcIcon = npc.icon;
      isNpcLocation = true;
    }
  }

  return {
    tile: state.grid[ownProps.y][ownProps.x],
    isPlayerLocation:
      Point.equals(ownPoint, playerPoint),
    isNPCLocation: isNpcLocation,
    npcIcon: npcIcon
  };
}

GameTile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  tile: PropTypes.object,
  isPlayerLocation: PropTypes.bool,
  isNPCLocation : PropTypes.bool,
  npcIcon: PropTypes.string
};

export default connect(mapStateToProps)(GameTile);
