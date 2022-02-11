import React, { useState } from "react";

import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import Col from "react-bootstrap/Col"
import Row from 'react-bootstrap/Row'

import ChatWindow from "./ChatWindow"
import TextEntryBox from "./TextEntryBox";

const sample = [
    {
        user: false,
        text: "Talk to me."
    },
    {
        user: true,
        text: "I need your help. My sister has been missing for three weeks and I'm very worried about her."
    },
    {
        user: false,
        text: "Oh yeah? What's her name?"
    },
    {
        user: true,
        text: "Gladys. Gladys Nightingale."
    },
    {
        user: false,
        text: "Where did you see her last?"
    },
    {
        user: true,
        text: "At her favorite nightclub, the Mocambo. A handsome stranger asked her to dance."
    },
    {
        user: false,
        text: "And then?"
    },
    {
        user: true,
        text: "Well, I must have lost her in the crowd. I went looking for her everywhere and couldn't find her."
    },
    {
        user: false,
        text: "Did it ever occur to you that maybe she doesn't want to be found?"
    },
]

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
                            <Button variant="outline-light" size="sm">
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