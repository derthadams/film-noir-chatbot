import React, {useEffect, useState} from "react";
import {useNavigate,} from "react-router-dom";

import axios from "axios";

import Col from "react-bootstrap/Col";
import SavedChat from "./SavedChat"
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function SavedChats({setHistory}) {
    const [showLoadModal, setShowLoadModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [chats, setChats] = useState([]);
    const [activeID, setActiveID] = useState(null);
    const navigate = useNavigate();

    const handleLoadModalClose = () => {
        setShowLoadModal(false);
    }
    const handleLoadModalOpen = (event) => {
        setActiveID(event.target.id);
        setShowLoadModal(true);
    }

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
        setActiveID(null);
    }
    const handleDeleteModalOpen = (event) => {
        setActiveID(event.target.id);
        setShowDeleteModal(true);
    }

    const loadChat = () => {
        const chat = chats.find((element) => element.id.toString() === activeID);
        axios.post('/api/load', {chat_history: chat.history})
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
                .finally(() => {
                    handleLoadModalClose();
                    navigate("/", {replace: false});
                    setHistory(JSON.parse(chat.history));
                    const savedLink = document.getElementById("saved-link")
                    if (location.pathname !== "/saved" && savedLink.classList.contains("active")) {
                        savedLink.classList.remove("active");
                    }
                })
        console.log("Chat loaded!");
    }

    const deleteChat = () => {
        axios.delete('http://localhost:8123', {params: {id: activeID}})
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
        handleDeleteModalClose();
        updateSavedChatList();
    }

    const updateSavedChatList = () => {
        axios.get('http://localhost:8123')
                .then((response) => setChats(response.data))
                .catch((error) => console.log(error.response.data))
    }

    useEffect(() => {
        updateSavedChatList();
    }, [])

    return (
        <Col className="message-container saved-chats-background mx-auto rounded-3 mb-5" xs={9} md={6}>
            <div>
            {chats.map(
                    (chat) =>
                <SavedChat id={chat.id}
                           subject={chat.subject}
                           date={chat.saved_date}
                           history={JSON.parse(chat.history)}
                           key={chat.id}
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
                            onClick={handleDeleteModalClose}>
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