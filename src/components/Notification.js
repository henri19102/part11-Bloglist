import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  let style = {};
  let variant1;
  if (notification.msg === "") {
    style = { display: "none" };
  }
  if (notification.suc === "success") {
    variant1 = "success";
  } else {
    variant1 = "danger";
  }

  return (
    <div style={style}>
      {" "}
      {notification.msg && <Alert variant={variant1}>{notification.msg}</Alert>}
    </div>
  );
};

export default Notification;
