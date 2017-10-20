import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import { Form, Button, Segment } from 'semantic-ui-react';
import * as actionCreators from '../state/reducers/player/playerActionCreators';

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
    return (
      <Segment textAlign="left">
        <h3>{this.props.player.name} Stats</h3>
        <Form onSubmit={this.handleOnSubmit}>
          <Form.Input label="Player" type="text" focus value={this.state.playerName} onChange={this.handleNameChange}/>
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    );
  }

  handleNameChange(event) {
    this.setState({playerName: event.target.value});
  }

  handleOnSubmit(submitData) {
    this.props.dispatch(
      actionCreators.updatePlayerInfo({ name: this.state.playerName }));
    submitData.preventDefault();
    return false;
  }
}

PlayerInfoPanel.propTypes = {
  player: PropTypes.object,
  playerName: PropTypes.string,
  dispatch: PropTypes.func
};

PlayerInfoPanel.displayName = 'PlayerInfoPanel';

function mapStateToProps(state) {
  return {
    player: state.player
  };
}

export default connect(mapStateToProps)(PlayerInfoPanel);
