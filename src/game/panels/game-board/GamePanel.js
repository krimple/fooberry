import React, {Component} from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GameBoard from './GameBoard';
import * as actionCreators from '../../state/gameActionCreators';

const PanelSection = styled.section`
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 100px;
  vertical-align: top;
  float: right;
`;
const Heading = styled.h3`
  font-family: cursive;
  font-size: 3em;
  text-align: center;
`;

class GamePanel extends Component {

  constructor(props) {
    super(props);
    this.processKeyStroke = this.processKeyStroke.bind(this);
  }
  
  render() {
    return (
        <div>
          <PanelSection>
            <Heading>FOOBERRY - Player { this.props.playerName }</Heading>
            <GameBoard />
          </PanelSection>
        </div>
    );
  }

  componentDidMount() {
    document.addEventListener('keydown', this.processKeyStroke);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.processKeyStroke);
  }

  processKeyStroke(event) {
    let direction;
    switch (event.key) {
      case 'j':
        direction = 'west';
        break;

      case 'k':
        direction = 'north';
        break;

      case 'l':
        direction = 'south';
        break;

      case ';':
        direction = 'east';
        break;
      default:
        console.log(`unprocessed keystroke`, event.key);
    }
    if (direction) {
      this.props.dispatch(actionCreators.moveActionCreator(direction));
    }
  }
}

function mapStateToProps(state) {
  return {
    playerName: state.game.getIn(['atoms', 'player', 'name'])
  };
}
export default connect(mapStateToProps)(GamePanel);
