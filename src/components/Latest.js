import React, { Component } from "react";
import _ from "lodash";
import LatestItem from "./LatestItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";

const showLatest = (p) => {
  return _.map(p, l => <LatestItem key={l.productUrl} item={l}/>);
};

const hasLatest = (d) => {
  return d && d.latest && d.latest.products;
};

class Latest extends Component {
  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {
    const { data } = this.props;

    return <div>
      <h5>Latest Products</h5>

      <div className="row">
        {hasLatest(data) ? showLatest(data.latest.products) : undefined}
      </div>
    </div>;
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
