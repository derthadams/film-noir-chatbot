import React, { useEffect, useState } from "react";

import axios from "axios";

import Col from "react-bootstrap/Col";
import SavedChat from "./SavedChat"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const chats = [{
        date: "2022-02-12",
        subject: "The General",
        history: [
            {user: true, text: "Hello"},
            {user: false, text: "Hello. How's the General this morning?"},
            {user: true, text: "I don't know, I haven't seen him"},
            {user: false, text: "Well, this is awkward."},
            {user: true, text: "Yes it is"},
            {user: false, text: "How did you get into this slimy business, then?"}
            ]
    },
    {
        date: "2022-02-11",
        subject: "Missing brother",
        history: [
            {user: true, text: "Your name?"},
            {user: false, text: "Reilly -- Doghouse Reilly."},
            {user: true, text: "What do you do for a living?"},
            {user: false, text: "I'm a private detective."},
            {user: true, text: "Can you help me? My brother has been missing for three weeks."},
            {user: false, text: "For how long?"},
            {user: true, text: "Three weeks"},
            {user: false, text: "And you didn't worry."}
    ]
},
    {
        date: "2022-02-10",
        subject: "Pistol-packing",
        history: [
            {user: true, text: "Hello"},
            {user: false, text: "Hello. How's the pistol-packing business up here?"},
            {user: true, text: "Going pretty well, you?"},
            {user: false, text: "Better. We don't have so many amateurs around."},
            {user: true, text: "If you want a job done right, give it to the professionals."},
            {user: false, text: "What do you mean, done right?"}
        ],
}
]



export default function SavedChats() {
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chats, setChats] = useState([]);

    const handleLoadModalClose = () => {
        setShowLoadModal(false);
    }
    const handleLoadModalOpen = () => {
        setShowLoadModal(true);
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    }
    const handleDeleteModalOpen = () => {
        setShowDeleteModal(true);
    }

    const loadChat = () => {
        console.log("Chat loaded!");
    }

    const deleteChat = () => {
        console.log("Chat deleted!");
    }



    useEffect(()=> {
        axios.get('http://localhost:8123')
                .then((response) => setChats(response.data))
                .catch((error) => console.log(error.response.data))
    }, [])

    return (
        <Col className="message-container saved-chats-background mx-auto rounded-3 mb-5" xs={9} md={6}>
            <div>
            {chats.map(
                    (chat) =>
                <SavedChat subject={chat.subject}
                           date={chat.saved_date}
                           history={JSON.parse(chat.history)}
                           key={chat.subject + chat.saved_date}
                           handleLoadModalOpen={handleLoadModalOpen}
                           handleDeleteModalOpen={handleDeleteModalOpen}/>
            )}
            </div>
            <Modal show={showLoadModal} onHide={handleLoadModalClose} className={"typewriter"}>
                <Modal.Header closeButton closeVariant="white">
                    <h3>Load Chat</h3>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        This will load the saved chat into the main chat window and delete any chat
                        currently in progress. Do you want to proceed?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                            variant={"outline-light"}
                            onClick={handleLoadModalClose}>
                        Cancel
                    </Button>
                    <Button
                            variant={"outline-danger"}
                            onClick={loadChat}>
                        Load
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showDeleteModal} onHide={handleDeleteModalClose} className={"typewriter"}>
                <Modal.Header closeButton closeVariant="white">
                    <h3>Delete Saved Chat</h3>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Do you want to delete the saved chat?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                            variant={"outline-light"}
                            onClick={handleLoadModalClose}>
                        Cancel
                    </Button>
                    <Button
                            variant={"outline-danger"}
                            onClick={deleteChat}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    )
}