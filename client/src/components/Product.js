import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "../actions";
import _ from 'lodash';

let LineChart = require("react-chartjs").Line;

class Product extends Component {

  componentDidMount() {
    const { match, fetchProduct } = this.props;
    let productId = match.params.productId;
    fetchProduct(productId);
  }

  render() {

    const { history, product } = this.props;

    return <div>

      <div className='row'/>

      {product && product.product ? <div>
        <div className='row col s12 m12 l12'>
          <img
              src={product.product.imageUrl}
              alt='product image'
              className='responsive-img hoverable center-block'
              style={{ width: '200px', height: '200px' }}
              onClick={() => window.open(product.product.productUrl, "_blank")}
          />
        </div>

        <div className='row'>
          <table>
            <thead>
            <tr>
              <td className='center'>Min Price</td>
              <td className='center'>Mean Price</td>
              <td className='center'>Max Price</td>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td className='center'>{product.stats.minPrice}</td>
              <td className='center'>{product.stats.meanPrice}</td>
              <td className='center'>{product.stats.maxPrice}</td>
            </tr>
            </tbody>
          </table>
        </div>

        <div className='row col s12 m12 l12'>
          <LineChart data={{
            labels: product.stats.chartData.labelsList.slice(0, 5),
            datasets: _.map(product.stats.chartData.dataSetsList.slice(0, 5), l => {
              return {
                data: l.dataList,
                ...l
              }
            })
          }} width="1300" height="300"/>
        </div>

      </div> : null}

      <button
          onClick={() => history.goBack()}
          className='btn'
      >
        back
      </button>
    </div>;
  }
}

Product.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  product: PropTypes.object,
  isLoading: PropTypes.bool,
  err: PropTypes.object

};

function mapStateToProps( { error, data } ) {
  return {
    err: error,
    product: data && data.product ? data.product : undefined
  }
}

export default connect(mapStateToProps, actions)(withRouter(Product));
