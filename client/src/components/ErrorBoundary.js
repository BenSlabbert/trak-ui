import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import * as actions from "../actions";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    this.props.reportError({ error, info });
  }

  render() {
    const { err } = this.props;
    const { hasError } = this.state;

    // todo display error
    console.log(err);

    if (hasError) {
      return (
        <div className="container">
          <div className="container">
            <h6>We ran into an error!</h6>

            <button className="btn" onClick={() => (window.location = "/hex")}>
              Take me Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  reportError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  err: PropTypes.object
};

function mapStateToProps({ error }) {
  return {
    err: error
  };
}

export default connect(
  mapStateToProps,
  actions
)(ErrorBoundary);
