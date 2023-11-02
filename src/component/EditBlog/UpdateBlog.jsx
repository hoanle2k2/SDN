import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "./EditBlog.css";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useLocation, useParams } from 'react-router-dom';



const UpdateBlog = () => {
    const navigate = useNavigate();
    // const { blogid } = useParams();
    const [update, setUpdate] = useState();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams() 
    console.log("location", id);

    useEffect(() => {
        getData()

    }, []);
    const getData = async () => {
        console.log(id)
        const res = await Axios.get(`/blog/${id}`, {
            headers: {
                authorization: `token ${token}`,
            },
        })
        setUpdate(res.data.blogDetail);
        setIsLoading(false);
        const contentDataState = ContentState.createFromBlockArray(convertFromHTML(res.data.blogDetail?.Content));
        const editorDataState = EditorState.createWithContent(contentDataState);
        setEditorState(editorDataState);

        console.log("resssssssss", res.data.blogDetail);
    }
    console.log("updateData", update);

    console.log("Content" + update?.Content);
    console.log("Topic id :" + update?.TopicID);


    const fieldStyle = {
        margin: "10px",
        padding: "5px",
    };

    const [content, setContent] = useState("");
    const [topic, setTopic] = useState(update?.topic);
    console.log("update");
    console.log(update);
    console.log("topic");
    console.log(topic);
    const [editorState, setEditorState] = useState(update?.Content);
    const handleEditorChange = (state, formik) => {
        setEditorState(state);
        if (formik) {
            formik.setFieldValue("Content", state.getCurrentContent().getPlainText());
        }
    };

    const token = localStorage.getItem("accessToken");

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
            const res = await Axios.post("http://localhost:5000/blog/create ", values, {
                headers: {
                    authorization: `token ${token}`,
                },
            });
            toast.success("Cập nhật bài viết thành công !");
            navigate("/profile")
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>{
            isLoading ? (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            )
                :
                (
                    <div className="mt-26">
                        <div className="row">
                            <div className="col-md-10 offset-md-1 col-xs-12">
                                <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
                                    {(formik) => (
                                        <Form style={fieldStyle}>
                                            <div className="my-2">
                                                <Field type="text" placeholder="Tiêu đề bài viết" name="Title" className="form-control form-control-lg" />
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
                                                >
                                                </Editor>
                                                <h5>
                                                    <ErrorMessage style={{ color: "red" }} name="Content" component="div" />
                                                </h5>
                                            </div>
                                            <div className="my-2">
                                                <Field as="select" id="selectedOption" name="TopicID" value={update?.TopicName} className="form-select">

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
                )
        }
        </>



    );
};

export default UpdateBlog;
