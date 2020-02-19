import React from "react";

// import ReactBootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Members = props => {
  return (
    <Row>
      <Col className="box m-1">
        {props.children}
      </Col>
    </Row>
  );
};

export default Members;