import React, { useState } from "react";

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"
import Row from 'react-bootstrap/Row'

import axios from "axios"

import ChatWindow from "./ChatWindow"
import TextEntryBox from "./TextEntryBox";

export default function Chat() {
    const [history, setHistory] = useState([]);

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
        console.log(history)
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