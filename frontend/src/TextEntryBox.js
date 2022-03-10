import React, { useState } from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"

export default function TextEntryBox({sendMessage, handleUserTyping}) {
    const [text, setText] = useState("")

    const handleSend = () => {
        sendMessage(text);
        setText("");

    }
    const handleChange = (event) => {
        setText(event.target.value);
        if (text === "") {
            handleUserTyping();
        }
    }
    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            handleSend();
        }
    }
    return (
        <Row className="py-3 text-entry-container">
            <Col>
                <InputGroup>
                    <Form.Control
                        type="text"
                        className="text-entry"
                        placeholder="Type a message..."
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                    <Button variant="outline-light"
                            onClick={handleSend}>
                        <i className="bi bi-send chat-button-icon"> </i>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}