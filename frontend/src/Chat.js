import React, { useState } from "react";

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover"
import Row from 'react-bootstrap/Row'

import axios from "axios"

import ChatWindow from "./ChatWindow"
import TextEntryBox from "./TextEntryBox";

export default function Chat() {
    const [history, setHistory] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [chatSubject, setChatSubject] = useState("");

    const handleModalClose = () => setShowModal(false);
    const handleModalShow = () => setShowModal(true);
    const handleChange = (event) => {
        setChatSubject(event.target.value);
    }

    const getBotResponse = (message) => {
        return axios.post("/api", {text: message})
                .then((response) => response.data)
    }

    const addMessageToHistory = (user, message) => {
        setHistory((prevState) =>
            [...prevState,
                {
                    user: user,
                    text: message
                }
                ]
        );
    }

    const clearHistory = () => {
        axios.post("api", {clear: true})
                .then((response) => {
                    if(response.data.length === 0) {
                        setHistory([]);
                        console.log("History cleared");
                    }
                })
    }

    const saveChat = () => {
        const today  = new Date()
        //mydate.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})
        const chat = {
            subject: chatSubject,
            date: today,
            history: history
        }
        console.log(chat);
        setChatSubject("");
        handleModalClose();
    }

    const sendMessage = async (message) => {
        addMessageToHistory(true, message);
        const { user, text } = await getBotResponse(message);
        addMessageToHistory( user, text );
    }

    const clearPopover = (
        <Popover id="clear-popover">
            <Popover.Header className="typewriter">
                Clear Chat
            </Popover.Header>
            <Popover.Body className="help-popover">
                This will end the current conversation.
            </Popover.Body>
        </Popover>
    )

    const savePopover = (
        <Popover id="save-popover">
            <Popover.Header className="typewriter">
                Save Chat
            </Popover.Header>
            <Popover.Body className="help-popover">
                Saved chats can be viewed on the Saved Chats page.
            </Popover.Body>
        </Popover>
    )

    return (
        <Col xs={9} md={6} className="mx-auto rounded-3 mb-5 chat-container">
            <div className="message-container" >
                <Row className="mb-2 pe-3 clear-save-buttons">
                    <Col xs={2} className="ms-auto">
                        <ButtonGroup>
                            <OverlayTrigger
                                // delay={{show: 800}}
                                trigger="hover"
                                placement="top"
                                overlay={clearPopover}
                                rootClose
                            >
                                <Button variant="outline-light"
                                    size="sm"
                                    onClick={clearHistory}>
                                    <i className="bi bi-x-circle chat-button-icon"> </i>
                                </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                                // delay={{show: 1500}}
                                trigger="hover"
                                placement="top"
                                overlay={savePopover}
                                rootClose
                            >
                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleModalShow}
                                >
                                    <i className="bi bi-save chat-button-icon"> </i>
                                </Button>
                            </OverlayTrigger>
                        </ButtonGroup>
                    </Col>
                </Row>
                <ChatWindow messages={history}/>
            </div>
            <TextEntryBox sendMessage={sendMessage}/>
            <Modal show={showModal} onHide={handleModalClose} className={"typewriter"}>
                <Modal.Header closeButton closeVariant="white">
                    <h3>Save Chat</h3>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label htmlFor="chat-subject">
                            Subject
                        </Form.Label>
                        <Form.Control
                            type="text"
                            className="text-entry"
                            id="chat-subject"
                            value={chatSubject}
                            onChange={handleChange}/>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                            variant={"outline-light"}
                            onClick={handleModalClose}>
                        Cancel
                    </Button>
                    <Button
                            variant={"outline-danger"}
                            onClick={saveChat}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}