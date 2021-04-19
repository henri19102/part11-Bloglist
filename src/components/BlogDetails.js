import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Form, Button, ListGroup } from "react-bootstrap";

const BlogDetails = ({
  blogs,
  comments,
  handleLike,
  handleRemove,
  createComment,
}) => {
  const [comment1, setComment1] = useState("");
  const history = useHistory();

  const idBlog = useParams().id;
  const newObj = { comment: comment1, blogID: idBlog };

  const blog = blogs.find((x) => x.id === idBlog);
  const blogsComments = comments.filter((x) => x.blogID === idBlog);
  console.log(blogsComments);

  const handleSubmit = (e) => {
    e.preventDefault();
    createComment(newObj);
    setComment1("");
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <h4>added by {blog.user.name}</h4>
      <a href={blog.url}>{blog.url}</a>
      <h4>
        likes: {blog.likes}{" "}
        <Button onClick={() => handleLike(blog.id)}>like</Button>
      </h4>
      <h3>comments</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            value={comment1}
            onChange={({ target }) => setComment1(target.value)}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          add comment
        </Button>
      </Form>
      <ListGroup style={{ margin: "1%" }}>
        {blogsComments.map((x) => (
          <ListGroup.Item key={x.id}>{x.comment}</ListGroup.Item>
        ))}
      </ListGroup>
      <Button variant="danger" onClick={() => handleRemove(blog.id, history)}>
        remove blog
      </Button>
    </div>
  );
};

export default BlogDetails;
