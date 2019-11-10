import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { ADD_PRODUCT_FORM } from "../util/forms";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import _ from "lodash";
import FORM_FIELDS from "./addProductFormFields";
import TextInput from "./forms/TextInput";

const renderFields = () => _.map(FORM_FIELDS, (field) => (
  <Field
    className="input-field"
    key={field.name}
    component={TextInput}
    {...field}
  />
));

class AddProduct extends Component {
  addProduct() {
    const {
      addProductForm,
      addProduct
    } = this.props;

    if (addProductForm && addProductForm.values && addProductForm.values.url) {
      addProduct(addProductForm.values.url);
    }
  }

  render() {
    const {
      handleSubmit, addProduct, history, isLoading
    } = this.props;

    console.log('addProduct', addProduct);

    return (
      <div>
        <form onSubmit={handleSubmit(this.addProduct.bind(this))}>
          <div className="row">
            {isLoading ? (
              <div className="progress">
                <div className="indeterminate" />
              </div>
            ) : undefined}

            <h5>Add Product</h5>

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
        </form>

        <button type="button" onClick={() => history.goBack()} className="btn">
          back
        </button>
      </div>
    );
  }
}

function mapStateToProps({ error, form, data }) {
  const addProductForm = form[ADD_PRODUCT_FORM];

  return {
    addProduct: data && data.addProduct ? data.addProduct : null,
    err: error,
    isLoading: data && data.isLoading,
    addProductForm: addProductForm || null
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  reduxForm({
    form: ADD_PRODUCT_FORM
  })(AddProduct)
);
