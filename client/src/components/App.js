import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";
import Latest from "./Latest";
import Product from "./Product";
import Search from "./Search";

class App extends Component {

  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {

    const { history, match } = this.props;

    return <BrowserRouter>
      <div className='container'>
        <nav>
          <div className='nav-wrapper'>
            <a href='/' className='brand-logo center'>Trak</a>
          </div>
        </nav>

        <Search/>

        <Route
            exact
            path='/'
            component={Latest}
        />

        <Route
            exact
            path='/product/:productId'
            match={match}
            history={history}
            component={Product}
        />
      </div>
    </BrowserRouter>;
  }
}

App.propTypes = {
  fetchLatestProducts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  err: PropTypes.object

};

function mapStateToProps( { error } ) {
  return {
    err: error
  }
}

export default connect(mapStateToProps, actions)(App);
