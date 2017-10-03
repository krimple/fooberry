import React, {Component} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.section`
  padding-top: 70px;
  padding-left: 100px;
  vertical-align: top;
  float: left;
  padding-right: 50px;
  width: auto;
`;

class ControlPanel extends Component {

  render() {
    const moves = this.props.moves
        .slice(0, 8)
        .map((move, idx) => {
      return <div key={'moves-' + idx}>{move}</div>;
    });
    return (
        <Wrapper>
          <h1>Control Panel</h1>
          <hr/>
          <h3>Moves</h3>
          {moves}
        </Wrapper>
    );

  }
}

function mapStateToProps(state) {
  return {
    moves: state.get('moves').toJS()
  };
}

export default connect(mapStateToProps)(ControlPanel);
