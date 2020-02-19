import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

// import library
import FadeIn from "react-fade-in";
import { GoTrashcan } from "react-icons/go";
import { IconContext } from "react-icons";
import ReactTooltip from 'react-tooltip'

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomIsJoined: false
    };
  }

  handleJoinRoom = () => {
    this.setState({
      roomIsJoined: true
    });

    const roomIsJoined = this.state.roomIsJoined;
    this.props.joinARoom(roomIsJoined);
  };

  render() {
    const { onDeleteRoom, roomNumber } = this.props;
    return (
      <FadeIn>
        <Card className="mt-2 room border-0">
          <Card.Title onClick={this.handleJoinRoom} className="m-3 text-left">
            {roomNumber}
            <span className="float-right">
            <IconContext.Provider value={{ color: "#D9534F" }}>
              <GoTrashcan data-type="light" data-tip="Delete the room" onClick={onDeleteRoom} />
              <ReactTooltip />
              </IconContext.Provider>
            </span>
          </Card.Title>
        </Card>
      </FadeIn>
    );
  }
}

export default Room;
