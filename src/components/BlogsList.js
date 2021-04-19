import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

const BlogsList = ({ blogs }) => {
  return (
    <div>
      <ListGroup as="ul">
        {blogs.map((b) => (
          <ListGroup.Item as="li" key={b.id}>
            <Link to={`/blogs/${b.id}`}> {b.title} </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BlogsList;
