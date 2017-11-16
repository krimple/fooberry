import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Label, Icon, Form, Button, Segment } from 'semantic-ui-react';
import { playerActionCreators } from '../redux';

class PlayerInfoPanel extends Component {
  constructor(props) {
    super(props);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      playerName: this.props.player.name
    });
  }

  render() {
    return (
      <Segment textAlign="left">
        <h3>{this.props.player.name} Settings</h3>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Input label="Player" type="text"
            focus value={this.state.playerName}
            onChange={this.handleNameChange}/>
          <Button type="submit">Submit</Button>
        </Form>
        <h3>Stats</h3>
        <Label>
          <Icon name='heartbeat'> Strength</Icon> {this.props.playerStrength}
        </Label>
      </Segment>
    );
  }

  handleNameChange(event) {
    this.setState({playerName: event.target.value});
  }

  handleOnSubmit(submitData) {
    this.props.dispatch(
      playerActionCreators.updatePlayerInfo({ name: this.state.playerName }));
    submitData.preventDefault();
    return false;
  }
}

PlayerInfoPanel.propTypes = {
  player: PropTypes.object,
  playerName: PropTypes.string,
  playerStrength: PropTypes.number,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return {
    player: state.player,
    playerStrength: state.player.hitPoints
  };
}

export default connect(mapStateToProps)(PlayerInfoPanel);
