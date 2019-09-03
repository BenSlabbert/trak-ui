import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../../redux/actions";
import LatestItem from "../LatestItem";
import Carousel from "../pagination/Carousel";

const showLatest = (p) => _.map(p, (l) => <LatestItem key={l.productUrl} item={l} />);

class DailyDeals extends Component {
  componentDidMount() {
    this.props.fetchDailyDeals();
  }

  render() {
    const { data, isLoading, fetchDailyDeals } = this.props;

    return (
      <div>
        <div className="row">
          <h5 className="left">Daily Deals</h5>
          {data && data.pageResponse ? <Carousel getPage={fetchDailyDeals} pr={data.pageResponse} /> : undefined}
        </div>

        <div className="row">
          {isLoading ? (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ) : undefined}
        </div>

        <div className="row">
          {data && data.products ? showLatest(data.products) : undefined}
        </div>
      </div>
    );
  }
}

DailyDeals.propTypes = {
  fetchDailyDeals: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  err: PropTypes.object
};

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
