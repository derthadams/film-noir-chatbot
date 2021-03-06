import React, {useState, useEffect} from "react";

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

import promptScript from "./prompts";

export default function Chat({
                                 prompts, setPrompts, history, setHistory,
                                 setTimeoutPointers, clearTimeouts
                             }) {
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
        axios.post("/api", {clear: true})
                .then((response) => {
                    if(response.data.length === 0) {
                        setPrompts([]);
                        clearTimeouts();
                        setHistory([]);
                        console.log("History cleared");
                    }
                })
    }

    const saveChat = () => {
        const today  = new Date().toISOString().slice(0, 10)
        const chat = {
            subject: chatSubject,
            saved_date: today,
            history: JSON.stringify(history)
        }
        axios.post('http://localhost:8123/', chat)
                .then((response) => console.log(response))
                .catch((error) => console.log(error.response.data))
        setChatSubject("");
        handleModalClose();
    }

    const sendMessage = async (message) => {
        addMessageToHistory(true, message);
        const {user, text} = await getBotResponse(message);
        addMessageToHistory(user, text);
    }

    const popover = (id, header, body) => (
            <Popover id={id + "-popover"}>
                <Popover.Header className="typewriter">
                    {header}
                </Popover.Header>
                <Popover.Body className="help-popover">
                    {body}
                </Popover.Body>
            </Popover>
    )

    const addPrompt = (prompt) => {
        setPrompts((prevState) =>
                [...prevState,
                    {
                        user: false,
                        text: prompt
                    }
                ]
        );
    }

    const addTimeoutPointer = (timeoutPointer) => {
        setTimeoutPointers((prevState) =>
                [...prevState,
                    timeoutPointer]
        )
    }

    const handleUserTyping = () => {
        if (history.length === 0) {
            clearTimeouts();
        }
    }

    const displayPrompts = () => {
        let timeoutPointer = -1;
        let totalDelay = 0;
        for (const prompt of promptScript) {
            totalDelay += prompt.delay;
            timeoutPointer = setTimeout(() => {
                addPrompt(prompt.text)
            }, totalDelay);
            addTimeoutPointer(timeoutPointer);
        }
    }

    useEffect(() => {
        if (history.length === 0 && prompts.length === 0) {
            displayPrompts();
        }
    }, [])

    return (
            <Col xs={9} md={6} className="mx-auto rounded-3 mb-5 chat-container">
                <div className="message-container">
                    <Row className="mb-2 pe-3 clear-save-buttons">
                        <Col xs={2} className="ms-auto">
                            <ButtonGroup>
                                <OverlayTrigger
                                        trigger={["hover", "focus"]}
                                        placement="top"
                                        overlay={popover('clear', 'Clear Chat',
                                                'This will end the current conversation.')}
                                        rootClose
                                >
                                    <Button variant="outline-light"
                                            size="sm"
                                            onClick={clearHistory}>
                                        <i className="bi bi-x-circle chat-button-icon"> </i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                        trigger={["hover", "focus"]}
                                        placement="top"
                                        overlay={popover('save', 'Save Chat',
                                                'Saved chats can be viewed on the Saved Chats page.')}
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
                    <ChatWindow messages={prompts.concat(history)}/>
                </div>
                <TextEntryBox sendMessage={sendMessage} handleUserTyping={handleUserTyping}/>
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