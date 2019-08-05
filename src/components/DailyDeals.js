import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import LatestItem from "./LatestItem";
import _ from "lodash";

const showPage = (pageResponse) => {
  return <table>
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
        <td>{pageResponse.currentPageNumber}</td>
        <td>{pageResponse.isFirstPage? "Yes": "No"}</td>
        <td>{pageResponse.isLastPage? "Yes" : "NO"}</td>
        <td>{pageResponse.lastPageNumber}</td>
        <td>{pageResponse.pageSize}</td>
        <td>{pageResponse.totalItems}</td>
      </tr>
      </tbody>
    </table>
};

const showLatest = (products) => {
  return _.map(products, l => <LatestItem key={l.productUrl} item={l}/>);
};

class DailyDeals extends Component {
  componentDidMount() {
    this.props.fetchDailyDeals();
  }

  render() {
    const {data, isLoading} = this.props;

    return <div>
      <h5>Daily Deals</h5>

      <div className="row">
        {isLoading ? <div className="progress">
          <div className="indeterminate"/>
        </div> : undefined}
      </div>

      <div className="row">
        {data && data.pageResponse ? showPage(data.pageResponse) : undefined}
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
