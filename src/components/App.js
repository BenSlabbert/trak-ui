import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import Latest from "./Latest";
import Product from "./Product";
import Search from "./Search";
import DailyDeals from "./deals/DailyDeals";
import Brand from "./Brand";
import Category from "./Category";
import AllDeals from "./deals/AllDeals";
import Deal from "./deals/Deal";
import AddProduct from "./AddProduct";

class App extends Component {
  componentDidMount() {
    this.props.fetchLatestProducts();
  }

  render() {
    const { history, match } = this.props;

    return (
      <BrowserRouter>
        <div className="container">
          <nav>
            <div className="nav-wrapper">
              <div className="brand-logo left">
                <Link to="/">Trak</Link>
              </div>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <Link className="right" to="/add">
                      Add
                  </Link>
                  <Link className="right" to="/search">
                      Search
                  </Link>
                  <Link className="right" to="/daily-deals">
                      Daily Deals
                  </Link>
                  <Link className="right" to="/all-deals">
                      All Deals
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route exact path="/" component={Latest} />
          <Route exact path="/add" history={history} component={AddProduct} />
          <Route exact path="/search" history={history} component={Search} />
          <Route
            exact
            path="/daily-deals"
            history={history}
            component={DailyDeals}
          />
          <Route
            exact
            path="/all-deals"
            history={history}
            component={AllDeals}
          />

          <Route
            exact
            path="/all-deals/:dealId"
            history={history}
            component={Deal}
          />

          <Route
            exact
            path="/product/:productId"
            match={match}
            history={history}
            component={Product}
          />

          <Route
            exact
            path="/brand/:brandId"
            match={match}
            history={history}
            component={Brand}
          />

          <Route
            exact
            path="/category/:categoryId"
            match={match}
            history={history}
            component={Category}
          />
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchLatestProducts: PropTypes.func.isRequired,
  err: PropTypes.object
};

function mapStateToProps({ error }) {
  return {
    err: error
  };
}

export default connect(
  mapStateToProps,
  actions
)(App);
