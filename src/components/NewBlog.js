import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const NewBlog = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleNewBlog = (event) => {
    event.preventDefault();

    props.createBlog({ title, author, url });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={handleNewBlog}>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            size="sm"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="sm"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            size="sm"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>

        <Button type="submit">create</Button>
      </Form>
    </div>
  );
};

export default NewBlog;
