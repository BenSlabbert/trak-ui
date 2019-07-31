import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import LatestItem from "./LatestItem";

class Brand extends Component {
  componentDidMount() {
    const { match, fetchBrand } = this.props;
    let brandId = match.params.brandId;
    fetchBrand(brandId);
  }

  render() {
    const { history, brand } = this.props;

    return (
      <div>
        <h3>Brand: {brand && brand.name ? brand.name : undefined}</h3>

        <div className="row">
          {brand && brand.products
            ? _.map(brand.products, l => (
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
  match: PropTypes.object.isRequired
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    brand: data && data.brand ? data.brand : undefined
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Brand));
