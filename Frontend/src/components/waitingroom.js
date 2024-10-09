import React, { useState } from 'react';
import { Button, Col, Form, Row, Container, Card } from 'react-bootstrap';
import './waitingroom.css';

const WaitingRoom = ({ joinChatRoom }) => {
  const [username, setUsername] = useState('');
  const [chatRoom, setChatroom] = useState('');

  return (
    <Container className="container">
      <Row className="row">
        <Col md={6} className="offset-md-3">
          <h2 className="text-center text-dark mt-5">Welcome to Mo ChatApp</h2>
          <div className="text-center mb-5 text-dark">Please Join the Room to start Chatting</div>
          <Card className="my-5 cardbody-color">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                joinChatRoom(username, chatRoom);
              }}
              className="card-body p-lg-5"
            >
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2023/07/24/23/30/chat-8147986_1280.jpg"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Display Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Room Name"
                  value={chatRoom}
                  onChange={(e) => setChatroom(e.target.value)}
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  type="submit"
                  className="btn-color px-5 mb-5 w-100"
                  disabled={!username || !chatRoom}
                >
                  Join
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WaitingRoom;
