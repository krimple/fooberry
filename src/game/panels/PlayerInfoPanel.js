import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as actionCreators from '../state/gameActionCreators';
import PanelContainer from './PanelContainer';

class PlayerInfoPanel extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      playerName: this.props.player.get('name')
    });

  }

  render() {
    console.log(this);
    return (
      <PanelContainer>
        <h3>{this.props.playerName} Stats</h3>
        <form onSubmit={this.handleOnSubmit}>
          <label>Player Name</label>
          <input id="name"
            value={this.state.playerName}
            onChange={this.handleNameChange}/>
          <button type="submit">Submit</button>
        </form>
      </PanelContainer>
    );
  }

  handleNameChange(event) {
    this.setState({playerName: event.target.value});
  }

  handleOnSubmit(submitData) {
    this.props.dispatch(
      actionCreators.updatePlayerInfo({
        player: Object.assign({}, this.props.player.toJS(), {
          name: this.state.playerName
        })
      }));
    submitData.preventDefault();
    return false;
  }
}

PlayerInfoPanel.propTypes = {
  player: PropTypes.object,
  playerName: PropTypes.string,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    player: state.game.getIn(['atoms', 'player'])
  };
}

export default connect(mapStateToProps)(PlayerInfoPanel);
