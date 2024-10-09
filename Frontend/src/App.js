import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import WaitingRoom from './components/waitingroom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import ChatRoom from './components/ChatRoom';

function App() {

  const[conn, setConnection] = useState();
  const[messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // initiate a connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7009/Chat")
        .configureLogging (LogLevel.Information)
        .build();
      // set up handler
      conn.on("JoinSpecificChatRoom", (username, msg) => {
        console.log("msg: ", msg);
        setMessages(prevMessages => [...prevMessages, { username, msg }]);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}]);
      })

      conn.on("ReceiveLeaveMessage", (username, msg) => {
        setMessages(messages => [...messages, {username, msg}]);
      })

      await conn.start();
      await conn.invoke("JoinSpecificChatRoom", {username, chatroom});
    
      setConnection(conn);
    }
    catch(e){
      console.log(e);
    }
  }

  const sendMessage = async(message) => {
    try {
      await conn.invoke("SendMessage", message);
    }
    catch(e){
      console.log(e);
    }
  }

  async function leaveChat() {
    try {
      await conn.stop();
      console.log('Connection stopped successfully.'); // Optional success message
      setConnection(null); // Reset connection state
      setMessages([]); // Clear messages
    } catch (error) {
      console.error('Error occurred while stopping connection:', error);
      // Handle error as needed
    }
  }

  return (
    <div>
      <main>
        <Container>
          {!conn
          ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          : <ChatRoom messages={messages} sendMessage={sendMessage} leaveChat={leaveChat}></ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default App;
