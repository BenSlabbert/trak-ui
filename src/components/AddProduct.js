import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { toast } from "react-toastify";
import _ from "lodash";
import { connect } from "react-redux";
import { ADD_PRODUCT_FORM } from "../util/forms";
import * as actions from "../redux/actions";
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
      addProduct,
      history
    } = this.props;

    if (addProductForm && addProductForm.values && addProductForm.values.url) {
      addProduct(addProductForm.values.url, history);
    }
  }

  notifyError = (msg) => toast.error(msg, { position: "top-center" });

  notifyInfo = (msg) => toast.info(msg, { position: "top-center" });

  render() {
    const {
      handleSubmit, err, addProductResp, history, isLoading
    } = this.props;

    if (addProductResp) {
      this.notifyInfo("Successfully added product!");
    }

    if (err) {
      this.notifyError(err.message);
      this.props.clearAllErrors();
    }

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
    addProductResp: data && data.addProductResp ? data.addProductResp : null,
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
