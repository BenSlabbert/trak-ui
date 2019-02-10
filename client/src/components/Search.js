import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from "../actions";
import { SEARCH_FORM } from "../util/forms";
import FORM_FIELDS from './searchFormFields';
import TextInput from "./forms/TextInput";
import _ from 'lodash';
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

  search() {

    const { searchForm, fetchSearch } = this.props;

    if (searchForm && searchForm.values && searchForm.values.search) {
      fetchSearch(searchForm.values.search);
    }

  }

  render() {

    const { handleSubmit, search, history } = this.props;

    return <div>

      <form onSubmit={handleSubmit(this.search.bind(this))}>

        <div className='row'>

          <h5>Search Products</h5>

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

        <div>
          {search && search.search ? <div>
            {_.map(search.search.resultsList, l => <div key={l.id}>
              <Link to={`/product/${l.id}`}>
                {l.name}
              </Link>
            </div>)}
          </div> : undefined}
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

function mapStateToProps({ error, form, search }) {

  let searchForm = form[SEARCH_FORM];

  return {
    err: error,
    searchForm: searchForm ? searchForm : null,
    search
  }
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: SEARCH_FORM
})(Search));
