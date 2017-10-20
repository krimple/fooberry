import React  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

const TileIcon = styled.img`
  border: 1px solid white;
  height: 30px;
  width: 30px;
  max-height: 50px;
  max-width: 50px;
  opacity: .2;
`;

const PlayerIcon = styled.img`
  background-image: url(icons/delapouite/originals/svg/walking-scout.svg);
  border: 1px solid black;
  height: 30px;
  width: 30px;
  max-height: 50px;
  max-width: 50px;
  opacity: 1.0;
`;

const NPCThiefIcon = styled.img`
  background-image: url(icons/cathelineau/originals/svg/bad-gnome.svg);
  border: 1px solid black;
  max-height: 50px;
  max-width: 50px;
  height: 30px;
  width: 30px;
  opacity: 1.0;
`;

class GameTile extends React.PureComponent {

  constructor(props) {
    super(props);
    console.log('constructing new tile');
    this.hover = this.hover.bind(this);
    this.endHover = this.endHover.bind(this);
  }

  /*  shouldComponentUpdate(nextProps) {
    if (this.props.playerLocation.x === this.props.tile.x &&
        this.props.playerLocation.y === this.props.tile.y) {
      console.log(`tile ${this.props.tile.x},${this.props.tile.y} has a player`);
      console.log(this.props);
      console.dir(nextProps);
    }
    // if we have a player on our tile and they have moved - update
    if (this.props.playerLocation.x === this.props.tile.x &&
        this.props.playerLocation.y === this.props.tile.y &&
        nextProps.playerLocation.x !== this.props.tile.x &&
        nextProps.playerLocation.y !== this.props.tile.y) {
      console.log(`player moved away from ${this.props.tile.x},${this.props.tile.y}`);
      return true;
    }

    // if we don't have a player on our tile and they moved here - update
    if (this.props.playerLocation.x !== this.props.tile.x &&
        this.props.playerLocation.y !== this.props.tile.y &&
        nextProps.playerLocation.x === this.props.tile.x &&
        nextProps.playerLocation.y === this.props.tile.y) {
      console.log(`player moved to ${nextProps.playerLocation.x},${nextProps.playerLocation.y}`);
      return true;
    }

    // if we have a thief on our tile and they have moved - update
    if (this.props.thiefLocation.x === this.props.tile.x &&
        this.props.thiefLocation.y === this.props.tile.y &&
        nextProps.thiefLocation.x !== this.props.tile.x &&
        nextProps.thiefLocation.y !== this.props.tile.y) {
      console.log(`thief moved away from ${this.props.tile.x},${this.props.tile.y}`);
      return true;
    }

    // if we don't have a thief on our tile and they moved here - update
    if (this.props.thiefLocation.x !== this.props.tile.x &&
        this.props.thiefLocation.y !== this.props.tile.y &&
        nextProps.thiefLocation.x === this.props.tile.x &&
        nextProps.thiefLocation.y === this.props.tile.y) {
      console.log(`thief moved to ${this.props.tile.x},${this.props.tile.y}`);
      return true;
    }

    return false;

  }
*/
  render() {
    const key ='tile' + this.props.x + ',' + this.props.y;

    console.log(`rendering ${key}`);
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
