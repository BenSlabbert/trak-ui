import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import * as actions from "../redux/actions";
import LatestItem from "./LatestItem";

class Brand extends Component {
  componentDidMount() {
    const { match, fetchBrand } = this.props;
    const { brandId } = match.params;
    fetchBrand(brandId);
  }

  render() {
    const { history, brand, isLoading } = this.props;

    return (
      <div>
        <div className="row">
          {isLoading ? (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ) : undefined}
        </div>

        <h3>Brand: {brand && brand.name ? brand.name : undefined}</h3>

        <div className="row">
          {brand && brand.productsList
            ? _.map(brand.productsList, (l) => (
              <LatestItem key={l.productUrl} item={l} />
            ))
            : undefined}
        </div>

        <button onClick={() => history.goBack()} className="btn">
            back
        </button>
      </div>
    );
  }
}

Brand.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    brand: data && data.brand ? data.brand : undefined,
    isLoading: data && data.isLoading ? data.isLoading : false
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Brand));
