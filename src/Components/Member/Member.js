import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

import { MdPowerSettingsNew } from "react-icons/md";
import FadeIn from "react-fade-in";

class Member extends React.Component {
  render(){
    const { member } = this.props;
    return (
      <FadeIn>
        <Card className="m-2 member border-0">
        <Card.Body>
            <Card.Title className="my-auto text-right">
              {member}
              <span className="float-left">
                <MdPowerSettingsNew />
              </span>
            </Card.Title>
        </Card.Body>
      </Card>
      </FadeIn>
    );
  }
};

export default Member;
