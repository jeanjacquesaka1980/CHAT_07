import React from "react";

// import ReactBootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";

// import library
import { GoSmiley } from "react-icons/go";
import { MdSend } from "react-icons/md";
import { MdGif } from "react-icons/md";
import { IconContext } from "react-icons";
import ReactTooltip from 'react-tooltip'

// picker
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "@webscopeio/react-textarea-autocomplete/style.css";
import { addEmoji, toggleEmojiPicker } from "../../../node_modules/methods";
import { Picker, emojiIndex } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Gif from "react-giphy-component";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      showEmojiPicker: false,
      showGif: false,
      gifUrl: ""
    };
  }

  handleInputValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  addEmoji = emoji => {
    const { inputValue } = this.state;
    const text = `${inputValue}${emoji.native}`;

    this.setState({
      inputValue: text
    });
  };

  toggleEmojiPicker = () => {
    this.setState({
      showEmojiPicker: !this.state.showEmojiPicker
    });
  };

  toggleGifPicker = () => {
    this.setState({
      showGif: !this.state.showGif
    });
  };

  log = gif => {
    const gifUrl = `${gif.original.webp}`;

    this.setState({
      inputValue: gifUrl
    });
  };

  handleInputClick = e => {
    let inputV = this.state.inputValue;
    this.props.handleMessage(inputV);
    this.setState({
      inputValue: ""
    });
  };

  render() {
    const { showEmojiPicker, showGif } = this.state;
    return (
      <Row className="input-field-container fixed-bottom">
        {showEmojiPicker && (
          <Picker className="emoji" set="emojione" onSelect={this.addEmoji} />
        )}
        {showGif && <Gif onSelected={this.log} modal={true} />}

        <Navbar className="mx-auto" bg="transparent" expand="lg">
          <InputGroup className="m-2">
            <InputGroup.Prepend>
              <ReactTextareaAutocomplete
                id="form-control-auto"
                loadingComponent={() => <span>Loading ...</span>}
                onChange={this.handleInputValue}
                value={this.state.inputValue}
                placeholder="Compose your message"
                aria-label="Message"
                aria-describedby="basic-addon2"
                trigger={{
                  ":": {
                    dataProvider: token =>
                      emojiIndex.search(token).map(o => ({
                        colons: o.colons,
                        native: o.native
                      })),
                    component: ({ entity: { native, colons } }) => (
                      <div>{`${colons} ${native}`}</div>
                    ),
                    output: item => `${item.native}`
                  }
                }}
              />
            </InputGroup.Prepend>
              <InputGroup.Append>
              <IconContext.Provider value={{ color: "#f9f9f9", size: "2em", style: { padding: "-10px", margin: "0px"} }}>
                <Button
                  onClick={this.toggleGifPicker}
                  className="btn-send border-0 bg-transparent"
                >
                  <MdGif data-tip="Send a GIF" data-type="light"/>
                  <ReactTooltip />
                </Button>
                </IconContext.Provider>
                <Button
                  onClick={this.toggleEmojiPicker}
                  className="btn-send border-0 bg-transparent"
                >
                  <GoSmiley data-tip="Send an Emoji" data-type="light"/>
                  <ReactTooltip />
                </Button>
                <Button
                  onClick={this.handleInputClick}
                  className="btn-send border-0 bg-transparent"
                >
                  <MdSend />
                </Button>
              </InputGroup.Append>
          </InputGroup>
        </Navbar>
      </Row>
    );
  }
}

export default InputField;
