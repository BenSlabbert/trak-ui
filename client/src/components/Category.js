import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

class Category extends Component {

  componentDidMount() {
    const { match } = this.props;
    let categoryId = match.params.categoryId;
    console.log(categoryId);
  }

  render() {

    const { history } = this.props;

    return <div>

      <h3>Category: some category name</h3>

      <button
          onClick={() => history.goBack()}
          className='btn'
      >
        back
      </button>
    </div>
  }
}

Category.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    product: data && data.product ? data.product : undefined
  }
}

export default connect(mapStateToProps, actions)(withRouter(Category));
