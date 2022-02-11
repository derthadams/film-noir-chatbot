import React from "react";

import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavLink from "react-bootstrap/NavLink"

import { LinkContainer } from "react-router-bootstrap";

export default function ChatApp() {
    return (
        <div className="pb-3 pt-5 banner">
            <Container fluid className="text-center align-center py-2">
                <h1 className="display-1 film-noir-title">FILM NOIR CHATBOT</h1>
                <Navbar variant="dark">
                    <Nav className="mx-auto mb-2 mb-lg-0">
                        <LinkContainer to="/">
                            <NavLink className="film-noir-menu fs-2">
                                CHAT
                            </NavLink>
                        </LinkContainer>
                        <LinkContainer to="/saved">
                            <NavLink className="film-noir-menu fs-2">
                                SAVED CHATS
                            </NavLink>
                        </LinkContainer>
                        <LinkContainer to="/about">
                            <NavLink className="film-noir-menu fs-2">
                                ABOUT
                            </NavLink>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </Container>
        </div>
    )
}