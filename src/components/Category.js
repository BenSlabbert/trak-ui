import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import _ from "lodash";
import * as actions from "../redux/actions";
import LatestItem from "./LatestItem";

const showLatest = (p) => _.map(p, (l) => <LatestItem key={l.productUrl} item={l} />);

class Category extends Component {
  componentDidMount() {
    const { match, fetchCategory } = this.props;
    const { categoryId } = match.params;
    fetchCategory(categoryId);
  }

  render() {
    const { history, category } = this.props;

    return (
      <div>
        <h3>
            Category:
          {' '}
          {category && category.name ? category.name : undefined}
        </h3>

        <div className="row">
          {category && category.products
            ? showLatest(category.products)
            : undefined}
        </div>

        <button onClick={() => history.goBack()} className="btn">
            back
        </button>
      </div>
    );
  }
}

Category.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    category: data && data.category ? data.category : undefined
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Category));
