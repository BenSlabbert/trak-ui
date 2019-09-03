import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import * as actions from "../../redux/actions";

class Deal extends Component {
  componentDidMount() {
    const { match, fetchDeal, clearAllErrors } = this.props;
    clearAllErrors();
    fetchDeal(match.params.dealId, 1);
  }

  componentWillUnmount() {
    this.props.clearAllErrors();
  }

  notifyError = (msg) => toast.error(msg, { position: "top-center" });

  render() {
    const { deal, err, clearAllErrors } = this.props;
    console.log(deal);

    if (err && err.message) {
      this.notifyError(err.message);
      clearAllErrors();
    }

    return <div>deal</div>;
  }
}

Deal.propTypes = {
  clearAllErrors: PropTypes.func.isRequired,
  fetchDeal: PropTypes.func.isRequired,
  deal: PropTypes.object,
  match: PropTypes.object.isRequired
};

Deal.defaultProps = {
  deal: null
};

function mapStateToProps({ error, data }) {
  return {
    deal: data && data.deal ? data.deal : null,
    err: error
  };
}

export default connect(
  mapStateToProps,
  actions
)(Deal);
