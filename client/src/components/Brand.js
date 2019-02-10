import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Brand extends Component {

  componentDidMount() {
    const { match } = this.props;
    let brandId = match.params.brandId;
    console.log(brandId);
  }

  render() {

    const { history } = this.props;

    return <div>

      <h3>Brand: some brand name</h3>

      <button
          onClick={() => history.goBack()}
          className='btn'
      >
        back
      </button>
    </div>
  }
}

Brand.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    product: data && data.product ? data.product : undefined
  }
}

export default connect(mapStateToProps, actions)(withRouter(Brand));
