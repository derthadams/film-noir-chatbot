import React from "react"

import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Form from "react-bootstrap/Form"
import InputGroup from "react-bootstrap/InputGroup"
import Row from "react-bootstrap/Row"

export default function TextEntryBox() {
    return (
        <Row className="py-3 text-entry-container">
            <Col>
                <InputGroup>
                    <Form.Control
                        type="text"
                        className="text-entry"
                        placeholder="Type a message..."/>
                    <Button variant="outline-light">
                        <i className="bi bi-send chat-button-icon"> </i>
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    )
}