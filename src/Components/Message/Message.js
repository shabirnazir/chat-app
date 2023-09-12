import React, { useState, useEffect, useRef } from "react";
import css from "./Message.module.css";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavbarContainer from "../Navibar/NavbarContainer";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
const Message = (props) => {
  const { socket } = props;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const [messages, setMessages] = useState([]);

  const { id } = params || {};
  socket.on("new-message", (data) => {
    setMessages((prev) => [...prev, data]);
  });
  socket.on("previous-messages", (data) => {
    setMessages(data);
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("UserInfo"));
    socket.emit("join-room", { receiver: id, sender: user.id });
  }, []);
  const onSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("UserInfo"));
      socket.emit("message", {
        receiver: id,
        message: data.message,
        sender: user.id,
      });
      setMessages((prev) => [
        ...prev,
        { message: data.message, sender: user.id, receiver: id },
      ]);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <NavbarContainer />
      <div className={css.container}>
        <div className={css.messageContainer} id="messageContainer">
          {messages
            .filter(
              (message, index, self) =>
                index ===
                self.findIndex(
                  (t) =>
                    t.message === message.message &&
                    t.sender === message.sender &&
                    t.receiver === message.receiver
                )
            )
            .map((message, index) => (
              <div className={css.message} key={index} id={index}>
                <div
                  className={
                    id === message?.receiver ? css.receiver : css.sender
                  }
                >
                  <p
                    className={
                      id === message?.receiver ? css.receiverMsg : css.senderMsg
                    }
                  >
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="message">
            <Form.Control
              type="textarea"
              placeholder="Enter Message"
              {...register("message", { required: true })}
            />
          </Form.Group>
          <br />

          <div className="d-grid gap-2">
            <Button variant="primary" size="lg" type="submit">
              {loading ? <LoadingIcon /> : "Send"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Message;
