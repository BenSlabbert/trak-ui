import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions";
import { SEARCH_FORM } from "../util/forms";
import FORM_FIELDS from "./searchFormFields";
import TextInput from "./forms/TextInput";
import _ from "lodash";
import { Link } from "react-router-dom";

class Search extends Component {

  renderFields(FORM_FIELDS) {
    return _.map(FORM_FIELDS, field => {
      return <Field className='input-field'
                    key={field.name}
                    component={TextInput}
                    {...field}
      />;
    });
  }

  searchProduct() {

    const {
      searchForm,
      fetchSearchProducts,
      fetchSearchBrands,
      fetchSearchCategories
    } = this.props;

    if (searchForm && searchForm.values && searchForm.values.search) {
      fetchSearchProducts(searchForm.values.search);
      fetchSearchBrands(searchForm.values.search);
      fetchSearchCategories(searchForm.values.search);
    }
  }

  render() {

    const { handleSubmit, search, history, isLoading } = this.props;

    return <div>

      <form onSubmit={handleSubmit(this.searchProduct.bind(this))}>

        <div className='row'>

          {isLoading ?
            <div className="progress">
              <div className="indeterminate"/>
            </div>
            : undefined}

          <h5>Search</h5>

          <div className='col s9 m9 l9'>
            {this.renderFields(FORM_FIELDS)}
          </div>

          <div className='col s3 m3 l3'>
            <button
              disabled={isLoading}
              className='teal btn-flat right white-text'
              type='submit'
            >
              search
            </button>
          </div>

        </div>

        <div className='row'>
          <div className='col 4s 4m 4l'>
            {search && search.searchProducts ? <div>
              <h6>Products</h6>
              {_.map(search.searchProducts.resultsList, l => <div key={l.id}>
                <Link to={`/product/${l.id}`}>
                  {this.showName(l.name)}
                </Link>
              </div>)}
            </div> : undefined}
          </div>

          <div className='col 4s 4m 4l'>
            {search && search.searchBrands ? <div>
              <h6>Brands</h6>
              {_.map(search.searchBrands.resultsList, l => <div key={l.id}>
                <Link to={`/brand/${l.id}`}>
                  {this.showName(l.name)}
                </Link>
              </div>)}
            </div> : undefined}
          </div>

          <div className='col 4s 4m 4l'>
            {search && search.searchCategories ? <div>
              <h6>Categories</h6>
              {_.map(search.searchCategories.resultsList, l => <div key={l.id}>
                <Link to={`/category/${l.id}`}>
                  {this.showName(l.name)}
                </Link>
              </div>)}
            </div> : undefined}
          </div>
        </div>
      </form>

      <button
        onClick={() => history.goBack()}
        className='btn'
      >
        back
      </button>
    </div>;
  }

  showName(name) {
    return name.length > 60 ? name.substring(0, 60) + "..." : name;
  }
}

function mapStateToProps({ error, form, search }) {

  let searchForm = form[SEARCH_FORM];

  return {
    search,
    err: error,
    isLoading: search && search.isLoading,
    searchForm: searchForm ? searchForm : null
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: SEARCH_FORM
})(Search));
