import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

// import library
import FadeIn from "react-fade-in";

const Message = ({ gifUrl, message, time }) => {
  return (
    <FadeIn>
      <Card className="m-2 text-left border-0 shadow message shadow">
      <Card.Img variant="top" src={gifUrl} />
        <Card.Body className="p-2">
          <Card.Text className="my-auto message-font-weight">{message}</Card.Text>
          <Card.Text className="p-0">
            <em>
              <small className="time-font-weight">{time}</small>
            </em>
          </Card.Text>
        </Card.Body>
      </Card>
    </FadeIn>
  );
};

export default Message;
