import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostNew extends Component {

    renderField = ( field ) => {
        // disctructuring to pull off the properties touched and air from the meta obj
        const {meta: {touched, error}} = field;

        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {/*if user touched field then show the error otherwise show empty string*/}
                    {touched ? error : ''}
                </div>
            </div>
        )
    };

    onSubmit = ( values ) => {
        // callback delay + action/index
        this.props.createPost(values, () => {
            this.props.history.push('/');

        });
    };

    render() {
        const {handleSubmit} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button className="btn btn-primary" type="submit">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate( values ) {
    //values -> return obj of all things user entered in form ex. {title: 'asd', categories: 'asd' ...
    const errors = {};

    //validate the values from 'values'
    if ( !values.title || values.title.length < 3) {
        errors.title = 'Enter a title that have at least 3 characters';
    }
    if ( values.title = ' ' ) {
        errors.title = 'Enter value';
    }
    if ( !values.categories ) {
        errors.categories = 'Enter some categories';
    }
    if ( values.categories = ' ' ) {
        errors.categories = 'Enter value';
    }
    if ( !values.content ) {
        errors.content = 'Enter some content';
    }
    if ( values.content = ' ' ) {
        errors.content = 'Enter value';
    }

    //if there are no errors in entered values the errors obj is empty
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost})(PostNew)
);