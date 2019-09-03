import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { Link } from "react-router-dom";
import Carousel from "../pagination/Carousel";
import * as actions from "../../redux/actions";

class AllDeals extends Component {
  componentDidMount() {
    const { clearAllErrors, fetchAllDeals } = this.props;
    clearAllErrors();
    fetchAllDeals();
  }

  componentWillUnmount() {
    this.props.clearAllErrors();
  }

  notifyError = (msg) => toast.error(msg, { position: "top-center" });

  render() {
    const {
      isLoading, data, err, fetchAllDeals
    } = this.props;

    if (err && err.message) {
      this.notifyError(err.message);
      this.props.clearAllErrors();
    }

    return (
      <div>
        <div className="row">
          <h5 className="left">All Deals</h5>
          {!(data && data.pageResponse) ? undefined : <Carousel getPage={fetchAllDeals} pr={data.pageResponse} />}
        </div>

        <div>
          {isLoading ? (
            <div className="row progress">
              <div className="indeterminate" />
            </div>
          ) : undefined}
        </div>

        <div>
          <table>
            <thead>
              <tr>
                <td>Promotion</td>
                <td>Created</td>
              </tr>
            </thead>
            <tbody>
              {data && data.promotions
                ? data.promotions.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link to={`/all-deals/${p.id}`}>{p.name}</Link>
                    </td>
                    <td>
                      {moment(Number(p.created)).format(
                        "YYYY-MM-DD HH:mm:SS"
                      )}
                    </td>
                  </tr>
                ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

AllDeals.propTypes = {
  clearAllErrors: PropTypes.func.isRequired,
  fetchAllDeals: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  err: PropTypes.object
};

AllDeals.defaultProps = {
  isLoading: false,
  data: null,
  err: null
};

function mapStateToProps({ error, data }) {
  return {
    data: data && data.allDeals ? data.allDeals : undefined,
    err: error,
    isLoading: data && data.isLoading ? data.isLoading : false
  };
}

export default connect(
  mapStateToProps,
  actions
)(AllDeals);
