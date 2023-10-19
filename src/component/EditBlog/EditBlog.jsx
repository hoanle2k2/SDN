import { React, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import './EditBlog.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBlog = () => {
    const fieldStyle = {
        margin: '10px',
        padding: '5px',
    };

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // const handleEditorChange = (state) => {
    //     setEditorState(state);
    // };
    const handleEditorChange = (state, formik) => {
        setEditorState(state);
        if (formik) {
            formik.setFieldValue("Content", state.getCurrentContent().getPlainText());
        }
    };

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
        TopicID :"",
        // body: "",
        // tagList: [

        // ]
    };

    const handleSubmit = async (values) => {
        // const data = {
        //     article: {
        //         ...values
        //     }
        // }
        console.log(values);
        // Xử lý logic khi form được submit
        // console.log("form", data);
        // try {
        //     const res = await postNewArticle(token, data)
        //     console.log("res from form", res);
        //     const dataRespon = res?.data?.article
        //     navigate(`/article/${dataRespon.slug}`)
        // } catch (error) {
        //     console.log(error);
        // }
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
                            <Form style={fieldStyle}>
                                <div className='my-2'>
                                    <Field type="text" placeholder="Blog Title" name="Title" className="form-control form-control-lg" />
                                    <h5> <ErrorMessage style={{ color: 'red' }} name="Title" component="div" /></h5>
                                </div>
                                <div className='my-2 form-control form-control-lg'>
                                    {/* <Field
                                    as="textarea"
                                    rows="8"
                                    placeholder="Write your blog (in markdown)"
                                    name="body"
                                    className="form-control form-control-lg"
                                    
                                /> */}

                                    {/* <Editor
                                    editorState={editorState}
                                    onEditorStateChange={handleEditorChange}
                                    placeholder="Write your blog (in markdown)"
                                   
                                /> */}
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
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                    </Field>
                                </div>

                                {/* <div className='my-2'>
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
                            </div> */}
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