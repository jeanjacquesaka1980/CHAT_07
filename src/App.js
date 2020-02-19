import React from "react";
import "./App.css";

// import Components
import Rooms from "./Components/Rooms/Rooms";
import Message from "./Components/Message/Message";
import Messages from "./Components/Messages/Messages";
import Members from "./Components/Members/Members";
import Member from "./Components/Member/Member";
import InputField from "./Components/InputField/InputField";
import InputCreateRoom from "./Components/InputCreateRoom/InputCreateRoom";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

// import chatKit
import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import Room from "./Components/Room/Room";

// import icons
import { IconContext } from "react-icons";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: false,
      currentUser: "",
      roomArr: "",
      inputRoomName: "",
      currentRooms: "",
      roomId: "",
      roomName: "",
      messages: [],
    };
  }

  componentDidMount() {
    let tokenProvider = new TokenProvider({
      url:
        "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/f77208a6-c8ec-4615-96c1-0a501f9c6fc6/token"
    });

    let chatManager = new ChatManager({
      instanceLocator: "v1:us1:f77208a6-c8ec-4615-96c1-0a501f9c6fc6",
      userId: this.props.nameLogin,
      tokenProvider: tokenProvider
    });
    if (this.props.nameLogin == '') {
      this.props.history.push('/')
    }

    chatManager
      .connect()
      .then(currentUser => {
        console.log("Connected as user ", currentUser.id);
        console.log(currentUser);

        this.setState({
          input: true,
          currentUser: currentUser,
          currentRooms: currentUser.rooms,
          roomAdded: true
        });
      })
      .catch(error => {
        console.error("error:", error);
      });
  }
  // TODO check from here about gifUrl into the state, joinARoom and handleMessage functions
  joinARoom = async (roomId, roomName) => {
    const currentUser = this.state.currentUser;

    this.setState({
      roomId: roomId,
      roomName: roomName
    });

    currentUser
      .joinRoom({ roomId: roomId })
      .then(room => {
        console.log(room);
        this.setState({
          roomArr: room
        });
      })
      .catch(err => {
        console.log(`Error joining room`);
      });

    let messagesAndDate = [];

    await currentUser.subscribeToRoomMultipart({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          console.log(message)

          message.parts.map(m => {
            messagesAndDate.push({
              mess: m.payload.content,
              createdAt: message.createdAt,
            })
          });
          this.setState({
            messagesAndDate: messagesAndDate,
          });
        }
      },
      messageLimit: 30
    });
  };
  // get the value of the input
  handleMessage = (inputV, gifUrl) => {
    this.setState({
      input: true,
      // gifUrl: gifUrl
    });

    const currentUser = this.state.currentUser;
    const roomId = this.state.roomId;
    const roomName = this.state.roomName;

    currentUser
      .sendSimpleMessage({
        roomId: roomId,
        text: inputV
      })
      .then(messageId => {
        console.log(`Added message to ${roomName}`);
      })
      .catch(err => {
        console.log(`Error adding message to ${roomName}: ${err}`);
      });
  };

  handleInputRoomName = e => {
    this.setState({
      inputRoomName: e.target.value
    });
  };

  createARoom = async () => {
    console.log(this.state.currentRooms);
    const currentUser = this.state.currentUser;

    await currentUser
      .createRoom({
        name: this.state.inputRoomName
      })
      .then(room => {
        console.log(`Created room called ${room.name}`);
      })
      .catch(err => {
        console.log(`Error creating room ${err}`);
      });
    this.setState({
      inputRoomName: "",
      // roomAdded: true,
      currentRooms: currentUser.rooms
    });
    console.log(this.state.currentRooms);
  };

  handleDeleteARoom = async roomId => {
    console.log(roomId);
    const currentUser = this.state.currentUser;
    await currentUser
      .deleteRoom({ roomId: roomId })
      .then(() => {
        console.log(`Deleted room with ID: ${this.state.roomId}`);
      })
      .catch(err => {
        console.log(`Error deleted room ${this.state.roomId}: ${err}`);
      });
    this.setState({
      currentRooms: currentUser.rooms
    });
  };

  // addUserToRoom = roomId => {
  //   const currentUser = this.state.currentUser;
  //   currentUser
  //     .addUserToRoom({
  //       userId: "Sony",
  //       roomId: roomId
  //     })
  //     .then(() => {
  //       console.log("Added keith to room 123");
  //     })
  //     .catch(err => {
  //       console.log(`Error adding keith to room 123: ${err}`);
  //     });
  // };

  render() {
    let rooms;
    if (this.state.currentRooms) {
      rooms = this.state.currentRooms.map((r, index) => {
        return (
          <>
            <Room
              // onAddingMember={() => this.addUserToRoom(r.id)}
              onDeleteRoom={() => this.handleDeleteARoom(r.id)}
              key={r.id}
              joinARoom={() => this.joinARoom(r.id, r.name)}
              roomNumber={r.name}
            />
          </>
        );
      });
    }

    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

    return (
      <>
        <header>
          <Container fluid={true}>
            <Row>
              <Col>
                <h1 className="text-light">CHAT_07</h1>
              </Col>
            </Row>
          </Container>
        </header>
        <main className="text-center">
          <Container fluid={true}>
            <Row>
              {/* LEFT COLUMNS FOR THE ROOMS */}
              <Col xl={3} className="room-container overflow-auto">
                <InputCreateRoom
                  inputRoomName={this.state.inputRoomName}
                  createARoom={this.createARoom}
                  handleInputRoomName={this.handleInputRoomName}
                />
                <Rooms>{rooms}</Rooms>
              </Col>

              {/* MIDDLE COLUMN FOR THE MESSAGES AND INPUTFIELD */}
              <Col xl={6}>
                <Messages>
                  {this.state.messagesAndDate &&
                    this.state.messagesAndDate.map(m => {
                      let date = new Date(m.createdAt).toLocaleDateString();
                      let hours = new Date(m.createdAt).getHours();
                      let minutes = new Date(m.createdAt).getMinutes();
                      return (
                        <Message
                          gifUrl={pattern.test(m.mess) ? m.mess : "" }
                          message={!pattern.test(m.mess) ? m.mess : "" }
                          time={`Message sent ${date} at ${hours}:${minutes}`}
                        />
                      );
                    })}
                </Messages>
              </Col>
              {/* RIGHT COLUM FOR THE MEMBERS */}
              <Col xl={3} className="member-container">
                <Members>
                  {this.state.roomArr &&
                    this.state.roomArr.users.length > 0 &&
                    this.state.roomArr.users.map(u => {
                      // console.log(this.state.user.length);
                      return (
                        <IconContext.Provider
                          value={{
                            color:
                              u.presence.state == "online"
                                ? "#5CB85C"
                                : "#D9534F"
                          }}
                        >
                          <Member member={u.id} />
                        </IconContext.Provider>
                      );
                    })}
                </Members>
              </Col>
              <Col xl={12}>
                <InputField
                  handleMessage={this.handleMessage}
                  toggleEmojiPicker={this.toggleEmojiPicker}
                />
              </Col>
            </Row>
          </Container>
        </main>
      </>
    );
  }
}

export default App;
