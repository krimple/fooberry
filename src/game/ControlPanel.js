import React, {Component} from 'react';
import {connect} from 'react-redux';
import './ControlPanel.css';

class ControlPanel extends Component {

  render() {
    return (
        <div className="controlPanel">
          <h1>Control Panel</h1>
          <hr/>
        </div>
    );

  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(ControlPanel);
