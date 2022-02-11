import React from "react";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatNavBar from "./ChatNavBar"
import About from "./About"
import Chat from "./Chat"
import SavedChats from "./SavedChats";

export default function ChatApp() {
    return (
        <BrowserRouter basename="/">
            <Container>
                <ChatNavBar/>
                <div className="body-bg">
                    <Row>
                        <Routes>
                            <Route path="/" element={<Chat/>}/>
                            <Route path="/saved" element={<SavedChats/>}/>
                            <Route path="/about" element={<About/>}/>
                        </Routes>
                    </Row>
                </div>
            </Container>
        </BrowserRouter>
    )
}