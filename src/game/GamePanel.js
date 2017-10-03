import React, {Component} from 'react';
import GameBoard from './GameBoard';
import ControlPanel from './ControlPanel';
import './GamePanel.css';
import styled from 'styled-components';

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

export default class GamePanel extends Component {
  render() {
    return (
        <div>
          <ControlPanel />
          <PanelSection>
            <Heading>FOOBERRY</Heading>
            <GameBoard />
          </PanelSection>
        </div>
    );
  }
}
