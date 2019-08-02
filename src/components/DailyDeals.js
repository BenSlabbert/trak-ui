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
        ) : undefined}
      </div>

      <div className="row">
        {data && data.pageResponse ? (
            <table>
              <thead>
              <tr>
                <td>Page Number</td>
                <td>First Page</td>
                <td>Last Page</td>
                <td>Last page number</td>
                <td>Page size</td>
                <td>Total Items</td>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>{data.pageResponse.currentPageNumber}</td>
                <td>{data.pageResponse.isFirstPage? "Yes": "No"}</td>
                <td>{data.pageResponse.isLastPage? "Yes" : "NO"}</td>
                <td>{data.pageResponse.lastPageNumber}</td>
                <td>{data.pageResponse.pageSize}</td>
                <td>{data.pageResponse.totalItems}</td>
              </tr>
              </tbody>
            </table>
        ) : undefined}
      </div>

      <div className="row">
        {data && data.products
          ? _.map(data.products, l => (
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
