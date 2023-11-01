import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { EditorState, ContentState, convertToRaw, Modifier, convertFromHTML, convertFromRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "./EditBlog.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const EditBlog = () => {
  const fieldStyle = {
    margin: "10px",
    padding: "5px",
  };

  const [content, setContent] = useState("");
  const [topic, setTopic] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (state, formik) => {
    setEditorState(state);
    if (formik) {
      formik.setFieldValue("Content", state.getCurrentContent().getPlainText());
    }
  };

  useEffect(() => {
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

  const token = localStorage.getItem("accessToken");

  const validateForm = (values) => {
    const errors = {};

    if (!values.Title) {
      errors.Title = "Title can not be blank.";
    } else if (values.Title.length < 5) {
      errors.Title = "Title must be at least 5 characters long.";
    } else if (!values.Content) {
      errors.Content = " Content can not be blank.";
    } else if (values.Content.length < 10) {
      errors.Content = "Content must be at least 10 characters long.";
    }
    //   if (!values.TopicID) {
    //     errors.TopicID = 'Please select a TopicID.';
    //   }
    if (!values.TopicID || values.TopicID === "TopicID") {
      errors.TopicID = "You must select a Topic";
    }

    return errors;
  };

  const initialValues = {
    Title: "",
    Content: "",
    TopicID: "",
  };

  useEffect(() => {
    Axios.get("/topic", {
      headers: {
        authorization: `token ${token}`,
      },
    }).then((data) => {
      console.log(data);
      setTopic(data.data.data);
    });
  }, []);

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const res = await Axios.post("/blog/create", values, {
        headers: {
          authorization: `token ${token}`,
        },
      });
      toast.success("Create Successfully!");

      //console.log("res from form", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-26">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-xs-12">
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
            {(formik) => (
              <Form style={fieldStyle}>
                <div className="my-2">
                  <Field type="text" placeholder="Blog Title" name="Title" className="form-control form-control-lg" />
                  <h5>
                    {" "}
                    <ErrorMessage style={{ color: "red" }} name="Title" component="div" />
                  </h5>
                </div>
                <div className="my-2 form-control form-control-lg">
                  {/* <Editor
                                        editorState={editorState}
                                        onEditorStateChange={(state) => handleEditorChange(state, formik)}
                                        placeholder="Write your blog (in markdown)"
                                        name="Content"
                                    /> */}
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={(state) => handleEditorChange(state, formik)}
                    toolbar={{
                      options: ["inline", "blockType", "fontSize", "list", "textAlign", "link", "image", "history"],
                      inline: {
                        options: ["bold", "italic", "underline"],
                      },
                      blockType: {
                        options: ["Normal", "H1", "H2", "H3", "H4", "H5", "H6"],
                      },
                      fontSize: {
                        options: [12, 14, 16, 18, 24, 36],
                      },
                      list: {
                        options: ["unordered", "ordered"],
                      },
                    }}
                  />
                  <h5>
                    <ErrorMessage style={{ color: "red" }} name="Content" component="div" />
                  </h5>
                </div>
                <div className="my-2">
                  <Field as="select" id="selectedOption" name="TopicID" className="form-select">
                    <option value="">Select Topic</option>
                    {topic.map((topic) => (
                      <option value={topic._id}>{topic.TopicName}</option>
                    ))}
                  </Field>
                  <h5>
                    <ErrorMessage style={{ color: "red" }} name="TopicID" component="div" />
                  </h5>
                </div>
                <div className="d-flex justify-content-end">
                  <button className=" sb btn btn-success btn-lg" type="submit">
                    Submit
                  </button>
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
