import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LatestItem from "./LatestItem";
import _ from "lodash";

const previousPage = (pr, fetchDailyDeals) => {
  if (pr.isFirstPage) {
    return;
  }

  fetchDailyDeals(Number(pr.currentPageNumber) - 1);
};

const nextPage = (pr, fetchDailyDeals) => {
  if (pr.isLastPage) {
    return;
  }

  fetchDailyDeals(Number(pr.currentPageNumber) + 1);
};

const showPage = (pr, fetchDailyDeals) => {
  return <ul className="right pagination">
    <li className={pr.isFirstPage ? "disabled" : "waves-effect"}>
      <a onClick={() => previousPage(pr, fetchDailyDeals)}><i className="material-icons">chevron_left</i></a>
    </li>
    <li className="active"><a>{pr.currentPageNumber}</a></li>
    <li className="inactive"><a>...</a></li>
    <li className="inactive"><a>{pr.lastPageNumber}</a></li>
    <li className={pr.isLastPage ? "disabled" : "waves-effect"}>
      <a onClick={() => nextPage(pr, fetchDailyDeals)}><i className="material-icons">chevron_right</i></a>
    </li>
  </ul>
};

const showLatest = (p) => {
  return _.map(p, l => <LatestItem key={l.productUrl} item={l}/>);
};

class DailyDeals extends Component {
  componentDidMount() {
    this.props.fetchDailyDeals();
  }

  render() {
    const { data, isLoading } = this.props;

    return <div>
      <div className="row">
        <h5 className="left">Daily Deals</h5>
        {data && data.pageResponse ? showPage(data.pageResponse, this.props.fetchDailyDeals) : undefined}
      </div>

      <div className="row">
        {isLoading ? <div className="progress">
          <div className="indeterminate"/>
        </div> : undefined}
      </div>

      <div className="row">
        {data && data.products ? showLatest(data.products) : undefined}
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
