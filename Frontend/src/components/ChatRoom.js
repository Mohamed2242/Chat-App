import React, { useEffect, useRef } from "react";
import { Button, Container } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import './ChatRoom.css';

const ChatRoom = ({ messages, sendMessage, leaveChat }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container className="mt-5 chat-container">
      <div className="chat_header">
        <h3 className="text-center my-2">
          Welcome to the Chat Room
        </h3>
        <Button onClick={leaveChat} className="btn btn-danger">
          Leave Chat
        </Button>
      </div>
      <div className="messaging">
        <div className="inbox_msg">
          
          <div className="mesgs">
            <div className="msg_history" ref={scrollRef}>
                <MessageContainer messages={messages}/>
            </div>
            <div className="type_msg">
              <div className="input_msg_write">
                <SendMessageForm sendMessage={sendMessage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ChatRoom;
