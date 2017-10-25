import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 25px;
  width: 25px;
  max-height: 50px;
  max-width: 50px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 25px;
  width: 25px;
  max-height: 50px;
  max-width: 50px;
  opacity: 1.0;
`;

const NPCThiefIcon = styled.img`
  background-image: url(icons/cathelineau/originals/svg/bad-gnome.svg);
  border: 1px solid black;
  max-height: 50px;
  max-width: 50px;
  height: 25px;
  width: 25px;
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
    } else if (this.props.isThiefLocation) {
      return (
        <NPCThiefIcon key={key}/>
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
  return {
    tile: state.grid[ownProps.y][ownProps.x],
    isPlayerLocation:
      ownProps.x === state.player.getIn(['point']).get('x') &&
      ownProps.y === state.player.getIn(['point']).get('y'),

    isThiefLocation:
      ownProps.x === state.npcs.getIn(['thief', 'point']).get('x') &&
      ownProps.y === state.npcs.getIn(['thief', 'point']).get('y')
  };
}

GameTile.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  tile: PropTypes.object,
  isPlayerLocation: PropTypes.bool,
  isThiefLocation : PropTypes.bool
};

export default connect(mapStateToProps)(GameTile);
