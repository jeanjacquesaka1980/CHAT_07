import React from "react";

// import ReactBootstrap

// import library
import ScrollToBottom from "react-scroll-to-bottom";

const Messages = ({ children }) => {
  return (
    <ScrollToBottom
      checkInterval="300"
      className="messages-container"
    >
      {children}
    </ScrollToBottom>
  );
};

export default Messages;
