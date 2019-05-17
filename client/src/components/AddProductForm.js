import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from "../actions";
import { ADD_FORM } from "../util/forms";
import FORM_FIELDS from './addFormFields';
import TextInput from "./forms/TextInput";
import _ from 'lodash';

class AddProductForm extends Component {

  renderFields(FORM_FIELDS) {
    return _.map(FORM_FIELDS, field => {
      return <Field className='input-field'
                    key={field.name}
                    component={TextInput}
                    {...field}
      />;
    });
  }

  addProduct() {

    const {
      addForm,
      addProduct
    } = this.props;

    if (addForm && addForm.values && addForm.values.add) {
      addProduct(addForm.values.add);
    }
  }

  render() {

    const { handleSubmit, data, history, isLoading } = this.props;

    console.log(data);
    

    return <div>

      <form onSubmit={handleSubmit(this.addProduct.bind(this))}>

        <div className='row'>

          {isLoading ?
              <div className="progress">
                <div className="indeterminate"/>
              </div>
              : undefined}

          <h5>Add Product</h5>

          <div className='col s9 m9 l9'>
            {this.renderFields(FORM_FIELDS)}
          </div>

          <div className='col s3 m3 l3'>
            <button
                disabled={isLoading}
                className='teal btn-flat right white-text'
                type='submit'
            >
              Add Product
            </button>
          </div>

        </div>
      </form>

      <button
          onClick={() => history.goBack()}
          className='btn'
      >
        back
      </button>
    </div>
  }
}

function mapStateToProps({ error, form, data }) {

  let addForm = form[ADD_FORM];

  return {
    data,
    err: error,
    isLoading: data && data.isLoading ? data.isLoading : false,
    addForm: addForm ? addForm : null
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: ADD_FORM
})(AddProductForm));
