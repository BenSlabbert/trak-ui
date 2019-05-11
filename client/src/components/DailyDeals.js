import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LatestItem from "./LatestItem";
import _ from "lodash";

class DailyDeals extends Component {
  componentDidMount() {
    this.props.fetchDailyDeals();
  }

  render() {
    const {data, isLoading} = this.props;

    return <div>
      <h5>Daily Deals</h5>

      <div className="row">
        {isLoading ? (
          <div className="progress">
            <div className="indeterminate" />
          </div>
        ) : (
          undefined
        )}
      </div>

      <div className="row">
        {data && data.productsList
          ? _.map(data.productsList, l => (
            <LatestItem key={l.productUrl} item={l} />
          ))
          : undefined}
      </div>

    </div>;
  }
}

function mapStateToProps({ error, data }) {


  return {
    data: data && data.dailyDeals ? data.dailyDeals : undefined,
    err: error,
    isLoading: data && data.isLoading ? data.isLoading : false
  };
}

export default connect(
  mapStateToProps,
  actions
)(DailyDeals);
