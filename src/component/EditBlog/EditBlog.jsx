import { React, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './EditBlog.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

const EditBlog = () => {
    const fieldStyle = {
        margin: '10px',
        padding: '5px',
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const handleEditorChange = (state, formik) => {
        setEditorState(state);
        if (formik) {
            formik.setFieldValue("Content", state.getCurrentContent().getPlainText());
        }
    };

    const token = localStorage.getItem('accessToken'); 
    console.log( "token",token);

    const validateForm = (values) => {
        const errors = {};

        if (!values.Title) {
            errors.Title = 'Title can not be blank.';
        }
        else if (!values.Content) {
            errors.Content = ' Content can not be blank..';
        }
        else if (!values.TopicID) {
            errors.TopicID = ' TopicID can not be blank.';
        }

        return errors;
    };

    const initialValues = {
        Title: "",
        Content: "",
        TopicID :""
    };

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            const res = await Axios.post("http://localhost:5000/blog/create", values,{
                headers: {
                    authorization: `token ${token}`,
                }
              })
            console.log("res from form", res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='mt-26'>
            <div className="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validate={validateForm}
                    >
                        {(formik) => (
                            <Form style={fieldStyle} action="http://localhost:5000/blog/create" method="post" >
                                <div className='my-2'>
                                    <Field type="text" placeholder="Blog Title" name="Title" className="form-control form-control-lg" />
                                    <h5> <ErrorMessage style={{ color: 'red' }} name="Title" component="div" /></h5>
                                </div>
                                <div className='my-2 form-control form-control-lg'>
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={(state) => handleEditorChange(state, formik)}
                                        placeholder="Write your blog (in markdown)"
                                    />
                                    <h5><ErrorMessage style={{ color: 'red' }} name="body" component="div" /></h5>
                                </div>
                                <div className="my-2">
                                    <Field as="select" id="selectedOption" name="TopicID">
                                        <option value="">TopicID</option>
                                        <option value="option1">Công Nghệ</option>
                                        <option value="option2">Khoa Học</option>
                                        <option value="option3">IOT</option>
                                    </Field>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button className=" sb btn btn-success btn-lg" type="submit">Submit</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;