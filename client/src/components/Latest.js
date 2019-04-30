import React, { Component } from "react";
import _ from "lodash";
import LatestItem from "./LatestItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";

class Latest extends Component {
  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <h5>Latest Products</h5>

        <div className="row">
          {data && data.latest && data.latest.productsList
            ? _.map(data.latest.productsList, l => (
                <LatestItem key={l.productUrl} item={l} />
              ))
            : undefined}
        </div>
      </div>
    );
  }
}

Latest.propTypes = {
  fetchLatestProducts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  err: PropTypes.object
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    data
  };
}

export default connect(
  mapStateToProps,
  actions
)(Latest);
