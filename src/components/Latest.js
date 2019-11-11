import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LatestItem from "./LatestItem";
import * as actions from "../redux/actions";

const showLatest = (p) => _.map(p, (l) => <LatestItem key={l.productUrl} item={l} />);

const hasLatest = (d) => d && d.latest && d.latest.productsList;

class Latest extends Component {
  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {
    const { data, isLoading } = this.props;

    return (
      <div>
        <h5>Latest Products</h5>

        <div className="row">
          {isLoading ? (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ) : undefined}
        </div>

        <div className="row">
          {hasLatest(data) ? showLatest(data.latest.productsList) : undefined}
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
    data,
    isLoading: data && data.isLoading ? data.isLoading : false
  };
}

export default connect(
  mapStateToProps,
  actions
)(Latest);
