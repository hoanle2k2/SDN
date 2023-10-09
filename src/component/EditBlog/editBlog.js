import { React, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import './EditBlog.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBlog = () => {
    const fieldStyle = {
        margin: '10px',
        padding: '5px',
    };
    return (
        <>
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <Formik
                        // initialValues={initialValues}
                        // onSubmit={handleSubmit}
                        // validate={validateForm}
                    >
                        <Form style={fieldStyle}>
                            <div className='my-2'>
                                <Field type="text" placeholder="Blog Title" name="title" className="form-control form-control-lg" />
                                <h5>    <ErrorMessage style={{ color: 'red' }} name="title" component="div" /></h5>
                            </div>
                            <div className='my-2'>
                                <Field type="text" placeholder="What's this blog about?" name="description" className="form-control form-control-lg" />
                                <h5><ErrorMessage style={{ color: 'red' }} name="description" component="div" /></h5>
                            </div>
                            <div className='my-2'>
                                <Field as="textarea" rows="8" placeholder="Write your blog (in markdown)" name="body" className="form-control form-control-lg" />
                                <h5>   <ErrorMessage style={{ color: 'red' }} name="body" component="div" /></h5>
                            </div>
                            <div className='my-2'>
                                <FieldArray name="tagList">
                                        <div>
                                                <div>
                                                    <Field
                                                        // name={`tagList[${index}]`}
                                                        placeholder="Enter tags"
                                                        className="form-control form-control-lg"
                                                    />
                                                </div>

                                            <button className='btn btn-info' type="button" >
                                                Add Tag
                                            </button>
                                        </div>

                                </FieldArray>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button className=" sb btn btn-success btn-lg" type="submit">Submit</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default EditBlog;