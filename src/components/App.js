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
        <footer className="page-footer container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Trak is OpenSource!</h5>
              <p className="grey-text text-lighten-4">
                This project is inspired by: <a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://camelcamelcamel.com/">camelcamelcamel.com</a>
              </p>
            </div>
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
              <ul>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/BenSlabbert/trak-gateway">trak-gateway (Golang backend)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/BenSlabbert/trak-ui">trak-ui (ReactJS frontend)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/BenSlabbert/trak-gRPC">trak-grpc (data definitions)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/nsqio/nsq">nsq (queue)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/valeriansaliou/sonic">sonic (natural language search)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/mariadb">mariadb (relational database)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/RedisLabs">redis (cache)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/golang/protobuf">protobuf (message serialization)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/gorilla/mux">gorilla (http handler)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/jinzhu/gorm">gorm (relation db ORM)</a></li>
                <li><a className="grey-text text-lighten-3" rel="noopener noreferrer" target="_blank" href="https://github.com/sirupsen/logrus">logrus (logging)</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              © 2014 No Copyright Text Yet!
              <a className="grey-text text-lighten-4 right" rel="noopener noreferrer" target="_blank" href="https://www.takealot.com">www.takealot.com</a>
            </div>
          </div>
        </footer>
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
