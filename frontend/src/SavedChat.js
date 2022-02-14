import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import React from "react";

const convertDate = (date) => {
    const formatDate = new Date(date);
    const offset = formatDate.getTimezoneOffset() * 60000
    formatDate.setTime(formatDate.getTime() + offset)
    return formatDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

export default function SavedChat(
        {
            subject,
            date,
            history,
            handleLoadModalOpen,
            handleDeleteModalOpen
        }
        ) {
    return (
            <Card className={"typewriter mb-2"}>
                <Card.Body>
                    <Card.Title>
                        <Row>
                            <Col xs={8}>
                                <h5>
                                    <strong>
                                        { subject }
                                    </strong>
                                </h5>
                            </Col>
                            <Col xs={4}>
                                <ButtonGroup>
                                    <Button
                                            variant="outline-dark"
                                            size="sm"
                                            onClick={handleLoadModalOpen}
                                    >
                                        Load
                                    </Button>
                                    <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={handleDeleteModalOpen}
                                    >

                                        Delete
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </Card.Title>
                    <Card.Text>
                        {convertDate(date)}
                    </Card.Text>
                    <Card.Text>
                        {[...Array(2)].map((x, i) =>
                            history[i] &&
                            (history[i].user ? 'You: "' : 'Bot: "') + history[i].text + '" '
                        )}
                    </Card.Text>
                </Card.Body>
            </Card>
    )
}