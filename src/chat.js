import React from "react";
import axios from "../axios";
import { connect } from "react-redux";
// import {  } from "./action";
import { Link } from "react-router-dom";
import { emit } from "./socket";

class Chat extends React.Component {
  compileInput(e) {
    this.userinput = e.target.value;
  }
  sendMessage() {
    console.log(this.userinput);

    emit("chatMessage", this.userinput);
  }
  toggleChat() {}

  render() {
    if (!this.props.chatMsgs) {
      return null;
    } else {
      return (
        <div className="chatWrapper">
          <div className="chatBox">
            <div className="chatMsgs">
              {this.props.chatMsgs.map(msg => (
                <div className="indChatMsg">
                  <div className="chatUserInfo">
                    <div className="chatPic">
                      <img src={msg.profPic} />
                    </div>
                    <div className="chatUser">
                      {msg.first} {msg.last}
                    </div>
                    <div className="chatTime">{msg.time}</div>
                  </div>
                  <div className="chatText">{msg.chatMsg}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="chatTextingPart">
            <textarea
              className="chatTextBox"
              onChange={e => this.compileInput(e)}
            />
          </div>
          <div>
            <button onClick={() => this.sendMessage(this.userinput)}>
              Send message
            </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = function(state) {
  return {
    chatMsgs: state.chatMsgs
  };
};
export default connect(mapStateToProps)(Chat);
