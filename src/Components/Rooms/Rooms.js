import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Rooms = ({ children }) => {
    return (
      <Row>
        <Col className="box-rooms overflow-auto m-1">{children}</Col>
      </Row>
    );
}

export default Rooms;
