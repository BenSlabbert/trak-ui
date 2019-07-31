import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from "lodash";

let LineChart = require("react-chartjs").Line;

class Product extends Component {
  componentDidMount() {
    const { match, fetchProduct } = this.props;
    let productId = match.params.productId;
    fetchProduct(productId);
  }

  render() {
    const { history, product } = this.props;

    return (
      <div>
        <div className="row" />

        {product && product.product ? (
          <div>
            <div className="row">
              <h3>{product.product.name}</h3>
              <h6>Current Price: {product.product.price}</h6>
            </div>

            <div className="row">
              <div className="col s8 m8 l8">
                <img
                  src={product.product.imageUrl}
                  alt="product"
                  className="responsive-img hoverable center-block center center-align"
                  style={{ width: "200px", height: "200px" }}
                  onClick={() =>
                    window.open(product.product.productUrl, "_blank")
                  }
                />
              </div>

              <div className="col s4 m4 l4">
                <table>
                  <thead>
                    <tr>
                      <td>Brand</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Link to={`/brand/${product.product.brand.id}`}>
                          {product.product.brand.name}
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table>
                  <thead>
                    <tr>
                      <td>Categories</td>
                    </tr>
                  </thead>
                  <tbody>
                    {_.map(product.product.categories, c => (
                      <tr key={c.id}>
                        <td key={c.id}>
                          <Link to={`/category/${c.id}`}>{c.name}</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="row">
              <table>
                <thead>
                  <tr>
                    <td className="center">Min Price</td>
                    <td className="center">Mean Price</td>
                    <td className="center">Max Price</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="center">{product.stats.minPrice}</td>
                    <td className="center">{product.stats.meanPrice}</td>
                    <td className="center">{product.stats.maxPrice}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="row col s12 m12 l12">
              <LineChart
                data={{
                  labels: product.stats.chartData.labels.slice(0, 5),
                  datasets: _.map(
                    product.stats.chartData.dataSets.slice(0, 5),
                    l => {
                      return {
                        data: l.dataList,
                        ...l
                      };
                    }
                  )
                }}
                width="1300"
                height="300"
              />
            </div>
          </div>
        ) : null}

        <button onClick={() => history.goBack()} className="btn">
          back
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
  err: PropTypes.object
};

function mapStateToProps({ error, data }) {
  return {
    err: error,
    product: data && data.product ? data.product : undefined
  };
}

export default connect(
  mapStateToProps,
  actions
)(withRouter(Product));
