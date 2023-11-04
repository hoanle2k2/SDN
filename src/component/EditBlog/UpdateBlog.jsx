import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./EditBlog.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from "react-router-dom";
import { convertToHTML } from "draft-convert";

const UpdateBlog = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("accessToken");
  const { id } = useParams();
  const [topic, setTopic] = useState(update?.topic);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  
  const fieldStyle = {
    margin: "10px",
    padding: "5px",
  };

  
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

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    console.log(id);
    const res = await Axios.get(`/blog/${id}`, {
      headers: {
        authorization: `token ${token}`,
      },
    });
    setUpdate(res.data.blogDetail);
    setIsLoading(false);
    const contentDataState = ContentState.createFromBlockArray(convertFromHTML(res.data.blogDetail?.Content));
    const editorDataState = EditorState.createWithContent(contentDataState);
    setEditorState(editorDataState);

    console.log("resssssssss", res.data.blogDetail);
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
    Title: update?.Title,
    Content: update?.Content,
    TopicID: update?.TopicID,
  };

  useEffect(() => {
    Axios.get("http://localhost:5000/topic", {
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
      await Axios.post(
        "http://localhost:5000/blog/create ",
        {
          ...values,
          blogId: update._id,
        },
        {
          headers: {
            authorization: `token ${token}`,
          },
        }
      );
      toast.success("Cập nhật bài viết thành công !");
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : (
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
                        <ErrorMessage style={{ color: "red" }} name="Title" component="div" />
                      </h5>
                    </div>
                    <div className="my-2 form-control form-control-lg">
                      <Editor
                        defaultEditorState={editorState}
                        placeholder="Bạn đang nghĩ gì..."
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
                      ></Editor>
                      <h5>
                        <ErrorMessage style={{ color: "red" }} name="Content" component="div" />
                      </h5>
                    </div>
                    <div className="my-2">
                      <Field
                        as="select"
                        id="selectedOption"
                        name="TopicID"
                        value={update?.TopicName}
                        className="form-select"
                      >
                        {topic?.map((topicItem) => (
                          <Field
                            as="option"
                            key={topicItem.TopicID}
                            value={topicItem.TopicName}
                            selected={update?.TopicID === topicItem?._id ? true : false}
                          >
                            {topicItem.TopicName}
                          </Field>
                        ))}
                      </Field>
                      <h5>
                        <ErrorMessage style={{ color: "red" }} name="TopicID" component="div" />
                      </h5>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className=" sb btn btn-success btn-lg" type="submit">
                        Cập nhật
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateBlog;
