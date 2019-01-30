import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from "../actions";
import { SEARCH_FORM } from "../util/forms";
import FORM_FIELDS from './searchFormFields';
import TextInput from "./forms/TextInput";
import _ from 'lodash';

class Search extends Component {

  renderFields( FORM_FIELDS ) {
    return _.map(FORM_FIELDS, field => {
      return <Field className='input-field'
                    key={field.name}
                    component={TextInput}
                    {...field}
      />;
    });
  }

  search() {

    const { searchForm, fetchSearch } = this.props;

    if (searchForm && searchForm.values && searchForm.values.search) {
      console.log('searching...');
      fetchSearch(searchForm.values.search);
    }

  }

  render() {

    const { handleSubmit, search } = this.props;

    console.log('props', search);

    return <div>

      <form onSubmit={handleSubmit(this.search.bind(this))}>

        <div className='row'>

          <div className='col s9 m9 l9'>
            {this.renderFields(FORM_FIELDS)}
          </div>

          <div className='col s3 m3 l3'>
            <button
                className='teal btn-flat right white-text'
                type='submit'
            >
              search
            </button>
          </div>

        </div>
      </form>
    </div>
  }
}

function mapStateToProps( { error, form, search } ) {

  let searchForm = form[SEARCH_FORM];


  // if (search && search.search && search.search.resultsList) {
  //   console.log(search.search.resultsList)
  // }

  return {
    err: error,
    searchForm: searchForm ? searchForm : null,
    search
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: SEARCH_FORM
})(Search));
