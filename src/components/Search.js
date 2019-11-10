import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import _ from "lodash";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions";
import { SEARCH_FORM } from "../util/forms";
import FORM_FIELDS from "./searchFormFields";
import TextInput from "./forms/TextInput";

const showName = (n) => (n.length > 60 ? `${n.substring(0, 60)}...` : n);

const renderFields = () => _.map(FORM_FIELDS, (field) => (
  <Field
    className="input-field"
    key={field.name}
    component={TextInput}
    {...field}
  />
));

class Search extends Component {
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
    const {
      handleSubmit, search, history, isLoading
    } = this.props;

    if (search && search.searchProducts) {
      return (
        <div>
          <form onSubmit={handleSubmit(this.searchProduct.bind(this))}>
            <div className="row">
              {isLoading ? (
                <div className="progress">
                  <div className="indeterminate" />
                </div>
              ) : undefined}

              <h5>Search</h5>

              <div className="col s9 m9 l9">{renderFields()}</div>

              <div className="col s3 m3 l3">
                <button
                  disabled={isLoading}
                  className="teal btn-flat right white-text"
                  type="submit"
                >
                  search
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col 4s 4m 4l">
                {
                  <div>
                    <h6>Products</h6>
                    {_.map(search.searchProducts.results, (l) => (
                      <div key={l.id}>
                        <Link to={`/product/${l.id}`}>{showName(l.name)}</Link>
                      </div>
                    ))}
                  </div>
                }
              </div>

              <div className="col 4s 4m 4l">
                {search && search.searchBrands ? (
                  <div>
                    <h6>Brands</h6>
                    {_.map(search.searchBrands.results, (l) => (
                      <div key={l.id}>
                        <Link to={`/brand/${l.id}`}>{showName(l.name)}</Link>
                      </div>
                    ))}
                  </div>
                ) : undefined}
              </div>

              <div className="col 4s 4m 4l">
                {search && search.searchCategories ? (
                  <div>
                    <h6>Categories</h6>
                    {_.map(search.searchCategories.results, (l) => (
                      <div key={l.id}>
                        <Link to={`/category/${l.id}`}>{showName(l.name)}</Link>
                      </div>
                    ))}
                  </div>
                ) : undefined}
              </div>
            </div>
          </form>

          <button type="button" onClick={() => history.goBack()} className="btn">
            back
          </button>
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={handleSubmit(this.searchProduct.bind(this))}>
          <div className="row">
            {isLoading ? (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            ) : undefined}

            <h5>Search</h5>

            <div className="col s9 m9 l9">{renderFields()}</div>

            <div className="col s3 m3 l3">
              <button
                disabled={isLoading}
                className="teal btn-flat right white-text"
                type="submit"
              >
                search
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col 4s 4m 4l">{undefined}</div>

            <div className="col 4s 4m 4l">
              {search && search.searchBrands ? (
                <div>
                  <h6>Brands</h6>
                  {_.map(search.searchBrands.results, (l) => (
                    <div key={l.id}>
                      <Link to={`/brand/${l.id}`}>{showName(l.name)}</Link>
                    </div>
                  ))}
                </div>
              ) : undefined}
            </div>

            <div className="col 4s 4m 4l">
              {search && search.searchCategories ? (
                <div>
                  <h6>Categories</h6>
                  {_.map(search.searchCategories.results, (l) => (
                    <div key={l.id}>
                      <Link to={`/category/${l.id}`}>{showName(l.name)}</Link>
                    </div>
                  ))}
                </div>
              ) : undefined}
            </div>
          </div>
        </form>

        <button type="button" onClick={() => history.goBack()} className="btn">
          back
        </button>
      </div>
    );
  }
}

function mapStateToProps({ error, form, search }) {
  const searchForm = form[SEARCH_FORM];

  return {
    search,
    err: error,
    isLoading: search && search.isLoading,
    searchForm: searchForm || null
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: SEARCH_FORM
  })(Search)
);
