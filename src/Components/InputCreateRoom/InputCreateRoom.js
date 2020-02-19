import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// import library
import { FaPlus } from "react-icons/fa";
import ReactTooltip from 'react-tooltip'

const InputCreateRoom = ({
  inputRoomName,
  handleInputRoomName,
  createARoom
}) => {
  return (
    <Card className="border-0 m-2 bg-transparent">
      <InputGroup>
        <FormControl
          value={inputRoomName}
          onChange={handleInputRoomName}
          placeholder="Add a Room"
          aria-label="Room Name"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button onClick={createARoom} className="border-0 bg-transparent">
            <FaPlus className="cross" data-type="light" data-tip="Add a room"/>
            <ReactTooltip />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Card>
  );
};

export default InputCreateRoom;
