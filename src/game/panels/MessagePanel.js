import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const MessagePanel = (props) => {
  return (
    <Message>{ props.toast }</Message>
  );
};

MessagePanel.propTypes = {
  toast: PropTypes.string
};

function mapStateToProps(state) {
  return {
    toast: state.toast.activeToast
  };
}

export default connect(mapStateToProps)(MessagePanel);
