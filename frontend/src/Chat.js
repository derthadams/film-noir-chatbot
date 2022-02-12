import React, { useState } from "react";

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
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

    return (
        <Col xs={9} md={6} className="mx-auto rounded-3 mb-5 chat-container">
            <div className="message-container" >
                <Row className="mb-2 pe-3 clear-save-buttons">
                    <Col xs={2} className="ms-auto">
                        <ButtonGroup>
                            <Button variant="outline-light"
                                    size="sm"
                                    onClick={clearHistory}>
                                <i className="bi bi-x-circle chat-button-icon"> </i>
                            </Button>
                            <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleModalShow}
                            >
                                <i className="bi bi-save chat-button-icon"> </i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <ChatWindow messages={history}/>
            </div>
            <TextEntryBox sendMessage={sendMessage}/>
            <Modal show={showModal} onHide={handleModalClose} className={"typewriter"}>
                <Modal.Header closeButton>
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