import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as actions from "../../redux/actions";
import LatestItem from "../LatestItem";
import Carousel from "../pagination/Carousel";

const showProducts = (products) => {
  return (
    <div className="row">
      {products.map((p) => (
        <LatestItem key={p.productUrl} item={p} />
      ))}
    </div>
  );
};

class Deal extends Component {
  componentDidMount() {
    const { dealId, fetchDeal, clearAllErrors } = this.props;
    clearAllErrors();
    fetchDeal(1, dealId);
  }

  componentWillUnmount() {
    this.props.clearAllErrors();
  }

  notifyError = (msg) => toast.error(msg, { position: "top-center" });

  render() {
    const {
      deal, err, clearAllErrors, fetchDeal, dealId, isLoading
    } = this.props;

    if (err && err.message) {
      this.notifyError(err.message);
      clearAllErrors();
    }

    return (
      <div>
        <div className="row">
          <h5 className="left">{deal ? deal.promotion.name : "Deal"}</h5>
          {!(deal && deal.pageResponse) ? undefined : (
            <Carousel
              getPage={fetchDeal}
              pr={deal.pageResponse}
              getPageAdditionalArgs={dealId}
            />
          )}
        </div>

        <div className="row">
          {isLoading ? (
            <div className="progress">
              <div className="indeterminate" />
            </div>
          ) : undefined}
        </div>

        {deal && deal.productsList ? showProducts(deal.productsList) : null}
      </div>
    );
  }
}

Deal.propTypes = {
  clearAllErrors: PropTypes.func.isRequired,
  fetchDeal: PropTypes.func.isRequired,
  dealId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  deal: PropTypes.object
};

Deal.defaultProps = {
  deal: null
};

function mapStateToProps({ error, data }, { match }) {
  return {
    deal: data && data.deal ? data.deal : null,
    dealId: match.params.dealId,
    err: error,
    isLoading: data && data.isLoading ? data.isLoading : false
  };
}

export default connect(
  mapStateToProps,
  actions
)(Deal);
