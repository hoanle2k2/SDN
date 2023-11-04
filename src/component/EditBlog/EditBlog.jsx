import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./EditBlog.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import { useNavigate } from "react-router-dom";

const EditBlog = () => {
  const fieldStyle = {
    margin: "10px",
    padding: "5px",
  };
  
  const [topic, setTopic] = useState([]);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    console.log("convert", html);
  }, [editorState]);

  const handleEditorChange = (state, formik) => {
    setEditorState(state);
    if (formik) {
      formik.setFieldValue("Content", convertedContent);
    }
  };

  
  const validateForm = (values) => {
    const errors = {};

    if (!values.Title) {
      errors.Title = "Tiêu đề không được để trống.";
    } else if (values.Title.length < 5) {
      errors.Title = "Tiêu đề phải dài ít nhất 5 ký tự.";
    } else if (!values.Content) {
      errors.Content = " Nội dung không được để trống";
    } else if (values.Content.length < 150) {
      errors.Content = "Nội dung bài viết phải dài ít nhất 150 ký tự.";
    }
    if (!values.TopicID || values.TopicID === "TopicID") {
      errors.TopicID = "Bạn phải chọn chủ đề cho bài viết";
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
      toast.success("Tạo thành công bài viết !");
      navigate("/profile");
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
                  <Field
                    type="text"
                    placeholder="Tiêu đề bài viết"
                    name="Title"
                    className="form-control form-control-lg"
                  />
                  <h5>
                    {" "}
                    <ErrorMessage style={{ color: "red" }} name="Title" component="div" />
                  </h5>
                </div>
                <div className="my-2 form-control form-control-lg">
                  <Editor
                    editorState={editorState}
                    placeholder="Bạn đang nghĩ gì...."
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
                  >
                    {}
                  </Editor>
                  <h5>
                    <ErrorMessage style={{ color: "red" }} name="Content" component="div" />
                  </h5>
                </div>
                <div className="my-2">
                  <Field as="select" id="selectedOption" name="TopicID" className="form-select">
                    <option value="">Chọn chủ đề</option>
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
                    Đăng bài
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
