import React, { useState } from "react";

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"
import Row from 'react-bootstrap/Row'

import ChatWindow from "./ChatWindow"
import TextEntryBox from "./TextEntryBox";

export default function Chat() {
    const [history, setHistory] = useState([]);

    const callAPI = (message) => {
        console.log(`Called API with message: ${ message }`);
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
        setHistory([]);
    }

    const saveChat = () => {
        console.log(history)
    }

    const sendMessage = (message) => {
        callAPI(message);
        addMessageToHistory(true, message);
    }

    return (
        <Col xs={9} md={6} className="mx-auto rounded-3 mb-5 chat-container">
            <div className="message-container" tabIndex="0">
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
                                    onClick={saveChat}
                            >
                                <i className="bi bi-save chat-button-icon"> </i>
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <ChatWindow messages={history}/>
            </div>
            <TextEntryBox sendMessage={sendMessage}/>
        </Col>

    )
}