import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import NewBlog from "./components/NewBlog";
import BlogsList from "./components/BlogsList";
import BlogDetails from "./components/BlogDetails";
import loginService from "./services/login";
import usersService from "./services/users";
import commentsService from "./services/comments";
import storage from "./utils/storage";
import { newNotification } from "./reducers/notificationReducer";
import {
  allBlogs,
  createNewBlog,
  likeBlog,
  deleteBlog,
} from "./reducers/blogReducer";
import { setUser } from "./reducers/userReducer";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

import { Form, Button, Navbar, Nav, ListGroup } from "react-bootstrap";

const App = () => {
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  const blogFormRef = React.createRef();

  useEffect(() => {
    const getUsers = async () => {
      const allUsers = await usersService.getAll();
      setUsers(allUsers);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getComments = async () => {
      const allComments = await commentsService.getAll();
      setComments(allComments);
    };
    getComments();
  }, []);

  useEffect(() => {
    dispatch(allBlogs());
  }, [dispatch]);

  useEffect(() => {
    const user = storage.loadUser();
    dispatch(setUser(user));
  }, [dispatch]);

  const notifyWith = (message, success) => {
    dispatch(newNotification(message, success));
  };
  const createBlog = (blog) => {
    dispatch(createNewBlog(blog));
    notifyWith(
      `a new blog '${blog.title}' by ${blog.author} added!`,
      "success"
    );
  };

  const createComment = async (comment) => {
    try {
      const newComment = await commentsService.newComment(comment);
      setComments(comments.concat(newComment));
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleRemove = (id, history) => {
    const blogToRemove = blogs.find((b) => b.id === id);
    const ok = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author}`
    );
    if (ok) {
      dispatch(deleteBlog(blogToRemove.id));
      history.push("/");
    }
  };

  const handleLike = (id) => {
    const blog1 = blogs.find((b) => b.id === id);
    const blog2 = { ...blog1, likes: blog1.likes + 1, user: blog1.user.id };
    dispatch(likeBlog(blog2));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setUsername("");
      setPassword("");
      dispatch(setUser(user));
      notifyWith(`${user.name} welcome back!`, "success");
      storage.saveUser(user);
    } catch (exception) {
      notifyWith("wrong username/password");
    }
  };

  const handleLogout = () => {
    dispatch(setUser(null));
    storage.logoutUser();
  };

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <ListGroup as="ul">
          {users.map((u) => (
            <ListGroup.Item as="li" key={u.id}>
              <Link to={`/users/${u.id}`}>
                {" "}
                {u.name}, blogs: {u.blogs.length}{" "}
              </Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };

  const UserDetails = ({ users }) => {
    const id = useParams().id;
    const user = users.find((x) => x.id === id);
    if (!user) {
      return null;
    }
    if (user.blogs.length === 0) {
      return (
        <div>
          <h2>{user.name}</h2>
          <h3>added blogs</h3>
          <p>none...</p>
        </div>
      );
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h4>Users blogs:</h4>
        <ListGroup>
          {user.blogs.map((b) => (
            <ListGroup.Item key={b.id}>{b.title}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    );
  };

  const Menu = () => {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link>
                <Link className="navFont" to="/">
                  Blogs
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="navFont" to="/users">
                  Users
                </Link>
              </Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>Signed in as:</Navbar.Text>
              <Navbar.Text className="navText"> {user.name}</Navbar.Text>
              <Nav.Link>
                <Button onClick={handleLogout}>logout</Button>
              </Nav.Link>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  };

  if (!user) {
    return (
      <div className="container">
        <h2>Login to application</h2>
        <Notification />
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <Router>
      <div className="container">
        <Menu />
        <h2>Blogs</h2>
        <Notification />
        <Switch>
          <Route path="/blogs/:id">
            <BlogDetails
              blogs={blogs}
              comments={comments}
              handleLike={handleLike}
              handleRemove={handleRemove}
              createComment={createComment}
            />
          </Route>
          <Route path="/users/:id">
            <UserDetails users={users} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Togglable buttonLabel="create new blog" ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            <BlogsList blogs={blogs} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
