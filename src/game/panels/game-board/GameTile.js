import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 35px;
  width: 35px;
  max-height: 50px;
  max-width: 50px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(/icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 35px;
  width: 35px;
  max-height: 50px;
  max-width: 50px;
  opacity: 1.0;
`;

/*const NPCThiefIcon = styled.img`
  background-image: url(/icons/cathelineau/originals/svg/bad-gnome.svg);
  border: 1px solid black;
  max-height: 50px;
  max-width: 50px;
  height: 35px;
  width: 35px;
  opacity: 1.0;
`;
*/

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

  constructor(props) {
    super(props);
  }

  render() {
    const key ='tile' + this.props.x + ',' + this.props.y;

    if (this.props.isPlayerLocation) {
      return (
        <PlayerIcon key={key}/>
      );
    } else if (this.props.isNPCLocation) {
      console.log('rendering npc here', this.props.x, this.props.y, this.props.npcIcon);
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

  if (state.npcs) {
    const npcImmutables = state.npcs.getIn(['npcs']);
    if (npcImmutables) {
      npcImmutables.forEach(npc => {
        const hitPoints = npc.get('hitPoints');
        const npcLocation = npc.get('point');
        // if the npc is alive, see if it occupies this tile
        if (hitPoints > 0 &&
          ownProps.x === npcLocation.get('x') &&
          ownProps.y === npcLocation.get('y')) {
          console.log('we have an npc', npc.get('name'), 'in', ownProps.x, ownProps.y);
          npcIcon = npc.get('icon');
          console.log(`the npc icon is ${npcIcon}`);
          isNpcLocation = true;
        }
      });
    }
  }
  return {
    tile: state.grid[ownProps.y][ownProps.x],
    isPlayerLocation:
    ownProps.x === state.player.getIn(['point']).get('x') &&
    ownProps.y === state.player.getIn(['point']).get('y'),
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
