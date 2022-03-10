import React, {useState} from "react";
import ReactDOM from "react-dom";

import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ChatNavBar from "./ChatNavBar"
import About from "./About"
import Chat from "./Chat"
import SavedChats from "./SavedChats";

export default function ChatApp() {
    const [history, setHistory] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const [timeoutPointers, setTimeoutPointers] = useState([]);

    const clearTimeouts = () => {
        for (const pointer of timeoutPointers) {
            clearTimeout(pointer);
            setTimeoutPointers([]);
        }
    }

    return (
            <BrowserRouter basename="/">
                <Container>
                    <ChatNavBar/>
                    <div className="body-bg">
                        <Row>
                            <Routes>
                                <Route path="/"
                                       element={<Chat prompts={prompts}
                                                      setPrompts={setPrompts}
                                                      history={history}
                                                      setHistory={setHistory}
                                                      setTimeoutPointers={setTimeoutPointers}
                                                      clearTimeouts={clearTimeouts}
                                       />}/>
                                <Route path="/saved"
                                       element={<SavedChats setPrompts={setPrompts}
                                                            setHistory={setHistory}
                                                            setTimeoutPointers={setTimeoutPointers}
                                                            clearTimeouts={clearTimeouts}
                                       />}/>
                                <Route path="/about" element={<About/>}/>
                            </Routes>
                        </Row>
                    </div>
                </Container>
            </BrowserRouter>
    )
}